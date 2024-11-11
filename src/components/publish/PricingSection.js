import { Col, FormControl, InputGroup, Row } from 'react-bootstrap'
import InputGroupText from 'react-bootstrap/esm/InputGroupText'

export default function PricingSection({ price, onChange }) {
  return (
    <>
      <div className="p-4">
        <h6 className="fw-bold">Precio</h6>
        <p className="mb-0 text-muted">
          Indica a cuánto quieres vender el producto.
        </p>
      </div>
      <hr className="border-secondary m-0" />
      <div className="p-4">
        <Row>
          <Col xs={6}>
            <InputGroup>
              <InputGroupText className="bg-body text-muted">$</InputGroupText>
              <FormControl
                type="text"
                name="price"
                value={price}
                onChange={onChange}
              />
            </InputGroup>
          </Col>
        </Row>
      </div>
    </>
  )
}
