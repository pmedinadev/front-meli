'use client'

import Link from 'next/link'
import { Col, Row } from 'react-bootstrap'
import { CldImage } from 'next-cloudinary'

const CONDITIONS = {
  new: 'Nuevo',
  used: 'Usado',
  reaconditioned: 'Reacondicionado',
}

const formatPrice = price => {
  const [whole, decimal] = parseFloat(price).toFixed(2).split('.')
  const formattedWhole = whole.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
  return { whole: formattedWhole, decimal: decimal === '00' ? null : decimal }
}

export default function ProductCard({ product }) {
  const formattedPrice = formatPrice(product.price)

  return (
    <>
      <Link href={`/p/MLP${product.id}`} className="text-decoration-none">
        <Row className="g-0">
          <Col className="col-auto p-3">
            {product.photos && product.photos.length > 0 ? (
              <CldImage
                src={product.photos[0].public_id}
                width={196}
                height={196}
                crop="fill"
                alt={product.title}
              />
            ) : (
              <div
                className="bg-light d-flex align-items-center justify-content-center"
                style={{ width: '196px', height: '196px' }}>
                <i className="bi bi-image text-muted fs-1" />
              </div>
            )}
          </Col>
          <Col className="p-4">
            <h5 className="text-dark fw-light mb-3">{product.title}</h5>
            <h4 className="text-dark fw-normal mb-1">
              $ {formattedPrice.whole}
              {formattedPrice.decimal && (
                <sup style={{ fontSize: '14px' }} className="ms-1">
                  {formattedPrice.decimal}
                </sup>
              )}
            </h4>
            <span className="d-block mb-2">
              <small className="fw-medium text-success">Envío gratis</small>
            </span>
            <span className="d-block">
              <small className="text-muted">
                {CONDITIONS[product.condition]}
              </small>
            </span>
          </Col>
        </Row>
      </Link>
    </>
  )
}
