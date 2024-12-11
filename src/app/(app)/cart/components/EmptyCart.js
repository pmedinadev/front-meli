import { Button, Col, Row } from 'react-bootstrap'
import CardContainer from '@/components/layout/CardContainer'
import CartSvg from './CartSvg'

export default function EmptyCart() {
  return (
    // Vista para cuando no hay productos en el carrito
    <CardContainer className="bg-disabled-meli p-3 h-100 d-flex align-items-center justify-content-center">
      <Row className="align-items-center w-100">
        <Col className="col-auto">
          <CartSvg />
        </Col>
        <Col>
          <h6>Agrega productos y consigue envío gratis</h6>
          <small>
            Para obtener envío gratis, suma productos de un mismo vendedor.
          </small>
        </Col>
        <Col className="col-auto">
          <Button variant="link" className="text-decoration-none">
            <small className="fw-medium">Descubrir productos</small>
          </Button>
        </Col>
      </Row>
    </CardContainer>
  )
}
