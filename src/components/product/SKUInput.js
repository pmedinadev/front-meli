import { Col, FormControl, FormLabel } from 'react-bootstrap'

export default function SKUInput({ value, onChange }) {
  return (
    <Col xs={4}>
      <FormLabel>
        <small>Código de identificación (SKU)</small>
      </FormLabel>
      <FormControl type="text" name="sku" value={value} onChange={onChange} />
    </Col>
  )
}
