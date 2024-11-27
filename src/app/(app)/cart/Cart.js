'use client'

// Importación de componentes UI
import { Button, Col, Container, Row } from 'react-bootstrap'
import CartItem from './components/CartItem'
import CartSvg from './components/CartSvg'
import CardContainer from '@/components/layout/CardContainer'
import LoadingSpinner from '@/components/layout/LoadingSpinner'

// Importación de hooks
import { useAuth } from '@/hooks/auth'
import { useCart } from '@/hooks/useCart'
import { useEffect, useState } from 'react'

// Importación de formateador de precios
import { formatPrice } from '@/utils/formatters'

// Constantes para almacenar la clave de localStorage
const LOCAL_STORAGE_SELECTED_SELLERS = 'selected-sellers'
const LOCAL_STORAGE_FIRST_SELLER = 'first-seller-id'

export default function Cart() {
  // Inicializar hooks
  const { user } = useAuth({ middleware: 'auth' })
  const { getCartProducts, updateQuantity, removeFromCart } = useCart()

  // Administrar estados
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

  // Calcular la cantidad total de productos seleccionados
  const getTotalSelectedUnits = (items = [], selectedIds = []) => {
    return items
      .filter(item => selectedIds.includes(item.user_id))
      .reduce((sum, item) => sum + item.quantity, 0)
  }

  // Calcular el total de la compra
  const getSelectedItemsTotal = (items = [], selectedIds = []) => {
    return items
      .filter(item => selectedIds.includes(item.user_id))
      .reduce((sum, item) => sum + item.price * item.quantity, 0)
  }

  // Agrupar productos por vendedor
  const groupItemsBySeller = products => {
    return [...products]
      .sort((a, b) => new Date(a.created_at) - new Date(b.created_at))
      .reduce((groups, product) => {
        const sellerId = product.user_id

        // Si el grupo no existe, crear nuevo grupo
        if (!groups[sellerId]) {
          groups[sellerId] = {
            seller: product.user,
            products: [],
            firstAdded: product.created_at,
          }
        }

        groups[sellerId].products.push(product)
        return groups
      }, [])
  }

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

  // Protección de renderizado
  if (!user || loading) return <LoadingSpinner />

  const groupedItems = groupItemsBySeller(cartItems)

  console.log(
    'Received cartItems:',
    cartItems.map(item => ({
      id: item.id,
      user_id: item.user_id,
      created_at: item.created_at,
    })),
  )

  return (
    <Container className="my-5">
      <Row as="section" className="g-4">
        {/* Columna para mostrar los productos del carrito */}
        <Col as="article">
          {cartItems.length > 0 ? (
            Object.entries(groupedItems)
              .sort(
                ([, a], [, b]) =>
                  new Date(a.firstAdded) - new Date(b.firstAdded),
              )
              .map(([, { seller, products }]) => (
                <section key={seller.id} className="mb-3">
                  <CardContainer className="bg-body">
                    {/* Encabezado del vendedor */}
                    <div className="d-flex p-3 align-items-center">
                      <input
                        type="checkbox"
                        name="seller"
                        className="form-check-input m-0 me-3"
                        checked={selectedSellers.includes(seller.id)}
                        onChange={() => handleSellerSelection(seller.id)}
                      />
                      <h6
                        className={`fw-medium mb-0 ${!selectedSellers.includes(seller.id) ? 'text-muted' : ''}`}>
                        Productos de{' '}
                        {seller.display_name || `@${seller.username}`}
                      </h6>
                    </div>
                    <hr className="m-0 border-secondary" />
                    {/* Listado de productos del vendedor */}
                    {products.map(item => (
                      <CartItem
                        key={item.id}
                        item={item}
                        onUpdateQuantity={handleProductQuantityUpdate}
                        onRemove={handleProductRemove}
                      />
                    ))}
                  </CardContainer>
                </section>
              ))
          ) : (
            // Vista para cuando no hay productos en el carrito
            <CardContainer className="bg-disabled-meli p-3 h-100 d-flex align-items-center justify-content-center">
              <Row className="align-items-center w-100">
                <Col className="col-auto">
                  <CartSvg />
                </Col>
                <Col>
                  <h6>Agrega productos y consigue envío gratis</h6>
                  <small>
                    Para obtener envío gratis, suma productos de un mismo
                    vendedor.
                  </small>
                </Col>
                <Col className="col-auto">
                  <Button variant="link" className="text-decoration-none">
                    <small className="fw-medium">Descubrir productos</small>
                  </Button>
                </Col>
              </Row>
            </CardContainer>
          )}
        </Col>

        {/* Columna para mostrar el resumen de compra */}
        <Col as="article" className="col-4">
          <CardContainer
            className={`${cartItems.length > 0 ? 'bg-body' : 'bg-disabled-meli text-body-tertiary'} d-flex flex-column justify-content-center `}>
            <div className="px-4 py-3">
              <h6 className="fw-bold mb-0">
                <small>Resumen de compra</small>
              </h6>
            </div>
            <hr className="m-0 border-secondary" />
            <div className="px-4 py-3">
              {cartItems.length > 0 ? (
                <>
                  {selectedSellers.length > 0 && (
                    <div className="d-flex justify-content-between mb-3">
                      <span>
                        <small>
                          Productos (
                          {getTotalSelectedUnits(cartItems, selectedSellers)})
                        </small>
                      </span>
                      <span>
                        <small>
                          ${' '}
                          {
                            formatPrice(
                              getSelectedItemsTotal(cartItems, selectedSellers),
                            ).whole
                          }
                          {formatPrice(
                            getSelectedItemsTotal(cartItems, selectedSellers),
                          ).decimal && (
                            <sup style={{ fontSize: '10px' }}>
                              {
                                formatPrice(
                                  getSelectedItemsTotal(
                                    cartItems,
                                    selectedSellers,
                                  ),
                                ).decimal
                              }
                            </sup>
                          )}
                        </small>
                      </span>
                    </div>
                  )}
                  <div className="d-flex justify-content-between">
                    <span className="fw-bold">Total</span>
                    <span className="fw-bold">
                      ${' '}
                      {
                        formatPrice(
                          getSelectedItemsTotal(cartItems, selectedSellers),
                        ).whole
                      }
                      {formatPrice(
                        getSelectedItemsTotal(cartItems, selectedSellers),
                      ).decimal && (
                        <sup style={{ fontSize: '10px' }}>
                          {
                            formatPrice(
                              getSelectedItemsTotal(cartItems, selectedSellers),
                            ).decimal
                          }
                        </sup>
                      )}
                    </span>
                  </div>
                  <Button
                    className="w-100 mt-3 fw-medium py-2 mb-2"
                    disabled={selectedSellers.length === 0}>
                    <small>Continuar compra</small>
                  </Button>
                </>
              ) : (
                <small>
                  Aquí verás los importes de tu compra una vez que agregues
                  productos.
                </small>
              )}
            </div>
          </CardContainer>
        </Col>
      </Row>
    </Container>
  )
}
