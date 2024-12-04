import { OverlayTrigger, Popover, Row } from 'react-bootstrap'
import { PUBLICATION_TYPES } from '@/constants/pricing'
import PublicationType from './PublicationType'
import FreeImage from './FreeImage'
import ClassicImage from './ClassicImage'
import PremiumImage from './PremiumImage'
import { formatPriceWithDecimals } from '@/utils/formatters'
import { calculateFee, getPopoverMessage } from '@/utils/feeCalculator'
import { useState } from 'react'

/**
 * Sección para seleccionar tipo de publicación
 * - Muestra costos por tipo de publicación
 * - Calcula el cargo por venta
 * - Muestra características de cada tipo de publicación
 * - Incluye popovers con información adicional
 */
export default function PublicationTypeSection({ selected, onChange, price }) {
  const [activePopover, setActivePopover] = useState(null)

  const getImage = type => {
    switch (type) {
      case 'free':
        return <FreeImage />
      case 'classic':
        return <ClassicImage />
      case 'premium':
        return <PremiumImage />
      default:
        return null
    }
  }

  return (
    <>
      <div className="p-4">
        <h6 className="fw-bold">Tipo de publicación</h6>
        <p className="mb-0 text-muted">
          Elige la exposición y las características de tu publicación.
        </p>
      </div>
      <hr className="border-secondary m-0" />
      <div className="p-4">
        <Row className="g-0 gap-3 user-select-none mb-2">
          {Object.values(PUBLICATION_TYPES).map(type => (
            <PublicationType
              key={type.value}
              type={type.value}
              selected={selected === type.value}
              onChange={onChange}>
              <div>{getImage(type.value)}</div>
              <h6 className="fw-bold mt-3">{type.text}</h6>
              <div className="bg-disabled-meli d-flex flex-column justify-content-between p-3 w-100 h-100 mt-2">
                <ul className="ps-3 text-muted">
                  <span style={{ fontSize: '13px' }}>
                    {type.features.map((feature, i) => (
                      <li key={i}>{feature}</li>
                    ))}
                  </span>
                </ul>
                <div>
                  <h5 className="fw-bold">
                    ${' '}
                    {formatPriceWithDecimals(
                      calculateFee(
                        parseFloat(price),
                        type.feePercentage,
                        type.value,
                      ),
                    )}
                    {type.value !== 'free' && (
                      <OverlayTrigger
                        show={activePopover === type.value}
                        placement="bottom"
                        overlay={
                          <Popover
                            className="p-3 shadow border-0"
                            onMouseEnter={() => setActivePopover(type.value)}
                            onMouseLeave={() => setActivePopover(null)}>
                            {getPopoverMessage(type, parseFloat(price))}
                          </Popover>
                        }>
                        <i
                          className="bi bi-info-circle fs-6 text-primary ms-2"
                          onMouseEnter={() => setActivePopover(type.value)}
                          onMouseLeave={() => setActivePopover(null)}
                        />
                      </OverlayTrigger>
                    )}
                  </h5>
                  <span style={{ fontSize: '11px' }}>Cargo por venta</span>
                </div>
              </div>
            </PublicationType>
          ))}
        </Row>
        <span className="text-muted" style={{ fontSize: '11px' }}>
          Ten en cuenta que los cargos incluyen IVA.
        </span>
      </div>
    </>
  )
}
