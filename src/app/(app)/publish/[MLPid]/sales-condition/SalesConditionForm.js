'use client'

import { Button, Col, Container, Form, Row } from 'react-bootstrap'
import Link from 'next/link'
import { useParams, useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { useAuth } from '@/hooks/auth'
import { useProducts } from '@/hooks/useProducts'
import CardContainer from '@/components/layout/CardContainer'
import LoadingSpinner from '@/components/layout/LoadingSpinner'
import PricingSection from '@/app/(app)/publish/[MLPid]/sales-condition/components/PricingSection'
import PublicationTypeSection from '@/app/(app)/publish/[MLPid]/sales-condition/components/PublicationTypeSection'
import WarrantySection from '@/app/(app)/publish/[MLPid]/sales-condition/components/WarrantySection'
import ShippingSection from '@/app/(app)/publish/[MLPid]/sales-condition/components/ShippingSection'
import ChargesSummary from '@/app/(app)/publish/[MLPid]/sales-condition/components/ChargesSummary'
import { calculateShipping } from '@/utils/feeCalculator'
import { determineShippingType } from '@/utils/shippingCalculator'

/**
 * Formulario para definir las condiciones de venta de un producto
 * Incluye:
 * - Precio y validaciones
 * - Tipo de publicación (Gratuíta, Clásica, Premium)
 * - Configuración de envío
 * - Garantía
 * - Resumen de cargos estimados
 */

// Campos permitidos para enviar al backend
const ALLOWED_FIELDS = [
  'price',
  'publication_type',
  'shipping_cost',
  'shipping_type',
  'warranty_type',
  'warranty_duration',
  'warranty_duration_type',
  'status',
]

// Valores por defecto para el formulario
const DEFAULT_FORM_VALUES = {
  price: '',
  publication_type: 'classic',
  warranty_type: 'seller',
  warranty_duration: '30',
  warranty_duration_type: 'days',
  status: 'published',
}

export default function SalesConditionForm() {
  const { user } = useAuth({ middleware: 'auth' })
  useAuth({ middleware: 'verified', redirectIfAuthenticated: '/verify-email' })
  const { MLPid } = useParams()
  const { updateProduct, getProduct } = useProducts()
  const router = useRouter()
  const [product, setProduct] = useState(null)
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
  const [selectedShipping, setSelectedShipping] = useState('free')

  useEffect(() => {
    const loadProductData = async () => {
      setIsLoadingProduct(true)
      try {
        const productData = await getProduct(MLPid.replace('MLP', ''))
        setProduct(productData)

        // Filtrar los campos permitidos y asignar valores por defecto
        const filteredData = ALLOWED_FIELDS.reduce((acc, field) => {
          if (field === 'status') {
            acc[field] = 'published'
          } else if (field === 'price') {
            acc[field] = productData[field]?.toString() || ''
          } else {
            acc[field] = productData[field] || DEFAULT_FORM_VALUES[field]
          }
          return acc
        }, {})

        setFormData(prev => ({ ...prev, ...filteredData }))
      } catch (error) {
        console.error('Error loading product:', error)
      } finally {
        setIsLoadingProduct(false)
      }
    }

    loadProductData()
  }, [MLPid])

  // Manejar cambios en los campos del formulario
  const handleChange = e => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  // Enviar el formulario
  const handleSubmit = async e => {
    e.preventDefault()
    setSubmitting(true)

    try {
      const productId = MLPid.replace('MLP', '')
      const numericPrice = parseFloat(formData.price)

      // Calcular costos de envío
      const { cost: shippingCost } = calculateShipping(
        numericPrice,
        product?.condition,
        formData.publication_type,
      )

      // Determinar quién paga el envío
      const shippingType = determineShippingType(
        shippingCost,
        numericPrice,
        formData.publication_type,
        selectedShipping,
      )

      // Filtrar los campos permitidos y enviar al backend
      const dataToSubmit = ALLOWED_FIELDS.reduce((acc, field) => {
        if (field === 'price') {
          acc[field] = numericPrice
        } else if (field === 'shipping_cost') {
          acc[field] = shippingCost
        } else if (field === 'shipping_type') {
          acc[field] = shippingType
        } else {
          acc[field] = formData[field]
        }
        return acc
      }, {})

      await updateProduct(productId, dataToSubmit)
      router.push(product?.href)
    } catch (error) {
      console.error('Error updating product:', error)
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
                <ShippingSection
                  publicationType={formData.publication_type}
                  price={formData.price}
                  condition={product?.condition}
                  selectedShipping={selectedShipping}
                  onShippingChange={setSelectedShipping}
                  shippingType={product?.shipping_type}
                />
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
          condition={product?.condition}
          selectedShipping={selectedShipping}
        />
      </Col>
    </Row>
  )
}
