import { Button } from 'react-bootstrap'
import CardContainer from '@/components/layout/CardContainer'
import { calculateTotals, getTotalSelectedUnits } from '@/utils/cartCalculator'
import { formatPrice, formatPriceWithDecimals } from '@/utils/formatters'

export default function OrderSummary({
  cartItems,
  selectedSellers,
  groupedItems,
}) {
  const totals = calculateTotals(cartItems, selectedSellers, groupedItems)

  return (
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
              <>
                {/* Productos */}
                <small className="d-flex justify-content-between mb-3">
                  <span>
                    {getTotalSelectedUnits(cartItems, selectedSellers) === 1
                      ? 'Producto'
                      : `Productos (${getTotalSelectedUnits(cartItems, selectedSellers)})`}
                  </span>
                  <span>
                    $ {formatPrice(totals.subtotal).whole}
                    {formatPrice(totals.subtotal).decimal && (
                      <sup style={{ fontSize: '10px' }}>
                        {formatPrice(totals.subtotal).decimal}
                      </sup>
                    )}
                  </span>
                </small>

                {/* Envíos */}
                <small className="d-flex justify-content-between mb-3">
                  <span>
                    {totals.shipping.count === 1
                      ? 'Envío'
                      : `Envíos (${totals.shipping.count})`}
                  </span>
                  <span
                    className={
                      totals.shipping.allFree ? 'text-success-meli' : ''
                    }>
                    {totals.shipping.allFree
                      ? 'Gratis'
                      : `$ ${formatPriceWithDecimals(totals.shipping.cost)}`}
                  </span>
                </small>
              </>
            )}

            <div className="d-flex justify-content-between">
              <span className="fw-bold">Total</span>
              <span className="fw-bold">
                $ {formatPrice(totals.total).whole}
                {formatPrice(totals.total).decimal && (
                  <sup style={{ fontSize: '10px' }}>
                    {formatPrice(totals.total).decimal}
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
            Aquí verás los importes de tu compra una vez que agregues productos.
          </small>
        )}
      </div>
    </CardContainer>
  )
}
