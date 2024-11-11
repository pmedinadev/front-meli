import { PUBLICATION_TYPES } from '@/constants/pricing'

export default function ChargesSummary({ price, publicationType }) {
  const calculateFee = () => {
    const type = Object.values(PUBLICATION_TYPES).find(
      t => t.value === publicationType,
    )
    const numericPrice = parseFloat(price) || 0
    return (numericPrice * (type?.feePercentage || 0)) / 100
  }

  const fee = calculateFee()
  const shippingCost = 95.4
  const total = parseFloat(price || 0) - fee - shippingCost

  return (
    <div className="p-4 sticky-top">
      <h6 className="my-5">Resumen estimado de cargos</h6>
      <small>
        <div className="text-muted">
          <div className="d-flex justify-content-between">
            <p className="mb-0">Precio por publicación</p>
            <p className="mb-0">$ {price || '0.00'}</p>
          </div>
          <hr />
          <div className="d-flex justify-content-between">
            <p className="mb-0">Cargo por venta</p>
            <p className="mb-0">- $ {fee.toFixed(2)}</p>
          </div>
          <hr />
          <div className="d-flex justify-content-between">
            <p className="mb-0">Envío por Mercado Envíos</p>
            <p className="mb-0">- $ {shippingCost.toFixed(2)}</p>
          </div>
        </div>
        <hr />
        <div className="fw-medium">
          <div className="d-flex justify-content-between">
            <p className="mb-0">Recibirás por cada venta</p>
            <p className="mb-0">$ {total.toFixed(2)}</p>
          </div>
        </div>
        <hr />
      </small>
    </div>
  )
}
