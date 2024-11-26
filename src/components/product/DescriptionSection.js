import { FormControl, FormText } from 'react-bootstrap'
import CardInfo from '../layout/CardInfo'
import { INFO_CARDS } from '@/constants/product'

export default function DescriptionSection({ description, onChange }) {
  return (
    <>
      <div className="p-4">
        <h6 className="fw-bold">Descripción</h6>
        <p className="mb-0 text-muted">
          Detalla las principales características de tu producto.
        </p>
      </div>
      <hr className="border-secondary m-0" />
      <div className="p-4">
        <CardInfo
          {...INFO_CARDS[3]}
          color="primary"
          icon="info-circle-fill"
          className="mb-4"
        />
        <FormControl
          as="textarea"
          name="description"
          value={description}
          onChange={onChange}
          placeholder="Escribe más información para tus compradores"
          rows={6}
          style={{ resize: 'none' }}
          maxLength={50000}
          required
        />
        <div className="text-end">
          <FormText className="text-muted">
            <small>{description.length} / 50000</small>
          </FormText>
        </div>
      </div>
    </>
  )
}
