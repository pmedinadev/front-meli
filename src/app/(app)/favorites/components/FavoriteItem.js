import { Button, Col, Row } from 'react-bootstrap'
import Image from 'next/image'

export default function FavoriteItem({
  title,
  price,
  photos,
  onRemove,
  isRemoving,
}) {
  return (
    <Row className="bg-body p-4 g-0 border-top">
      <Col className="me-4" xs="auto">
        <div
          className="bg-body-meli d-flex align-items-center justify-content-center"
          style={{ width: '160px', height: '160px' }}>
          {photos?.[0]?.url ? (
            <Image src={photos[0].url} alt={title} width={160} height={160} />
          ) : (
            <i className="bi bi-image fs-2" />
          )}
        </div>
      </Col>
      <Col>
        <h5 className="fw-normal mb-3">{title}</h5>
        <h4 className="fw-medium">$ {price}</h4>
        <small>
          {/* <span className="fw-medium text-success d-block mb-3">
            Envío gratis
          </span> */}

          {/* <Button
            className="p-0 me-4 text-decoration-none fw-medium"
            size="sm"
            variant="link">
            Agregar a lista
          </Button> */}

          <Button
            className="p-0 text-decoration-none fw-medium"
            size="sm"
            variant="link"
            onClick={onRemove}
            disabled={isRemoving}>
            {isRemoving ? 'Eliminando...' : 'Eliminar'}
          </Button>
        </small>
      </Col>
    </Row>
  )
}
