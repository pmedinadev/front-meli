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

/**
 * Sección para configurar la garantía del producto
 * - Permite seleccionar el tipo de garantía
 * - Incluye duración personalizable
 * - Mantiene estado cuando se cambia entre tipos de garantía
 */
export default function WarrantySection({
  warranty,
  duration,
  durationType,
  onChange,
}) {
  const handleWarrantyClick = value => {
    onChange({
      target: {
        name: 'warranty_type',
        value,
      },
    })
  }

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
              <div
                className="d-inline-flex"
                onClick={() => handleWarrantyClick('seller')}>
                <FormCheck
                  type="radio"
                  name="warranty_type"
                  value="seller"
                  checked={warranty === 'seller'}
                  onChange={onChange}
                  className="mb-3"
                />
                <span className="ms-2" style={{ cursor: 'pointer' }}>
                  Garantía del vendedor
                </span>
              </div>
              {warranty === 'seller' && (
                <DurationInput
                  duration={duration}
                  durationType={durationType}
                  onChange={onChange}
                />
              )}
            </div>

            <div className="mb-3">
              <div
                className="d-inline-flex"
                onClick={() => handleWarrantyClick('manufacturer')}>
                <FormCheck
                  type="radio"
                  name="warranty_type"
                  value="manufacturer"
                  checked={warranty === 'manufacturer'}
                  onChange={onChange}
                  className="mb-3"
                />
                <span className="ms-2" style={{ cursor: 'pointer' }}>
                  Garantía de fábrica
                </span>
              </div>
              {warranty === 'manufacturer' && (
                <DurationInput
                  duration={duration}
                  durationType={durationType}
                  onChange={onChange}
                />
              )}
            </div>

            <div
              className="d-inline-flex"
              onClick={() => handleWarrantyClick('none')}>
              <FormCheck
                type="radio"
                name="warranty_type"
                value="none"
                checked={warranty === 'none'}
                onChange={onChange}
              />
              <span className="ms-2" style={{ cursor: 'pointer' }}>
                Sin garantía
              </span>
            </div>
          </Col>
        </Row>
      </div>
    </>
  )
}
