'use client'

import CardContainer from '@/components/layout/CardContainer'
import LoadingSpinner from '@/components/layout/LoadingSpinner'
import { useAuth } from '@/hooks/auth'
import { useCart } from '@/hooks/useCart'
import { useProducts } from '@/hooks/useProducts'
import { useParams, useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import ProductImages from './components/ProductImages'
import ProductSidebar from './components/ProductSidebar'
import SellerInfo from './components/SellerInfo'
import SuccessOffcanvas from './components/SuccessOffcanvas'
import Link from 'next/link'

export default function ProductDetail({ initialProduct }) {
  // Hooks
  const { user } = useAuth()
  const { getCartProducts, addToCart, addingToCart } = useCart()
  const { MLPid } = useParams()
  const { getProduct } = useProducts()
  const router = useRouter()

  // Estados
  const [product, setProduct] = useState(initialProduct)
  const [loading, setLoading] = useState(!initialProduct)
  const [errorMessage, setErrorMessage] = useState(null)
  const [quantity, setQuantity] = useState(1)
  const [selectedPhoto, setSelectedPhoto] = useState(0)
  const [showOffcanvas, setShowOffcanvas] = useState(false)
  const [addedToCartQuantity, setAddedToCartQuantity] = useState(0)

  // Controladores de eventos
  const handleCloseOffcanvas = () => setShowOffcanvas(false)
  const handleShowOffcanvas = () => setShowOffcanvas(true)

  const handleAddToCart = async () => {
    if (!user) {
      router.push('/login')
      return
    }

    setErrorMessage(null)
    try {
      await addToCart(user.cart_id, product.id, quantity)
      setAddedToCartQuantity(quantity)
      handleShowOffcanvas()
      await loadCartQuantity()
      setQuantity(1)
    } catch (error) {
      setErrorMessage(
        error.response?.data?.error || 'Error al agregar al carrito',
      )
    }
  }

  // Efectos
  useEffect(() => {
    const loadProduct = async () => {
      if (!initialProduct) {
        setLoading(true)
        try {
          const productId = MLPid.replace('MLP', '')
          const productData = await getProduct(productId)
          setProduct(productData)
        } catch (error) {
          console.error(error)
        } finally {
          setLoading(false)
        }
      }
    }

    loadProduct()
  }, [MLPid, initialProduct, getProduct])

  const loadCartQuantity = async () => {
    if (!user) return
    if (user?.cart_id && product?.id) {
      try {
        await getCartProducts(user.cart_id)
      } catch (error) {
        console.error('Error loading cart quantity:', error)
      }
    }
  }

  useEffect(() => {
    loadCartQuantity()
  }, [user, product])

  // Protectores de renderizado
  if (loading) return <LoadingSpinner />
  if (!product) return null

  return (
    <Container className="my-4">
      <div className="mb-3 d-flex gap-3">
        <small>
          <Link href="/" className="text-decoration-none">
            Volver al inicio
          </Link>
          <span className="text-muted mx-2">|</span>
          <Link
            href={`/category/${product.category?.id}`}
            className="text-decoration-none">
            {product.category?.name}
          </Link>
        </small>
      </div>
      <CardContainer className="bg-body">
        <Row className="g-0">
          <Col className="col-8 p-4">
            <ProductImages
              photos={product.photos}
              title={product.title}
              selectedPhoto={selectedPhoto}
              onPhotoSelect={setSelectedPhoto}
            />

            {/* Descripción */}
            <div className="border-top border-bottom px-3 py-5">
              <h5 className="fw-normal">Descripción</h5>
              <p style={{ whiteSpace: 'pre-line' }} className="mb-0 text-muted">
                {product.description || 'Sin descripción'}
              </p>
            </div>
          </Col>

          <Col className="col-4 p-4">
            {/* Detalles del producto */}
            <ProductSidebar
              product={product}
              quantity={quantity}
              onQuantityChange={setQuantity}
              onAddToCart={handleAddToCart}
              loading={addingToCart}
              errorMessage={errorMessage}
            />

            {/* Detalles del vendedor */}
            <SellerInfo user={product.user} />
          </Col>
        </Row>
      </CardContainer>
      <div className="text-end mt-3">
        <small>
          <span>
            Publicación <strong>#{MLPid.replace('MLP', '')}</strong>
          </span>
          <span className="mx-2">|</span>
          <span>
            <Link href="" className="text-decoration-none">
              Reportar
            </Link>
          </span>
        </small>
      </div>
      <SuccessOffcanvas
        show={showOffcanvas}
        onHide={handleCloseOffcanvas}
        product={product}
        quantity={addedToCartQuantity}
      />
    </Container>
  )
}
