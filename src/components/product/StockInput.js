import { Col, FormControl, FormLabel, InputGroup } from 'react-bootstrap'
import InputGroupText from 'react-bootstrap/esm/InputGroupText'

export default function StockInput({ value, onChange }) {
  return (
    <Col xs={4}>
      <FormLabel>
        <small>Stock (requerido)</small>
      </FormLabel>
      <InputGroup>
        <FormControl
          type="text"
          name="stock"
          value={value}
          onChange={onChange}
          required
          className="border-end-0"
        />
        <InputGroupText className="bg-body text-muted">
          <small>Unidades</small>
        </InputGroupText>
      </InputGroup>
    </Col>
  )
}
