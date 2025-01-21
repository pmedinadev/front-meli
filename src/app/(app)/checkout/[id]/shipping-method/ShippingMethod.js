'use client'

import { Button, Col, Container, FormCheck, Row } from 'react-bootstrap'
import CardContainer from '@/components/layout/CardContainer'
import LoadingSpinner from '@/components/layout/LoadingSpinner'
import styles from '@/app/(app)/checkout/Checkout.module.css'
import { useAuth } from '@/hooks/auth'
import { useAddresses } from '@/hooks/useAddresses'
import { useOrders } from '@/hooks/useOrders'
import { memo, useEffect, useState } from 'react'
import Link from 'next/link'
import { formatPrice } from '@/utils/formatters'
import { Wallet } from '@mercadopago/sdk-react'

const MemoizedWallet = memo(function MemoizedWallet({ preferenceId }) {
  return (
    <div className="wallet-container">
      <Wallet
        initialization={{ preferenceId }}
        onReady={() => console.log('Wallet ready')}
        onError={error => console.error('Wallet error:', error)}
      />
    </div>
  )
})

export default function ShippingMethod({ id }) {
  const { user } = useAuth({ middleware: 'auth' })
  const { addresses } = useAddresses()
  const { getOrder, updateShipping, createPreference } = useOrders(id)
  const [preferenceId, setPreferenceId] = useState(null)
  const [selectedAddress, setSelectedAddress] = useState(null)
  const [isLoading, setIsLoading] = useState(true)

  const order = getOrder.data?.order

  // Calcular el subtotal de los productos
  const productsSubtotal = order?.items?.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0,
  )

  // Calcular el costo total de envío
  const totalShippingCost = order?.items?.reduce(
    (acc, item) => acc + parseFloat(item.shipping_cost || 0),
    0,
  )

  // Calcular la cantidad total del pedido
  const totalQuantity = order?.items?.reduce(
    (acc, item) => acc + item.quantity,
    0,
  )

  // Establecer la dirección inicial y crear la preferencia de Mercado Pago
  useEffect(() => {
    if (addresses.data?.length > 0 && !selectedAddress) {
      setSelectedAddress(addresses.data[0].id)
      handleContinue(addresses.data[0].id)
    }
  }, [addresses.data])

  const handleContinue = async addressId => {
    if (!addressId) return
    setIsLoading(true)

    try {
      // Actualizar la dirección de envío primero
      await updateShipping.mutateAsync({
        orderId: id,
        addressId: addressId,
      })

      // Crear la preferencia de Mercado Pago
      const { preference_id } = await createPreference.mutateAsync(id)
      setPreferenceId(preference_id)
    } catch (error) {
      console.error('Error:', error)
    } finally {
      setIsLoading(false)
    }
  }

  if (
    !user ||
    addresses.isLoading ||
    getOrder.isLoading ||
    isLoading ||
    !preferenceId
  ) {
    return <LoadingSpinner />
  }

  return (
    <Container className="py-5">
      <Row>
        <Col>
          <h2 className="mb-4">
            <span className={styles.stepTitle}>Elige el domicilio</span>
          </h2>

          {addresses.data?.map(address => (
            <CardContainer key={address.id} className="bg-body px-4 py-3 mb-4">
              <Row>
                <Col xs="auto">
                  <FormCheck
                    type="radio"
                    name="address"
                    checked={selectedAddress === address.id}
                    onChange={() => {
                      setSelectedAddress(address.id)
                      handleContinue(address.id)
                    }}
                  />
                </Col>
                <Col>
                  <p className="mb-1">
                    <span className={`${styles.columnText}`}>
                      C.P. {address.zip_code}
                    </span>
                  </p>
                  <p className="mb-0 text-muted">
                    <span className="d-block">
                      Calle {address.street_address}
                    </span>
                    <span>
                      {address.contact_name} - {address.contact_phone}
                    </span>
                  </p>
                  <hr className="border-secondary" />
                  <Button
                    as={Link}
                    href={`/addresses/address/${address.id}`}
                    variant="link"
                    className="p-0 text-decoration-none fw-medium">
                    Editar
                  </Button>
                </Col>
              </Row>
            </CardContainer>
          ))}

          <div className="text-end d-block">
            <Button
              as={Link}
              href="/addresses/address"
              variant="light"
              className="fw-medium px-4 py-2 me-2 bg-btn-secondary text-primary border-0">
              Agregar dirección
            </Button>
          </div>
        </Col>

        <Col xs={4}>
          <div className="bg-disabled-meli px-5 py-4 mb-1">
            <h3 className="fs-6">
              <span>Resumen de compra</span>
            </h3>
            <hr className="border-secondary" />
            <div className="d-flex justify-content-between">
              <span>Productos ({totalQuantity})</span>
              <span>
                $ {formatPrice(productsSubtotal).whole}
                {formatPrice(productsSubtotal).decimal && (
                  <sup className={styles.priceDecimal}>
                    {formatPrice(productsSubtotal).decimal}
                  </sup>
                )}
              </span>
            </div>
            <hr className="border-secondary" />
            <div className="d-flex justify-content-between">
              <span>Envío</span>
              <span>
                {totalShippingCost === 0 ? (
                  <span className="text-success-meli">Gratis</span>
                ) : (
                  <>
                    $ {formatPrice(totalShippingCost).whole}
                    {formatPrice(totalShippingCost).decimal && (
                      <sup className={styles.priceDecimal}>
                        {formatPrice(totalShippingCost).decimal}
                      </sup>
                    )}
                  </>
                )}
              </span>
            </div>
            <hr className="border-secondary" />
            <div className="d-flex justify-content-between">
              <span>Pagas</span>
              <span>
                $ {formatPrice(order?.total_amount).whole}
                {formatPrice(order?.total_amount).decimal && (
                  <sup className={styles.priceDecimal}>
                    {formatPrice(order?.total_amount).decimal}
                  </sup>
                )}
              </span>
            </div>
          </div>

          {preferenceId && <MemoizedWallet preferenceId={preferenceId} />}
        </Col>
      </Row>
    </Container>
  )
}
