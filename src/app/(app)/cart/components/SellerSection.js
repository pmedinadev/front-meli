import { Col, ProgressBar, Row } from 'react-bootstrap'
import CardContainer from '@/components/layout/CardContainer'
import CartItem from './CartItem'
import { formatPrice, formatPriceWithDecimals } from '@/utils/formatters'
import { calculateSellerShipping } from '@/utils/shippingCalculator'

export default function SellerSection({
  seller,
  products,
  isSelected,
  onSelectionChange,
  onUpdateQuantity,
  onRemove,
}) {
  return (
    <section key={seller.id} className="mb-3">
      <CardContainer className="bg-body">
        {/* Encabezado del vendedor */}
        <div className="d-flex p-3 align-items-center">
          <input
            type="checkbox"
            name="seller"
            className="form-check-input m-0 me-3"
            checked={isSelected}
            onChange={onSelectionChange}
          />
          <h6 className={`fw-medium mb-0 ${!isSelected ? 'text-muted' : ''}`}>
            Productos de {seller.display_name || `@${seller.username}`}
          </h6>
        </div>
        <hr className="m-0 border-secondary" />

        {/* Listado de productos del vendedor */}
        {products.map(item => (
          <CartItem
            key={item.id}
            item={item}
            onUpdateQuantity={onUpdateQuantity}
            onRemove={onRemove}
          />
        ))}

        {/* Información del envío */}
        {(() => {
          const shippingInfo = calculateSellerShipping(products)
          return (
            <>
              <small className="d-flex justify-content-between px-3 py-2">
                <span>Envío</span>
                <span
                  className={
                    shippingInfo.isFreeShipping
                      ? 'fw-medium text-success-meli'
                      : ''
                  }>
                  {shippingInfo.isFreeShipping
                    ? 'Gratis'
                    : `$ ${formatPrice(shippingInfo.shippingCost).whole}`}
                </span>
              </small>
              <div className="p-3 bg-disabled-meli">
                <Row className="g-3 align-items-center">
                  <Col>
                    <ProgressBar
                      variant={
                        shippingInfo.progress === 100 ? 'success' : 'primary'
                      }
                      now={shippingInfo.progress}
                      style={{ height: '5px' }}
                    />
                  </Col>
                  <Col xs="auto">
                    <span
                      className={`fw-medium ${
                        shippingInfo.isFreeShipping
                          ? 'text-success-meli'
                          : 'text-muted'
                      }`}
                      style={{ fontSize: '12px' }}>
                      {' '}
                      Envío gratis
                    </span>
                  </Col>
                </Row>
                {/* Mensaje del envío */}
                <small>
                  {shippingInfo.isFreeShipping ? (
                    <span>
                      Aprovecha tu envío gratis agregando más productos de{' '}
                      <strong>
                        {seller.display_name || `@${seller.username}`}
                      </strong>
                      .
                    </span>
                  ) : (
                    <span>
                      Agrega ${' '}
                      {formatPriceWithDecimals(shippingInfo.missingAmount)} más
                      para conseguir envío gratis en productos de{' '}
                      <strong>
                        {seller.display_name || `@${seller.username}`}
                      </strong>
                      .
                    </span>
                  )}
                </small>
              </div>
            </>
          )
        })()}
      </CardContainer>
    </section>
  )
}
