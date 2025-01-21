'use client'

import { useCategories } from '@/hooks/useCategories'
import CardContainer from '@/components/layout/CardContainer'
import { Col, Container, Row } from 'react-bootstrap'
import Link from 'next/link'
import LoadingSpinner from '@/components/layout/LoadingSpinner'
import Image from 'next/image'

export default function Categories() {
  const { categories, loading, error } = useCategories()

  if (loading) return <LoadingSpinner />
  if (error) return <p>Error: {error.message}</p>

  return (
    <Container className="my-4">
      <h4 className="fw-normal mb-4">Categorías para comprar y vender</h4>
      <CardContainer className="bg-body px-5 py-5">
        {categories &&
          categories.map((category, index) => (
            <div key={category.id}>
              <Link
                href={`/c/${category.slug}`}
                className="link-dark text-decoration-none">
                <Row className="align-items-center">
                  <Col xs="auto">
                    <Image
                      src={`/images/categories/${index + 1}.webp`}
                      width={65}
                      height={65}
                      alt={category.name}
                    />
                  </Col>
                  <Col>
                    <h6 className="fw-bold mb-0">{category.name}</h6>
                  </Col>
                </Row>
              </Link>

              {index < categories.length - 1 && (
                <hr className="border-secondary" />
              )}
            </div>
          ))}
      </CardContainer>
    </Container>
  )
}
