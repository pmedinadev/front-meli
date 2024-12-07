import { CldImage } from 'next-cloudinary'
import Link from 'next/link'
import {
  Button,
  Col,
  Offcanvas,
  OffcanvasBody,
  OffcanvasHeader,
  Row,
} from 'react-bootstrap'

export default function SuccessOffcanvas({ show, onHide, product, quantity }) {
  return (
    <Offcanvas show={show} onHide={onHide} placement="end">
      <OffcanvasHeader closeButton />
      <OffcanvasBody className="px-4">
        <Row className="mb-4">
          <Col className="col-auto">
            <div className="position-relative">
              <CldImage
                src={product.photos?.[0]?.public_id || 'users/placeholder'}
                width={60}
                height={60}
                crop="fill"
                alt={product.title}
                className="border border-3 border-success rounded-circle"
              />
              <div
                style={{
                  width: '24px',
                  height: '24px',
                  top: '80%',
                  left: '85%',
                }}
                className="position-absolute translate-middle bg-success rounded-circle text-center">
                <i className="bi bi-check-lg fs-6 text-white" />
              </div>
            </div>
          </Col>
          <Col className="text-truncate">
            <h5 className="mb-1">Agregaste a tu carrito</h5>
            <span className="d-block text-truncate">
              <small>{product.title}</small>
            </span>
            <span>
              <small>
                {quantity} unidad{quantity > 1 ? 'es' : ''}
              </small>
            </span>
          </Col>
        </Row>
        <hr className="m-0 p-0" />
        <div className="my-4">
          <Button className="bg-button-primary-meli w-100 fw-medium py-2 mb-2">
            Ver más productos Full
          </Button>
          <Button
            as={Link}
            href="/cart"
            className="bg-button-secondary-meli text-primary w-100 fw-medium border-0 py-2">
            Ir al carrito
          </Button>
        </div>
      </OffcanvasBody>
    </Offcanvas>
  )
}
