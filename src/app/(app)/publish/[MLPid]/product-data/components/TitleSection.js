import { FormControl, FormText } from 'react-bootstrap'
import CardInfo from '../../../../../../components/layout/CardInfo'
import { INFO_CARDS } from '@/constants/product'

export default function TitleSection({ title, onChange, onShowModal }) {
  return (
    <>
      <div className="p-4">
        <h6 className="fw-bold">Título</h6>
        <p className="mb-0 text-muted">
          Incluye producto, marca, modelo y destaca sus características
          principales.
        </p>
      </div>
      <hr className="border-secondary m-0" />
      <div className="p-4">
        <CardInfo
          {...INFO_CARDS[2]}
          onClick={onShowModal}
          color="primary"
          icon="info-circle-fill"
          className="mb-4"
        />
        <FormControl
          type="text"
          name="title"
          value={title}
          onChange={onChange}
          placeholder="Ej: Samsung Galaxy S9 Dual Sim 32 GB ram azul"
          maxLength={200}
          required
        />
        <div className="text-end">
          <FormText className="text-muted">
            <small>{title.length} / 200</small>
          </FormText>
        </div>
      </div>
    </>
  )
}
