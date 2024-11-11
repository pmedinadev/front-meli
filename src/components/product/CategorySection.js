import { Col, FormSelect, Row } from 'react-bootstrap'
import CardInfo from '../layout/CardInfo'
import { INFO_CARDS } from '@/constants/product'

export default function CategorySection({
  categoryId,
  categories,
  loading,
  error,
  onChange,
}) {
  return (
    <>
      <div className="p-4">
        <h6 className="fw-bold mb-0">Selecciona la categoría</h6>
      </div>
      <hr className="border-secondary m-0" />
      <div className="p-4">
        <Row>
          <Col>
            <FormSelect
              name="category_id"
              value={categoryId}
              onChange={onChange}
              required>
              {loading && <option>Cargando categorías...</option>}
              {error && <option>Error cargando categorías</option>}
              {categories &&
                categories.map(category => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
            </FormSelect>
            <p className="text-muted mt-3">
              <small>
                La categoría debe estar relacionada con el título para que tus
                compradores encuentren tu producto. Si la categoría no es
                correcta, anularemos tu publicación en Mercado Libre y te
                pediremos que vuelvas a publicar seleccionando otra categoría.
              </small>
            </p>
          </Col>
          <Col>
            <CardInfo
              {...INFO_CARDS[0]}
              color="primary"
              icon="info-circle-fill"
            />
          </Col>
        </Row>
      </div>
    </>
  )
}
