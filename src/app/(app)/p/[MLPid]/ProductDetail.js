'use client'

import CardContainer from '@/components/layout/CardContainer'
import LoadingSpinner from '@/components/layout/LoadingSpinner'
import { useProducts } from '@/hooks/useProducts'
import { CldImage } from 'next-cloudinary'
import Image from 'next/image'
import { useParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import { Button, Col, Container, Row } from 'react-bootstrap'

const CONDITIONS = {
  new: 'Nuevo',
  used: 'Usado',
  reaconditioned: 'Reacondicionado',
}

export default function ProductDetail() {
  const { MLPid } = useParams()
  const { getProduct } = useProducts()
  const [product, setProduct] = useState(null)
  const [selectedPhoto, setSelectedPhoto] = useState(0)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadProduct = async () => {
      try {
        const productId = MLPid.replace('MLP', '')
        const productData = await getProduct(productId)
        setProduct(productData)
      } catch (error) {
        console.error(error)
      } finally {
        setLoading(false)
      }
    }

    loadProduct()
  }, [MLPid])

  const formatPrice = price => {
    const [whole, decimal] = parseFloat(price).toFixed(2).split('.')
    const formattedWhole = whole.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
    return { whole: formattedWhole, decimal: decimal === '00' ? null : decimal }
  }

  if (loading) return <LoadingSpinner />
  if (!product) return null

  return (
    <Container className="my-5">
      <CardContainer className="bg-body">
        <Row className="g-0">
          <Col className="col-8 p-4">
            {/* Imágenes */}
            <Row className="g-0 mb-4">
              <Col className="col-auto">
                <div className="d-flex flex-column gap-2">
                  {product.photos.map((photo, index) => (
                    <div
                      key={photo.id}
                      className={`border rounded p-1 cursor-pointer ${
                        selectedPhoto === index ? 'border-primary' : ''
                      }`}
                      onMouseEnter={() => setSelectedPhoto(index)}
                      role="button">
                      <CldImage
                        src={photo.public_id}
                        width={50}
                        height={50}
                        crop="fill"
                        alt={`${product.title} thumbnail ${index + 1}`}
                      />
                    </div>
                  ))}
                </div>
              </Col>
              <Col className="d-flex justify-content-center">
                {product.photos.length > 0 ? (
                  <CldImage
                    src={product.photos[selectedPhoto].public_id}
                    width={500}
                    height={500}
                    crop="fill"
                    alt={product.title}
                  />
                ) : (
                  <Image
                    src="/profile_avatar_placeholder.png"
                    width={500}
                    height={500}
                    alt={product.title}
                  />
                )}
              </Col>
            </Row>

            {/* Descripción */}
            <div className="border-top border-bottom px-3 py-5">
              <h5 className="fw-normal">Descripción</h5>
              <p className="mb-0 text-muted">
                {product.description || 'Sin descripción'}
              </p>
            </div>
          </Col>

          {/* Barra lateral */}
          <Col className="col-4 p-4">
            {/* Detalles del producto */}
            <div className="border rounded p-3 mb-3">
              <p className="text-muted mb-2">
                <small>
                  {CONDITIONS[product.condition] || product.condition}
                </small>
              </p>
              <h5 className="fw-bold">{product.title}</h5>
              <h2 className="fw-light">
                $ {formatPrice(product.price).whole}
                {formatPrice(product.price).decimal && (
                  <sup className="fs-6 ms-1">
                    {formatPrice(product.price).decimal}
                  </sup>
                )}
              </h2>
              <p className="fw-medium">
                {product.stock > 0
                  ? `Stock disponible (${product.stock} unidades)`
                  : 'Sin stock'}
              </p>
              <Button className="bg-button-primary-meli w-100 fw-medium py-2 mb-2">
                Comprar ahora
              </Button>
              <Button className="bg-button-secondary-meli text-primary w-100 fw-medium border-0 py-2">
                Agregar al carrito
              </Button>
            </div>

            {/* Detalles del vendedor */}
            <div className="border rounded p-3">
              <Row className="g-0 align-items-center mb-2">
                <Col className="col-auto me-3">
                  <CldImage
                    src={product.user?.avatar || 'users/placeholder'}
                    width="50"
                    height="50"
                    {...(product.user?.avatar && {
                      preserveTransformations: true,
                    })}
                    alt={`@${product.user?.username}'s profile picture`}
                    className="rounded-circle border border-tertiary"
                  />
                </Col>
                <Col>
                  <h5 className="mb-0">
                    {product.user?.display_name || `@${product.user?.username}`}
                  </h5>
                </Col>
              </Row>
              <small className="text-muted">
                <p className="mb-2">Vendedor de Mercado Libre</p>
                <div className="d-flex gap-3">
                  <p className="mb-0">
                    <strong>50</strong> productos
                  </p>
                  <p className="mb-0">
                    <strong>10</strong> ventas
                  </p>
                </div>
              </small>
            </div>
          </Col>
        </Row>
      </CardContainer>
    </Container>
  )
}
