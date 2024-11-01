'use client'

import CardContainer from '@/components/layout/CardContainer'
import LoadingSpinner from '@/components/layout/LoadingSpinner'
import CartIcon from '@/components/svg/CartIcon'
import { useAuth } from '@/hooks/auth'
import { Button, Col, Container, Row } from 'react-bootstrap'

export default function Cart() {
  const { user } = useAuth({ middleware: 'auth' })

  if (!user) {
    return <LoadingSpinner />
  }

  return (
    <Container className="mt-5">
      <Row className="g-5">
        <Col>
          <CardContainer className="bg-disabled-meli p-3 h-100 d-flex align-items-center justify-content-center">
            <Row className="align-items-center w-100">
              <Col className="col-auto">
                <CartIcon />
              </Col>
              <Col>
                <h6>Agrega productos y consigue envío gratis</h6>
                <small>
                  Para obtener envío gratis, suma productos de un mismo
                  vendedor.
                </small>
              </Col>
              <Col className="col-auto">
                <Button variant="link" className="text-decoration-none">
                  <small className="fw-medium">Descubrir productos</small>
                </Button>
              </Col>
            </Row>
          </CardContainer>
        </Col>
        <Col className="col-4">
          <CardContainer className="bg-disabled-meli d-flex flex-column justify-content-center h-100 text-body-tertiary">
            <div className="p-4">
              <h6 className="mb-0">Resumen de compra</h6>
            </div>
            <hr className="m-0" />
            <div className="p-4">
              <small>
                Aquí verás los importes de tu compra una vez que agregues
                productos.
              </small>
            </div>
          </CardContainer>
        </Col>
      </Row>
    </Container>
  )
}
