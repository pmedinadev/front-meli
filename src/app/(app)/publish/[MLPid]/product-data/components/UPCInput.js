import { Col, FormControl, FormLabel } from 'react-bootstrap'

export default function UPCInput({ value, onChange }) {
  return (
    <Col xs={4}>
      <FormLabel>
        <small>Código universal de producto</small>
      </FormLabel>
      <FormControl type="text" name="upc" value={value} onChange={onChange} />
    </Col>
  )
}
