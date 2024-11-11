import { OverlayTrigger, Row, Tooltip } from 'react-bootstrap'
import { PUBLICATION_TYPES } from '@/constants/pricing'
import PublicationType from './PublicationType'
import FreeImage from './FreeImage'
import ClassicImage from './ClassicImage'
import PremiumImage from './PremiumImage'

const calculateFee = (price, percentage) => {
  return price ? (price * percentage) / 100 : 0
}

export default function PublicationTypeSection({ selected, onChange, price }) {
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
        <Row className="g-0 gap-3 user-select-none">
          {Object.entries(PUBLICATION_TYPES).map(([key, type]) => (
            <PublicationType
              key={type.value}
              type={type.value}
              selected={selected === type.value}
              onChange={onChange}>
              <div>{getImage(type.value)}</div>
              <h6 className="fw-bold mt-3">
                {key.charAt(0) + key.slice(1).toLowerCase()}
              </h6>
              <div className="bg-disabled-meli d-flex flex-column justify-content-between p-3 w-100 h-100 mt-2">
                <ul className="ps-3 text-muted">
                  <small>
                    {type.features.map((feature, i) => (
                      <li key={i}>{feature}</li>
                    ))}
                  </small>
                </ul>
                <div>
                  <h5 className="fw-bold">
                    ${' '}
                    {calculateFee(
                      parseFloat(price),
                      type.feePercentage,
                    ).toFixed(2)}
                    <OverlayTrigger
                      placement="top"
                      overlay={
                        <Tooltip>
                          Pagarás el {type.feePercentage}% en cada venta en esta
                          categoría.
                        </Tooltip>
                      }>
                      <i className="bi bi-info-circle fs-6 text-primary ms-2" />
                    </OverlayTrigger>
                  </h5>
                  <small>Cargo por venta</small>
                </div>
              </div>
            </PublicationType>
          ))}
        </Row>
      </div>
    </>
  )
}
