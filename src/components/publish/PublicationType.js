import { Col } from 'react-bootstrap'

export default function PublicationType({
  type,
  selected,
  onChange,
  children,
}) {
  return (
    <Col
      as="label"
      className={`border rounded p-3 d-flex flex-column align-items-center cursor-pointer 
      ${selected ? 'border-primary bg-light' : ''}`}>
      <input
        type="radio"
        name="publication_type"
        value={type}
        className="d-none"
        checked={selected}
        onChange={onChange}
      />
      {children}
    </Col>
  )
}
