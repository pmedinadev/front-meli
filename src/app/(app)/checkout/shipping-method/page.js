import CardContainer from '@/components/layout/CardContainer'
import { Button, Col, Container, FormCheck, Row } from 'react-bootstrap'
import styles from '../Checkout.module.css'

export default function ShippingMethodPage() {
  return (
    <Container className="py-5">
      <Row>
        <Col>
          <h2 className="mb-4">
            <span className={styles.stepTitle}>Elige el domicilio</span>
          </h2>
          <CardContainer className="bg-body px-4 py-3 mb-4">
            <Row>
              <Col xs="auto">
                <FormCheck type="radio" name="address" />
              </Col>
              <Col>
                <p className="mb-1">
                  <span className={`${styles.columnText}`}>C.P. 80246</span>
                </p>
                <p className="mb-0 text-muted">
                  <span className="d-block">Calle San Pablo 4085</span>
                  <span>Jesús Pablo Medina García - 6672679789</span>
                </p>
                <hr className="border-secondary" />
                <Button
                  variant="link"
                  className="p-0 text-decoration-none fw-medium">
                  Editar
                </Button>
              </Col>
            </Row>
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
            <hr className="border-secondary" />
            <div className="d-flex justify-content-between">
              <span>Total</span>
              <span>$ 5,596.75</span>
            </div>
          </div>
        </Col>
      </Row>
    </Container>
  )
}
