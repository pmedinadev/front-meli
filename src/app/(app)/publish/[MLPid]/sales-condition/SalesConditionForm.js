'use client'

import CardContainer from '@/components/layout/CardContainer'
import LoadingSpinner from '@/components/layout/LoadingSpinner'
import { useAuth } from '@/hooks/auth'
import Link from 'next/link'
import { Button, Col, Container, Form, Row } from 'react-bootstrap'
import { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { useProducts } from '@/hooks/useProducts'
import PricingSection from '@/components/publish/PricingSection'
import PublicationTypeSection from '@/components/publish/PublicationTypeSection'
import WarrantySection from '@/components/publish/WarrantySection'
import DeliverySection from '@/components/publish/DeliverySection'
import ChargesSummary from '@/components/publish/ChargesSummary'

const ALLOWED_FIELDS = [
  'price',
  'publication_type',
  'warranty_type',
  'warranty_duration',
  'warranty_duration_type',
  'status',
]

export default function SalesConditionForm() {
  const { user } = useAuth({ middleware: 'auth' })
  useAuth({ middleware: 'verified', redirectIfAuthenticated: '/verify-email' })
  const { MLPid } = useParams()
  const { updateProduct, getProduct } = useProducts()
  const router = useRouter()
  const [isLoadingProduct, setIsLoadingProduct] = useState(true)
  const [submitting, setSubmitting] = useState(false)
  const [formData, setFormData] = useState({
    price: '',
    publication_type: 'classic', // Valor por defecto para el radio
    warranty_type: 'seller', // Valor por defecto para garantía
    warranty_duration: '30', // Valor por defecto para garantía
    warranty_duration_type: 'days', // Valor por defecto para garantía
    status: 'published',
  })

  useEffect(() => {
    const loadProductData = async () => {
      setIsLoadingProduct(true)
      const productId = MLPid.replace('MLP', '')
      try {
        const productData = await getProduct(productId)
        const filteredData = ALLOWED_FIELDS.reduce((acc, field) => {
          if (field === 'status') {
            acc[field] = 'published'
          } else if (field === 'price') {
            acc[field] = productData[field]?.toString() || ''
          } else {
            acc[field] = productData[field] || formData[field]
          }
          return acc
        }, {})

        setFormData(prev => ({
          ...prev,
          ...filteredData,
        }))
      } catch (error) {
        console.error(error)
      } finally {
        setIsLoadingProduct(false)
      }
    }

    loadProductData()
  }, [MLPid])

  const handleChange = e => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = async e => {
    e.preventDefault()
    setSubmitting(true)

    try {
      const productId = MLPid.replace('MLP', '')
      const dataToSubmit = ALLOWED_FIELDS.reduce((acc, field) => {
        if (field === 'price') {
          acc[field] = parseFloat(formData[field])
        } else {
          acc[field] = formData[field]
        }
        return acc
      }, {})

      await updateProduct(productId, dataToSubmit)
      router.push(`/p/${MLPid}`)
    } catch (error) {
      console.error(error)
    }

    setSubmitting(false)
  }

  if (!user || isLoadingProduct) return <LoadingSpinner />

  return (
    <Row className="g-0">
      <Col>
        <Container className="mt-4 mb-5">
          <Form
            onSubmit={handleSubmit}
            className="d-flex flex-column align-items-center">
            <Row className="g-0 w-75">
              <div>
                <Button
                  as={Link}
                  href={`/publish/${MLPid}/product-data`}
                  variant="link"
                  className="text-decoration-none p-0 fw-medium">
                  <i className="bi bi-chevron-left me-2" />
                  Anterior
                </Button>
              </div>
              <h4 className="my-5">
                Para terminar, definamos las condiciones de venta
              </h4>

              <CardContainer className="bg-body mb-4">
                <PricingSection
                  price={formData.price}
                  onChange={handleChange}
                />
              </CardContainer>

              <CardContainer className="bg-body mb-4">
                <PublicationTypeSection
                  selected={formData.publication_type}
                  onChange={handleChange}
                  price={formData.price}
                />
              </CardContainer>

              <CardContainer className="bg-body mb-4">
                <DeliverySection />
              </CardContainer>

              <CardContainer className="bg-body mb-4">
                <WarrantySection
                  warranty={formData.warranty_type}
                  duration={formData.warranty_duration}
                  durationType={formData.warranty_duration_type}
                  onChange={handleChange}
                />
              </CardContainer>
            </Row>

            <div className="w-75 d-flex justify-content-end">
              <Button type="submit" disabled={submitting}>
                {submitting ? 'Publicando...' : 'Publicar'}
              </Button>
            </div>
          </Form>
        </Container>
      </Col>

      {/* Resumen estimado de cargos */}
      <Col className="col-3 bg-disabled-meli">
        <ChargesSummary
          price={formData.price}
          publicationType={formData.publication_type}
        />
      </Col>
    </Row>
  )
}
