import CardContainer from '@/components/layout/CardContainer'
import CartIcon from '@/components/svg/CartIcon'
import { Button, Col, Container, Row } from 'react-bootstrap'

export default function CartPage() {
  return (
    <Container className="mt-5">
      <Row className='g-5'>
        <Col>
          <CardContainer className="bg-disabled-meli p-3 h-100 d-flex align-items-center justify-content-center">
            <Row className="align-items-center w-100">
              <Col className="col-auto">
                <CartIcon />
              </Col>
              <Col>
                <h6>Add products and get free shipping</h6>
                <small>
                  To obtain free shipping add products from the same seller.
                </small>
              </Col>
              <Col className="col-auto">
                <Button variant="link" className='text-decoration-none'>
                  <small className='fw-medium'>Discover products</small>
                </Button>
              </Col>
            </Row>
          </CardContainer>
        </Col>
        <Col className="col-4">
          <CardContainer className="bg-disabled-meli d-flex flex-column justify-content-center h-100 text-body-tertiary">
            <div className="p-4">
              <h6 className="mb-0">Purchase summary</h6>
            </div>
            <hr className="m-0" />
            <div className="p-4">
              <small>
                Here you will see the amounts of your purchase once you add
                products.
              </small>
            </div>
          </CardContainer>
        </Col>
      </Row>
    </Container>
  )
}