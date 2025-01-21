'use client'

import { Button, Col, Container, Row } from 'react-bootstrap'
import { notFound, useParams } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import CardContainer from '@/components/layout/CardContainer'
import { useAuth } from '@/hooks/auth'
import { useOrders } from '@/hooks/useOrders'
import { format } from 'date-fns'
import { es } from 'date-fns/locale/es'
import LoadingSpinner from '@/components/layout/LoadingSpinner'

export default function PurchaseDetail() {
  const { user } = useAuth({ middleware: 'auth' })
  const params = useParams()
  const { getOrderItem } = useOrders(params.orderId, params.productId)

  if (!user || getOrderItem.isLoading) {
    return <LoadingSpinner />
  }

  if (getOrderItem.error) {
    return (
      <Container className="py-5 text-center">
        <h4>Error al cargar el detalle de la compra</h4>
        <Button as={Link} href="/my-purchases" variant="primary">
          Volver a mis compras
        </Button>
      </Container>
    )
  }

  const orderItem = getOrderItem.data?.orderItem
  if (!orderItem) return notFound()

  const shipping = orderItem?.order?.shipping
  if (!shipping) return null

  const estimatedDate = new Date(shipping.estimated_delivery_date)
  const today = new Date()
  const isToday = estimatedDate.toDateString() === today.toDateString()
  const tomorrow = new Date(today)
  tomorrow.setDate(today.getDate() + 1)
  const isTomorrow = tomorrow.toDateString() === estimatedDate.toDateString()

  const deliveryDay = isToday
    ? 'hoy'
    : isTomorrow
      ? 'mañana'
      : format(estimatedDate, "d 'de' MMMM", { locale: es })

  const formattedAddress = shipping.address
    ? `${shipping.address.street_address}, ${shipping.address.municipality}, ${shipping.address.state}`
    : ''

  const deliveryStatus = {
    pending: 'Pendiente',
    in_transit: 'En camino',
    delivered: 'Entregado',
    cancelled: 'Cancelado',
    returned: 'Devuelto',
  }

  const getDeliveryTitle = () => {
    if (shipping.delivery_status === 'delivered' && shipping.delivered_at) {
      return `Llegó el ${format(new Date(shipping.delivered_at), "d 'de' MMMM", { locale: es })}`
    }
    return `Llega ${deliveryDay}`
  }

  const getDeliveryMessage = () => {
    switch (shipping.delivery_status) {
      case 'delivered':
        return shipping.delivered_at
          ? `Entregamos tu paquete a las ${format(new Date(shipping.delivered_at), 'HH:mm')} hs en ${formattedAddress}.`
          : ''
      case 'in_transit':
        return `Tu paquete está en camino a ${formattedAddress}. Llega ${deliveryDay}.`
      case 'pending':
      default:
        return 'Estamos preparando tu paquete.'
    }
  }

  return (
    <Container className="my-5">
      <Row className="g-5">
        <Col xs={8}>
          <div className="mb-4">
            <Link href="/my-purchases" className="text-decoration-none">
              <span className="text-muted">Volver a mis compras</span>
            </Link>
          </div>

          <div className="bg-disabled-meli rounded px-4 py-3 mb-3">
            <div className="d-flex align-items-center justify-content-between">
              <div>
                <p className="mb-1">
                  <span>{orderItem.product.title}</span>
                </p>
                <p className="mb-0">
                  <span>{orderItem.quantity} u. | </span>
                  <Link
                    href={`/${orderItem.product.slug}/p/${orderItem.product.id}`}
                    className="text-decoration-none">
                    Ver detalle
                  </Link>
                </p>
              </div>
              <div>
                <Image
                  src={
                    orderItem.product.photos[0]?.url ||
                    '/profile_avatar_placeholder.png'
                  }
                  width={48}
                  height={48}
                  alt={orderItem.product.title}
                  className="rounded-circle"
                />
              </div>
            </div>
          </div>

          <CardContainer className="bg-body">
            <div className="px-4 py-3">
              <p>
                <span>
                  {deliveryStatus[orderItem.order?.shipping?.delivery_status]}
                </span>
              </p>
              <h5>
                <span>{getDeliveryTitle()}</span>
              </h5>
              <p className="mb-0">
                <span>{getDeliveryMessage()}</span>
              </p>
            </div>
            <hr className="m-0 border-secondary" />
            <div className="p-4">
              <Button>
                <span>Volver a comprar</span>
              </Button>
            </div>
          </CardContainer>
        </Col>

        <Col>
          <div className="bg-disabled-meli p-5">
            <h5>
              <span>Detalle de la compra</span>
            </h5>
            <p>
              <span>
                {format(
                  new Date(orderItem.created_at),
                  "d 'de' MMMM 'de' yyyy",
                  {
                    locale: es,
                  },
                )}{' '}
                | #{orderItem.order?.mp_payment_id}
              </span>
            </p>
            <hr className="border-secondary" />
            <div className="d-flex justify-content-between">
              <p>
                <span>Producto ({orderItem.quantity} u.)</span>
              </p>
              <p>
                <span>
                  ${' '}
                  {(parseFloat(orderItem.price) * orderItem.quantity).toFixed(
                    2,
                  )}
                </span>
              </p>
            </div>
            <div className="d-flex justify-content-between">
              <p className="mb-0">
                <span>Envío</span>
              </p>
              <p className="mb-0">
                <span>
                  {parseFloat(orderItem.shipping_cost) > 0
                    ? `$ ${parseFloat(orderItem.shipping_cost).toFixed(2)}`
                    : 'Gratis'}
                </span>
              </p>
            </div>
            <hr className="border-secondary" />
            <div className="d-flex justify-content-between">
              <p className="mb-0">
                <span>Total</span>
              </p>
              <p className="mb-0">
                <span>
                  $ {parseFloat(orderItem.order.total_amount).toFixed(2)}
                </span>
              </p>
            </div>
          </div>
        </Col>
      </Row>
    </Container>
  )
}
