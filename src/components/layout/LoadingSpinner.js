import { Spinner } from 'react-bootstrap'

export default function LoadingSpinner() {
  return (
    <div className="text-center">
      <div className="d-inline-flex bg-body rounded-circle p-2">
        <Spinner animation="border" variant="primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      </div>
    </div>
  )
}
