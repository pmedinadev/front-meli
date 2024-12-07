import { OverlayTrigger, Popover } from 'react-bootstrap'
import Link from 'next/link'
import { useState } from 'react'
import { PUBLICATION_TYPES } from '@/constants/pricing'
import {
  calculateFee,
  calculateShipping,
  calculateTaxes,
} from '@/utils/feeCalculator'
import { formatPriceWithDecimals } from '@/utils/formatters'

/**
 * Resumen de cargos y deducciones por venta
 * - Muestra precio de venta
 * - Calcula cargos por tipo de publicación
 * - Incluye costo de envío
 * - Calcula impuestos
 * - Muestra total neto por venta
 */
export default function ChargesSummary({
  price,
  publicationType,
  condition,
  selectedShipping,
}) {
  const [showPopover, setShowPopover] = useState(false)

  const numericPrice = parseFloat(price || 0)
  const fee = calculateFee(
    numericPrice,
    Object.values(PUBLICATION_TYPES).find(t => t.value === publicationType)
      ?.feePercentage,
    publicationType,
  )
  const { cost: shippingCost, displayCost } = calculateShipping(
    numericPrice,
    condition,
    publicationType,
  )
  const taxes = calculateTaxes(numericPrice)

  const isBuyerPaysShipping =
    shippingCost > numericPrice ||
    (publicationType === 'free' && selectedShipping === 'paid')

  const shippingDeduction = isBuyerPaysShipping ? 0 : displayCost

  const total = numericPrice - fee - shippingDeduction - taxes

  return (
    <div className="p-4 sticky-top">
      <h6 className="my-5">Resumen estimado de cargos</h6>

      <div className="text-muted fw-medium">
        <div className="d-flex align-items-center justify-content-between">
          <span style={{ fontSize: '12px' }}>Precio por publicación</span>
          <span style={{ fontSize: '13px' }}>
            $ {formatPriceWithDecimals(price || 0)}
          </span>
        </div>
        <hr />
        <div className="d-flex align-items-center justify-content-between">
          <div style={{ fontSize: '12px' }}>
            <span className="d-block">Cargo por venta</span>
            <span className="d-block fw-normal">
              {
                Object.values(PUBLICATION_TYPES).find(
                  t => t.value === publicationType,
                )?.text
              }
            </span>
          </div>
          <span style={{ fontSize: '13px' }}>
            {fee > 0 ? '- ' : ''} $ {formatPriceWithDecimals(fee)}
          </span>
        </div>
        <hr />
        <div className="d-flex align-items-center justify-content-between">
          <div style={{ fontSize: '12px' }}>
            <span className="d-block">Envío por Mercado Envíos</span>
            {(shippingCost > numericPrice ||
              (publicationType === 'free' && selectedShipping === 'paid')) && (
              <span className="d-block fw-normal">
                El comprador pagará el envío
              </span>
            )}
          </div>
          <span style={{ fontSize: '13px' }}>
            {shippingCost > numericPrice ||
            (publicationType === 'free' && selectedShipping === 'paid')
              ? '$ 0'
              : `${displayCost > 0 ? '- ' : ''} $ ${formatPriceWithDecimals(displayCost)}`}
          </span>
        </div>
        <hr />
        <div className="fw-medium">
          <div className="d-flex align-items-center justify-content-between">
            <div className="d-flex align-items-center">
              <span style={{ fontSize: '12px' }}>Impuestos</span>
              <OverlayTrigger
                show={showPopover}
                placement="top"
                overlay={
                  <Popover
                    className="p-3 shadow border-0"
                    onMouseEnter={() => setShowPopover(true)}
                    onMouseLeave={() => setShowPopover(false)}>
                    Por ley, debemos aplicarte impuestos con los porcentajes
                    máximos.{' '}
                    <Link href="" className="text-decoration-none">
                      Carga tu RFC
                    </Link>{' '}
                    para reducirlos o dejar de estar alcanzado.
                  </Popover>
                }>
                <i
                  className="bi bi-info-circle text-primary ms-2"
                  onMouseEnter={() => setShowPopover(true)}
                  onMouseLeave={() => setShowPopover(false)}
                />
              </OverlayTrigger>
            </div>
            <span style={{ fontSize: '13px' }}>
              {taxes > 0 ? '- ' : ''} $ {formatPriceWithDecimals(taxes)}
            </span>
          </div>
        </div>
      </div>
      <hr />
      <div className="fw-medium">
        <div className="d-flex align-items-center justify-content-between">
          <span style={{ fontSize: '12px' }}>Recibirás por cada venta</span>
          <span style={{ fontSize: '13px' }}>
            $ {formatPriceWithDecimals(total)}
          </span>
        </div>
      </div>
      <hr />
    </div>
  )
}
