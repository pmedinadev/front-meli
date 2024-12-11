'use client'

import { Col, Container, Row } from 'react-bootstrap'
import LoadingSpinner from '@/components/layout/LoadingSpinner'
import { useAuth } from '@/hooks/auth'
import { useCart } from '@/hooks/useCart'
import { useEffect, useState } from 'react'
import SellerSection from './components/SellerSection'
import EmptyCart from './components/EmptyCart'
import OrderSummary from './components/OrderSummary'
import { groupItemsBySeller } from '@/utils/cartCalculator'

// Constantes para almacenar la clave de localStorage
const LOCAL_STORAGE_SELECTED_SELLERS = 'selected-sellers'
const LOCAL_STORAGE_FIRST_SELLER = 'first-seller-id'

export default function Cart() {
  const { user } = useAuth({ middleware: 'auth' })
  const { getCartProducts, updateQuantity, removeFromCart } = useCart()
  const [cartItems, setCartItems] = useState([]) // Estado para almacenar los productos del carrito
  const [loading, setLoading] = useState(true) // Estado para indicar si se está cargando la información

  // Inicializar vendedores seleccionados desde localStorage
  const [selectedSellers, setSelectedSellers] = useState(() => {
    if (typeof window === 'undefined') return []
    const stored = localStorage.getItem(LOCAL_STORAGE_SELECTED_SELLERS)
    return stored ? JSON.parse(stored) : []
  })

  // Inicializar el primer vendedor desde localStorage
  const [firstSeller, setFirstSeller] = useState(() => {
    if (typeof window === 'undefined') return null
    return localStorage.getItem(LOCAL_STORAGE_FIRST_SELLER)
  })

  // Actualizar la cantidad de un producto en el carrito
  const handleProductQuantityUpdate = async (cartProductId, quantity) => {
    await updateQuantity(cartProductId, quantity)
    setCartItems(prev =>
      prev.map(item =>
        item.cart_product_id === cartProductId ? { ...item, quantity } : item,
      ),
    )
  }

  // Eliminar un producto del carrito
  const handleProductRemove = async cartProductId => {
    await removeFromCart(cartProductId)

    // Actualizar los productos del carrito y eliminar vendedor de localStorage
    const updatedCartItems = cartItems.filter(
      item => item.cart_product_id !== cartProductId,
    )
    setCartItems(updatedCartItems)

    const remainingSellerIds = new Set(
      updatedCartItems.map(item => item.user_id),
    )

    setSelectedSellers(prev =>
      prev.filter(sellerId => remainingSellerIds.has(sellerId)),
    )
  }

  // Manejar el cambio de selección de vendedor
  const handleSellerSelection = sellerId => {
    setSelectedSellers(prev => {
      const newSelection = prev.includes(sellerId)
        ? prev.filter(id => id !== sellerId)
        : [...prev, sellerId]

      return newSelection
    })
  }

  // Cargar productos del carrito al iniciar
  useEffect(() => {
    const loadUserCartItems = async () => {
      if (user?.cart_id) {
        const items = await getCartProducts(user.cart_id)
        setCartItems(items || [])
        setLoading(false)
      }
    }
    loadUserCartItems()
  }, [user])

  // Actualizar el primer vendedor y los vendedores seleccionados en localStorage
  useEffect(() => {
    if (cartItems.length === 0) {
      setFirstSeller(null)
      localStorage.removeItem(LOCAL_STORAGE_FIRST_SELLER)
      return
    }

    if (!firstSeller && cartItems.length > 0) {
      const initialSellerId = cartItems[0].user_id
      setFirstSeller(initialSellerId)
      localStorage.setItem(LOCAL_STORAGE_FIRST_SELLER, initialSellerId)

      // Only add first seller if no selections exist
      if (selectedSellers.length === 0) {
        setSelectedSellers([initialSellerId])
      }
    }
  }, [cartItems, firstSeller])

  // Guardar vendedores seleccionados en localStorage
  useEffect(() => {
    localStorage.setItem(
      LOCAL_STORAGE_SELECTED_SELLERS,
      JSON.stringify(selectedSellers),
    )
  }, [selectedSellers])

  const groupedItems = groupItemsBySeller(cartItems)
  const sellersShippingData = Object.entries(groupedItems)
    .sort(([, a], [, b]) => new Date(a.firstAdded) - new Date(b.firstAdded))
    .map(([, { seller, products }]) => ({ seller, products }))

  // Protección de renderizado
  if (!user || loading) return <LoadingSpinner />

  return (
    <Container className="my-5">
      <Row as="section" className="g-4">
        {/* Columna para mostrar los productos del carrito */}
        <Col as="article">
          {cartItems.length > 0 ? (
            sellersShippingData.map(({ seller, products }) => (
              <SellerSection
                key={seller.id}
                seller={seller}
                products={products}
                isSelected={selectedSellers.includes(seller.id)}
                onSelectionChange={() => handleSellerSelection(seller.id)}
                onUpdateQuantity={handleProductQuantityUpdate}
                onRemove={handleProductRemove}
              />
            ))
          ) : (
            <EmptyCart />
          )}
        </Col>

        {/* Columna para mostrar el resumen de compra */}
        <Col as="article" className="col-4">
          <OrderSummary
            cartItems={cartItems}
            selectedSellers={selectedSellers}
            groupedItems={groupedItems}
          />
        </Col>
      </Row>
    </Container>
  )
}
