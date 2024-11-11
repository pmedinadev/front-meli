import {
  Col,
  FormCheck,
  FormControl,
  FormSelect,
  InputGroup,
  Row,
} from 'react-bootstrap'
import { WARRANTY_DURATION_TYPES } from '@/constants/pricing'

const DurationInput = ({ duration, durationType, onChange }) => (
  <InputGroup className="mb-3 ms-4">
    <FormControl
      type="text"
      name="warranty_duration"
      value={duration}
      onChange={onChange}
      className="w-60"
    />
    <FormSelect
      name="warranty_duration_type"
      value={durationType}
      onChange={onChange}>
      {WARRANTY_DURATION_TYPES.map(type => (
        <option key={type.value} value={type.value}>
          {type.label}
        </option>
      ))}
    </FormSelect>
  </InputGroup>
)

export default function WarrantySection({
  warranty,
  duration,
  durationType,
  onChange,
}) {
  return (
    <>
      <div className="p-4">
        <h6 className="fw-bold">Garantía</h6>
        <p className="mb-0 text-muted">
          Indica el tipo de garantía que ofreces.
        </p>
      </div>
      <hr className="border-secondary m-0" />
      <div className="p-4">
        <Row>
          <Col xs={6}>
            <div className="mb-3">
              <FormCheck
                type="radio"
                name="warranty_type"
                value="seller"
                label="Garantía del vendedor"
                checked={warranty === 'seller'}
                onChange={onChange}
                className="mb-3"
              />
              {warranty === 'seller' && (
                <DurationInput
                  duration={duration}
                  durationType={durationType}
                  onChange={onChange}
                />
              )}
            </div>

            <div className="mb-3">
              <FormCheck
                type="radio"
                name="warranty_type"
                value="manufacturer"
                label="Garantía de fábrica"
                checked={warranty === 'manufacturer'}
                onChange={onChange}
                className="mb-3"
              />
              {warranty === 'manufacturer' && (
                <DurationInput
                  duration={duration}
                  durationType={durationType}
                  onChange={onChange}
                />
              )}
            </div>

            <div>
              <FormCheck
                type="radio"
                name="warranty_type"
                value="none"
                label="Sin garantía"
                checked={warranty === 'none'}
                onChange={onChange}
              />
            </div>
          </Col>
        </Row>
      </div>
    </>
  )
}
