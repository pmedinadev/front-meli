import { Button, OverlayTrigger, Tooltip } from 'react-bootstrap'

export default function DeliverySection() {
  return (
    <>
      <div className="p-4">
        <h6 className="fw-bold">Forma de entrega</h6>
        <p className="mb-0 text-muted">
          Mercado Envíos (pagas <strong>$ 95.40</strong>).
        </p>
      </div>
      <hr className="border-secondary m-0" />
      <div className="p-4">
        <div className="border rounded p-4">
          <div className="d-flex align-items-center">
            <i className="bi bi-check-circle-fill text-success me-3" />
            <span className="fw-medium me-3">Mercado Envíos</span>
            <Button
              variant="link"
              size="sm"
              className="p-0 fw-medium text-decoration-none">
              ¿Cómo funciona?
            </Button>
          </div>
          <div className="bg-disabled-meli rounded p-3 mt-4 d-flex flex-column">
            <span className="mb-2">
              Con envío gratis para el comprador
              <OverlayTrigger
                placement="right"
                overlay={
                  <Tooltip>
                    En algunos casos, ofrecerás envío con descuento en lugar de
                    envío gratis. Esto dependerá del precio y la distancia con
                    tu comprador.
                  </Tooltip>
                }>
                <i className="bi bi-question-circle text-primary ms-2" />
              </OverlayTrigger>
            </span>
            <small className="text-muted">
              Pagas $ 95.40 por envío a cualquier destino.
            </small>
          </div>
        </div>
      </div>
    </>
  )
}
