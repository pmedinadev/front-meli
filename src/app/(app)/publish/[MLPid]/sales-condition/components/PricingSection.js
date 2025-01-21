import { Col, FormControl, InputGroup, Row } from 'react-bootstrap'
import InputGroupText from 'react-bootstrap/esm/InputGroupText'

const MAX_PRICE = 9999999999
const MIN_PRICE = 35

/**
 * Sección para ingresar y validar el precio del producto
 * - Permite decimales (máximo 2)
 * - Valida precio mínimo y máximo
 * - Formatea automáticamente el precio con separador de miles
 */
export default function PricingSection({ price, onChange }) {
  const handlePriceChange = e => {
    let rawValue = e.target.value.replace(/[^\d.]/g, '')

    const decimalPoints = (rawValue.match(/\./g) || []).length
    if (decimalPoints > 1) {
      rawValue = rawValue.slice(0, rawValue.lastIndexOf('.'))
    }

    if (rawValue === '') {
      onChange({
        target: {
          name: 'price',
          value: '',
        },
      })
      return
    }

    if (rawValue.includes('.')) {
      const [whole, decimal] = rawValue.split('.')
      if (decimal?.length > 2) {
        rawValue = `${whole}.${decimal.slice(0, 2)}`
      }
    }

    onChange({
      target: {
        name: 'price',
        value: rawValue,
      },
    })
  }

  const value = parseFloat(price) || 0
  const isInvalid = price && (value > MAX_PRICE || value < MIN_PRICE)
  const feedbackMessage =
    value > MAX_PRICE
      ? `El precio máximo para publicar es $ ${new Intl.NumberFormat('en-US').format(MAX_PRICE)}`
      : `El precio mínimo para publicar es $ ${MIN_PRICE}`

  const displayValue = price
    ? price.includes('.') && price.split('.')[1]?.length < 2
      ? price
      : new Intl.NumberFormat('en-US').format(
          parseFloat(parseFloat(price).toFixed(2)),
        )
    : ''

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
            <InputGroup hasValidation>
              <InputGroupText className="bg-body text-muted">$</InputGroupText>
              <FormControl
                type="text"
                name="price"
                value={displayValue}
                maxLength={14}
                autoComplete="off"
                onChange={handlePriceChange}
                isInvalid={isInvalid}
              />
              <FormControl.Feedback type="invalid" className="fw-medium">
                {feedbackMessage}
              </FormControl.Feedback>
            </InputGroup>
          </Col>
        </Row>
      </div>
    </>
  )
}
