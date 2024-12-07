import { CONDITIONS } from '@/constants/product'
import { formatPrice, formatWarranty } from '@/utils/formatters'
import {
  Button,
  Col,
  FormLabel,
  FormSelect,
  Row,
  Spinner,
} from 'react-bootstrap'

const MAX_QUANTITY = 6

export default function ProductSidebar({
  product,
  quantity,
  onQuantityChange,
  onAddToCart,
  loading,
  errorMessage,
}) {
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
      {/* Condición del producto */}
      <p className="text-muted mb-2">
        <small>{CONDITIONS[product.condition]}</small>
      </p>

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
      <Button className="bg-button-primary-meli w-100 fw-medium py-2 mb-2">
        Comprar ahora
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
