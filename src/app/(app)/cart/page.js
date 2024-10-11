import CardContainer from '@/components/layout/CardContainer'
import CartIcon from '@/components/svgs/CartIcon'
import { Button, Col, Container, Row } from 'react-bootstrap'

export default function CartPage() {
  return (
    <Container>
      <Row>
        <Col className="h-100">
          <CardContainer className="p-4 mt-4 h-100">
            <Row className="align-items-center">
              <Col className="col-auto">
                <CartIcon />
              </Col>
              <Col>
                <h5>Add products and get free shipping</h5>
                <p className="mb-0">
                  To obtain free shipping add products from the same seller.
                </p>
              </Col>
              <Col className="col-auto">
                <Button variant="link">Discover products</Button>
              </Col>
            </Row>
          </CardContainer>
        </Col>
        <Col className="col-4 h-100">
          <CardContainer className="p-4 mt-4 h-100">
            <h5>Purchase summary</h5>
            <hr />
            <p className="mb-0">
              Here you will see the amounts of your purchase once you add
              products
            </p>
          </CardContainer>
        </Col>
      </Row>
    </Container>
  )
}
