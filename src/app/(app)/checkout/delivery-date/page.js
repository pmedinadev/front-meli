import CardContainer from '@/components/layout/CardContainer'
import { Button, Col, Container, FormCheck, Row } from 'react-bootstrap'
import styles from '../Checkout.module.css'
import Image from 'next/image'

export default function DeliveryDatePage() {
  return (
    <Container className="py-5">
      <Row>
        <Col>
          <h2 className="mb-0">
            <span className={styles.stepTitle}>
              Elige cuándo llega tu compra
            </span>
          </h2>
          <div className="d-flex align-items-center mb-4">
            <i className={`bi bi-geo-alt ${styles.disclaimerAddress}`} />
            <p className="mb-0 ms-2">
              <span className={styles.disclaimerAddress}>
                Envío a Calle San Pablo 4085
              </span>
            </p>
          </div>
          <CardContainer className="bg-body mb-4">
            <div className="px-4 py-3 d-flex justify-content-between align-items-center">
              <span className="fw-medium">Envío 1</span>
              <Image
                src="/profile_avatar_placeholder.png"
                width={38}
                height={38}
                alt="Profile avatar"
                className="rounded-circle"
              />
            </div>
            <hr className="m-0 border-secondary" />
            <div className="px-4 py-3 d-flex justify-content-between align-items-center">
              <FormCheck type="radio" label="Miércoles" />
              <span className="text-success-meli">Gratis</span>
            </div>
          </CardContainer>

          <div className="text-end d-block">
            <Button
              variant="light"
              className="fw-medium px-4 py-2 me-2 bg-btn-secondary text-primary border-0">
              Agregar dirección
            </Button>
            <Button className="fw-medium px-4 py-2">Continuar</Button>
          </div>
        </Col>
        <Col xs={4}>
          <div className="bg-disabled-meli px-5 py-4">
            <h3 className="fs-6">
              <span>Resumen de compra</span>
            </h3>
            <hr className="border-secondary" />
            <div className="d-flex justify-content-between">
              <span>Productos (4)</span>
              <span>$ 5,596.75</span>
            </div>
            <div className="d-flex justify-content-between">
              <span>Envío</span>
              <span>$ 152</span>
            </div>
            <hr className="border-secondary" />
            <div className="d-flex justify-content-between">
              <span>Pagas</span>
              <span>$ 5,596.75</span>
            </div>
          </div>
        </Col>
      </Row>
    </Container>
  )
}
