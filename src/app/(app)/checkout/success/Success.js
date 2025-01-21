'use client'

import { Button, Col, Container, Row } from 'react-bootstrap'
import CardContainer from '@/components/layout/CardContainer'
import LoadingSpinner from '@/components/layout/LoadingSpinner'
import { useAuth } from '@/hooks/auth'
import { notFound, useRouter, useSearchParams } from 'next/navigation'
import { useEffect } from 'react'
import { useOrders } from '@/hooks/useOrders'
import { format } from 'date-fns'
import { es } from 'date-fns/locale/es'
import Link from 'next/link'

export default function Success() {
  const { user } = useAuth({ middleware: 'auth' })
  const router = useRouter()
  const searchParams = useSearchParams()
  const externalReference = searchParams.get('external_reference')
  const { getOrder } = useOrders(externalReference)

  useEffect(() => {
    if (!externalReference) {
      router.push('/')
    }
  }, [externalReference, router])

  if (!user || !externalReference || getOrder.isLoading) {
    return <LoadingSpinner />
  }

  const order = getOrder.data?.order

  if (!order || getOrder.error) {
    return notFound()
  }

  const estimatedDelivery = order?.shipping?.estimated_delivery_date
    ? format(
        new Date(order?.shipping?.estimated_delivery_date),
        "EEEE d 'de' MMMM",
        { locale: es },
      )
    : null

  return (
    <>
      <div className="bg-success-meli d-flex">
        <Container className="my-5 text-white p-3 w-50">
          <Row className="align-items-center">
            <Col>
              <p className="mb-0">
                <span>¡Excelente compra!</span>
              </p>
              <h4 className="mb-0">
                <span>
                  {estimatedDelivery && `Llega el ${estimatedDelivery}`}
                </span>
              </h4>
            </Col>
            <Col xs="auto">
              <div className="position-relative">
                <div
                  className="bg-white rounded-circle d-flex justify-content-center align-items-center "
                  style={{ width: '100px', height: '100px' }}>
                  <i className="bi bi-bag fs-1 text-black" />
                </div>
                <div
                  className="bg-success rounded-circle text-center position-absolute translate-middle"
                  style={{
                    width: '30px',
                    height: '30px',
                    top: '80%',
                    left: '85%',
                  }}>
                  <i className="bi bi-check-lg fs-5 text-white" />
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </div>

      <div className="my-4">
        <Container className="w-50">
          <CardContainer className="bg-body px-5 py-4 mb-4">
            <h5>
              <span>Envío a domicilio</span>
            </h5>
            <p className="mb-0 text-muted">
              <span>{order?.shipping?.address?.street_address}</span>
              <span>, {order?.shipping?.address?.neighborhood}</span>
            </p>
            <p className="mb-0 text-muted">
              <span>Te avisaremos cuando tu compra esté en camino.</span>
            </p>
          </CardContainer>

          <Button
            as={Link}
            href={`/my-purchases/${order.id}/${order.items[0].product_id}`}
            className="px-4">
            Ver detalle de la compra
          </Button>
        </Container>
      </div>
    </>
  )
}
