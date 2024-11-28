'use client'

import { notFound, useParams } from 'next/navigation'
import LoadingSpinner from '@/components/layout/LoadingSpinner'
import { useCategories } from '@/hooks/useCategories'
import { Card, CardBody, CardImg, Col, Container, Row } from 'react-bootstrap'
import { CldImage } from 'next-cloudinary'
import Link from 'next/link'
import { formatPrice } from '@/utils/formatters'

export default function CategoryDetail() {
  const { title } = useParams()
  const { useCategory } = useCategories()
  const { data: category, isLoading: loading, error } = useCategory(title)

  if (loading) return <LoadingSpinner />
  if (error) return notFound()

  return (
    <>
      <div style={{ backgroundColor: '#1f4e96' }} className="p-4 text-center">
        <h4 className="mb-0 text-white">{category.name}</h4>
      </div>
      <Container className="my-4">
        <Row xs="2" sm="2" md="3" lg="4" xl="5" className="g-3">
          {category.products.map((product, index) => (
            <Col key={product.id}>
              <Card className="border-0 shadow-sm">
                <div style={{ position: 'relative', aspectRatio: '1/1' }}>
                  <CardImg
                    as={CldImage}
                    src={product.photos[0]?.url || 'users/placeholder'}
                    {...(product.photos[0]?.url && {
                      preserveTransformations: true,
                    })}
                    format="avif"
                    fill
                    {...(index < 16 ? { priority: true } : { loading: 'lazy' })}
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    alt={product.title}
                    style={{ objectFit: 'cover' }}
                    className="rounded-bottom-0"
                  />
                </div>
                <CardBody>
                  <div className="d-flex">
                    <span className="fs-5 fw-medium">
                      $ {formatPrice(product.price).whole}
                      <sup style={{ fontSize: '12px' }}>
                        {formatPrice(product.price).decimal}
                      </sup>
                    </span>
                  </div>
                  <small>
                    <span className="d-block text-success fw-medium mb-2">
                      Envío gratis
                    </span>
                    <span className="category-detail-product-title">
                      {product.title}
                    </span>
                  </small>
                  <Link
                    href={product.href}
                    className="stretched-link"
                  />
                </CardBody>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
    </>
  )
}
