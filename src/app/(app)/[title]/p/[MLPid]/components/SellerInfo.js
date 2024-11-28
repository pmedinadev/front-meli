import { CldImage } from 'next-cloudinary'
import { Col, Row } from 'react-bootstrap'

export default function SellerInfo({ user }) {
  return (
    <div className="border rounded p-3">
      <Row className="g-0 align-items-center mb-2">
        <Col className="col-auto me-3">
          <CldImage
            src={user?.avatar || 'users/placeholder'}
            width="50"
            height="50"
            {...(user?.avatar && {
              preserveTransformations: true,
            })}
            alt={`@${user?.username}'s profile picture`}
            className="rounded-circle border border-tertiary"
          />
        </Col>
        <Col>
          <h5 className="mb-0">{user?.display_name || `@${user?.username}`}</h5>
        </Col>
      </Row>
      <small className="text-muted">
        <p className="mb-2">Vendedor de Mercado Libre</p>
        <div className="d-flex gap-3">
          <p className="mb-0">
            <strong>50</strong> productos
          </p>
          <p className="mb-0">
            <strong>10</strong> ventas
          </p>
        </div>
      </small>
    </div>
  )
}
