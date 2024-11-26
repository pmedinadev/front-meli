import { CONDITIONS } from '@/constants/product'
import { formatPrice } from '@/utils/formatters'
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

  return (
    <div className="border rounded p-3 mb-3">
      <p className="text-muted mb-2">
        <small>{CONDITIONS[product.condition] || product.condition}</small>
      </p>
      <h5 className="fw-bold">{product.title}</h5>
      <h2 className="fw-light mb-3">
        $ {formatPrice(product.price).whole}
        {formatPrice(product.price).decimal && (
          <sup className="fs-6 ms-1">{formatPrice(product.price).decimal}</sup>
        )}
      </h2>
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

      <Button className="bg-button-primary-meli w-100 fw-medium py-2 mb-2">
        Comprar ahora
      </Button>
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

      {/* Add error message display */}
      {errorMessage && (
        <div className="text-danger mt-2">
          <small>{errorMessage}</small>
        </div>
      )}
    </div>
  )
}
