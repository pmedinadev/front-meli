import PropTypes from 'prop-types'
import { Button, Spinner } from 'react-bootstrap'

const MAX_ITEMS_PER_PRODUCT = 6

export default function QuantityControl({ quantity, onUpdate, isUpdating, stock }) {
  const maxQuantity = Math.min(stock, MAX_ITEMS_PER_PRODUCT)

  return (
    <div className="border rounded d-inline-flex align-items-center mb-2">
      {/* Botón para decrementar */}
      <Button
        variant="light"
        className="rounded-0 rounded-start p-1"
        onClick={() => onUpdate(quantity - 1)}
        disabled={isUpdating || quantity <= 1}>
        <i className="bi bi-dash-lg px-1 text-primary" />
      </Button>

      {/* Cantidad actual */}
      <span className="px-3" style={{ minWidth: '40px', textAlign: 'center' }}>
        {isUpdating ? (
          <Spinner animation="border" size="sm" className="text-primary" />
        ) : (
          <small>{quantity}</small>
        )}
      </span>

      {/* Botón para incrementar */}
      <Button
        variant="light"
        className="rounded-0 rounded-end p-1"
        onClick={() => onUpdate(quantity + 1)}
        disabled={isUpdating || quantity >= maxQuantity}>
        <i className="bi bi-plus-lg px-1 text-primary" />
      </Button>
    </div>
  )
}

QuantityControl.propTypes = {
  quantity: PropTypes.number.isRequired,
  onUpdate: PropTypes.func.isRequired,
  isUpdating: PropTypes.bool.isRequired,
  stock: PropTypes.number.isRequired,
}
