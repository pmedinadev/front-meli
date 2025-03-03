import { CONDITIONS } from '@/constants/product'
import { useFavorites } from '@/hooks/useFavorites'
import { useOrders } from '@/hooks/useOrders'
import { useRouter } from 'next/navigation'
import { formatPrice, formatWarranty } from '@/utils/formatters'
import { useEffect, useState } from 'react'
import {
  Button,
  Col,
  FormLabel,
  FormSelect,
  Row,
  Spinner,
} from 'react-bootstrap'
import FavoriteButton from './FavoriteButton'
import { useAuth } from '@/hooks/auth'

const MAX_QUANTITY = 6

export default function ProductSidebar({
  product,
  quantity,
  onQuantityChange,
  onAddToCart,
  loading,
  errorMessage,
}) {
  const { user } = useAuth()
  const { addFavorite, removeFavorite, isInFavorites } = useFavorites(
    user?.favorite_id,
  )
  const { createOrder } = useOrders()
  const router = useRouter()
  const [isMounted, setIsMounted] = useState(false)
  const [favoriteState, setFavoriteState] = useState({
    isFavorite: false,
    favoriteProductId: null,
  })

  useEffect(() => {
    setIsMounted(true)
    return () => setIsMounted(false)
  }, [])

  // Verificar si el producto está en favoritos
  useEffect(() => {
    if (isMounted && user?.favorite_id) {
      isInFavorites.refetch()
    }
  }, [isMounted, user?.favorite_id, product.id])

  useEffect(() => {
    if (isInFavorites.data) {
      const favoriteProduct = isInFavorites.data.find(p => p.id === product.id)
      setFavoriteState({
        isFavorite: !!favoriteProduct,
        favoriteProductId: favoriteProduct?.favorite_product_id || null,
      })
    }
  }, [isInFavorites.data, product.id])

  const handleFavoriteClick = async () => {
    if (!user) {
      router.push('/login')
      return
    }

    try {
      if (favoriteState.isFavorite) {
        await removeFavorite.mutateAsync(favoriteState.favoriteProductId)
        setFavoriteState({ isFavorite: false, favoriteProductId: null })
      } else {
        const response = await addFavorite.mutateAsync({
          favoriteId: user.favorite_id,
          productId: product.id,
        })
        setFavoriteState({
          isFavorite: true,
          favoriteProductId: response.favorite_product.id,
        })
      }
    } catch (error) {
      console.error('Error managing favorites:', error)
    }
  }

  const handleBuyNow = async () => {
    try {
      const { order } = await createOrder.mutateAsync({
        from_cart: false,
        product_id: product.id,
        quantity,
      })

      router.push(`/checkout/${order.id}/shipping-method`)
    } catch (error) {
      console.error('Error creating order:', error)
    }
  }

  const maxSelectableQuantity = Math.min(
    product.stock - (product.cart_quantity || 0),
    MAX_QUANTITY,
  )
  const isSingleUnit = product.stock === 1

  const productTitle =
    product.condition === 'new'
      ? product.title
      : `${product.title} (${CONDITIONS[product.condition]})`

  return (
    <div className="border rounded p-3 mb-3">
      <div className="d-flex justify-content-between">
        {/* Condición */}
        <p className="text-muted mb-2">
          <small>{CONDITIONS[product.condition] || product.condition}</small>
        </p>

        {/* Botón de favoritos */}
        <FavoriteButton
          isFavorite={favoriteState.isFavorite}
          isLoading={addFavorite.isPending || removeFavorite.isPending}
          handleFavoriteClick={handleFavoriteClick}
        />
      </div>

      {/* Título del producto */}
      <h5 className="fw-bold">{productTitle}</h5>

      {/* Precio del producto */}
      <h2 className="fw-light mb-3">
        $ {formatPrice(product.price).whole}
        {formatPrice(product.price).decimal && (
          <sup className="fs-6 ms-1">{formatPrice(product.price).decimal}</sup>
        )}
      </h2>

      {/* Envío del producto */}
      {product.shipping_type === 'paid_by_seller' ? (
        <span className="fw-medium text-success-meli">Envío gratis</span>
      ) : (
        <span>
          Envío por $ {formatPrice(product.shipping_cost).whole}
          {formatPrice(product.shipping_cost).decimal && (
            <sup style={{ fontSize: '10px' }}>
              {formatPrice(product.shipping_cost).decimal}
            </sup>
          )}
        </span>
      )}

      {/* Stock del producto */}
      <div className="my-3">
        {isSingleUnit ? (
          <span className="fw-bold">¡Última disponible!</span>
        ) : (
          <>
            <span className="fw-medium me-2">Stock disponible</span>
            <span className="text-muted">
              <small>
                {product.stock > 0
                  ? `(${product.stock} disponibles)`
                  : 'Sin stock'}
              </small>
            </span>
          </>
        )}
      </div>

      {/* Selector de unidades */}
      {!isSingleUnit && (
        <Row className="g-0 align-items-center mb-3">
          <FormLabel column className="col-auto me-2">
            Cantidad:
          </FormLabel>
          <Col>
            <FormSelect
              className="fw-medium border-0"
              value={quantity}
              onChange={e => onQuantityChange(parseInt(e.target.value))}
              disabled={loading}>
              {[...Array(maxSelectableQuantity)].map((_, index) => (
                <option key={index + 1} value={index + 1}>
                  {index + 1} unidad{index + 1 > 1 ? 'es' : ''}
                </option>
              ))}
            </FormSelect>
          </Col>
        </Row>
      )}

      {/* Botón de compra inmediata */}
      <Button
        className="bg-button-primary-meli w-100 fw-medium py-2 mb-2"
        onClick={handleBuyNow}
        disabled={createOrder.isPending}>
        {createOrder.isPending ? 'Procesando...' : 'Comprar ahora'}
      </Button>

      {/* Botón de agregar al carrito */}
      <Button
        variant="light"
        onClick={() => onAddToCart()}
        disabled={loading}
        className="bg-button-secondary-meli text-primary w-100 fw-medium border-0 py-2">
        {loading ? (
          <Spinner
            as="span"
            animation="border"
            size="sm"
            role="status"
            aria-hidden="true"
          />
        ) : (
          'Agregar al carrito'
        )}
      </Button>

      {/* Mensaje de error para carrito de compras */}
      {errorMessage && (
        <div className="text-danger mt-2">
          <small>{errorMessage}</small>
        </div>
      )}

      {/* Garantía del producto */}
      <div className="text-muted mt-3">
        <small>
          <i className="bi bi-award me-2" />
          <span>
            {formatWarranty(
              product.warranty_type,
              product.warranty_duration,
              product.warranty_duration_type,
            )}
          </span>
        </small>
      </div>
    </div>
  )
}
