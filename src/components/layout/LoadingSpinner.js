import { Spinner } from 'react-bootstrap'

export default function LoadingSpinner() {
  return (
    <div className="text-center mt-5">
      <div className="d-inline-flex bg-body rounded-circle p-2">
        <Spinner animation="border" variant="primary" role="status">
          <span className="visually-hidden">Cargando...</span>
        </Spinner>
      </div>
    </div>
  )
}
