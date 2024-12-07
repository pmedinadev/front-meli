import { Button, FormCheck, OverlayTrigger, Popover } from 'react-bootstrap'
import { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { calculateShipping } from '@/utils/feeCalculator'
import { formatPriceWithDecimals } from '@/utils/formatters'
import ShippingModal from './ShippingModal'

/**
 * Sección para configurar envío del producto
 * - Calcula costos según el precio y tipo de publicación
 * - Permite seleccionar quién paga el envío en publicaciones gratuitas
 * - Muestra advertencia si el costo de envío supera el precio del producto
 */
export default function ShippingSection({
  publicationType,
  price,
  condition,
  selectedShipping,
  onShippingChange,
  shippingType,
}) {
  const isFreePublication = publicationType === 'free'
  const [showPopover, setShowPopover] = useState(false)
  const [showModal, setShowModal] = useState(false)

  const numericPrice = parseFloat(price || 0)
  const { cost, displayCost } = calculateShipping(
    numericPrice,
    condition,
    publicationType,
  )

  const isShippingFree = cost > numericPrice

  useEffect(() => {
    if (isFreePublication && shippingType === 'paid_by_buyer') {
      onShippingChange('paid')
    }
  }, [shippingType, isFreePublication])

  const handleModalOpen = () => setShowModal(true)
  const handleModalClose = () => setShowModal(false)

  return (
    <>
      <header className="p-4">
        <h6 className="fw-bold">Forma de entrega</h6>
        <span className="text-muted">
          {(isFreePublication && selectedShipping === 'paid') ||
          isShippingFree ? (
            'Mercado Envíos a cargo del comprador'
          ) : (
            <>
              Mercado Envíos (pagas{' '}
              <strong>$ {formatPriceWithDecimals(displayCost)}</strong>)
            </>
          )}
        </span>
      </header>
      <hr className="border-secondary m-0" />
      <section className="p-4">
        <div className="border rounded p-4">
          <header className="d-flex align-items-center">
            <i className="bi bi-check-circle-fill text-success me-3" />
            <span className="fw-medium me-3">Mercado Envíos</span>
            <Button
              variant="link"
              size="sm"
              className="p-0 fw-medium text-decoration-none"
              onClick={handleModalOpen}>
              ¿Cómo funciona?
            </Button>
          </header>

          {/* Con envío gratis */}
          {!isShippingFree && (
            <article className="bg-disabled-meli rounded p-3 mt-4 d-flex">
              {isFreePublication && (
                <FormCheck
                  type="radio"
                  name="shipping"
                  value="free"
                  checked={selectedShipping === 'free'}
                  onChange={e => onShippingChange(e.target.value)}
                />
              )}
              <div className={isFreePublication ? 'ms-2' : ''}>
                <span
                  className="d-block mb-2"
                  onClick={() => isFreePublication && onShippingChange('free')}
                  style={{ cursor: 'pointer' }}>
                  Con envío gratis para el comprador
                  <OverlayTrigger
                    show={showPopover}
                    placement="right"
                    overlay={
                      <Popover
                        className="p-3 shadow border-0"
                        onMouseEnter={() => setShowPopover(true)}
                        onMouseLeave={() => setShowPopover(false)}>
                        En algunos casos, ofrecerás envío con descuento en lugar
                        de envío gratis. Esto dependerá del precio del producto
                        y la distancia con tu comprador.
                      </Popover>
                    }>
                    <i
                      className="bi bi-question-circle text-primary ms-2"
                      onMouseEnter={() => setShowPopover(true)}
                      onMouseLeave={() => setShowPopover(false)}
                    />
                  </OverlayTrigger>
                </span>
                <small className="d-block text-muted">
                  Pagas ${' '}
                  <strong>{formatPriceWithDecimals(displayCost)}</strong> por
                  envío
                  {isFreePublication ? '' : ' a cualquier destino'}.
                </small>
              </div>
            </article>
          )}

          {/* Sin envío gratis - Solo para publicación gratuita */}
          {isFreePublication && !isShippingFree && (
            <article className="bg-disabled-meli rounded p-3 mt-2 d-flex">
              <FormCheck
                type="radio"
                name="shipping"
                value="paid"
                checked={selectedShipping === 'paid'}
                onChange={e => onShippingChange(e.target.value)}
              />
              <div className="ms-2">
                <span
                  className="d-block mb-2"
                  onClick={() => isFreePublication && onShippingChange('paid')}
                  style={{ cursor: 'pointer' }}>
                  No ofrecer envío gratis
                </span>
                <small className="d-block text-muted">
                  El comprador deberá hacerse cargo del costo del envío.
                </small>
              </div>
            </article>
          )}

          {/* Sin envío gratis si el costo del envío supera el precio del producto*/}
          {isShippingFree && (
            <article className="bg-disabled-meli rounded p-3 mt-4 d-flex">
              <div className="ms-2">
                <span className="d-block mb-2">No ofreces envío gratis</span>
                <small className="d-block text-muted">
                  Como el costo del envío supera el valor de tu producto, el
                  comprador deberá hacerse cargo del mismo.
                </small>
              </div>
            </article>
          )}
        </div>
      </section>

      {/* Modal con más información */}
      <ShippingModal show={showModal} onHide={handleModalClose} />
    </>
  )
}

ShippingSection.propTypes = {
  publicationType: PropTypes.oneOf(['free', 'classic', 'premium']),
  price: PropTypes.string,
  condition: PropTypes.oneOf(['new', 'used', 'reaconditioned']),
  selectedShipping: PropTypes.oneOf(['free', 'paid']),
  onShippingChange: PropTypes.func,
  shippingType: PropTypes.oneOf(['paid_by_seller', 'paid_by_buyer']),
}
