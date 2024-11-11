import { CONDITION_OPTIONS, INFO_CARDS } from '@/constants/product'
import { Col, FormCheck, Row } from 'react-bootstrap'
import CardInfo from '../layout/CardInfo'

export default function ConditionSection({ condition, onChange, onShowModal }) {
  return (
    <>
      <div className="p-4">
        <h6 className="fw-bold">Condición</h6>
        <p className="mb-0 text-muted">
          Indica el estado en que se encuentra tu producto.
        </p>
      </div>
      <hr className="border-secondary m-0" />
      <div className="p-4">
        <Row>
          <Col>
            {CONDITION_OPTIONS.map(option => (
              <FormCheck
                key={option.value}
                type="radio"
                label={option.label}
                name="condition"
                value={option.value}
                checked={condition === option.value}
                onChange={onChange}
                required
                className="mb-3"
              />
            ))}
          </Col>
          <Col>
            <CardInfo
              {...INFO_CARDS[1]}
              onClick={onShowModal}
              color="primary"
              icon="info-circle-fill"
            />
          </Col>
        </Row>
      </div>
    </>
  )
}
