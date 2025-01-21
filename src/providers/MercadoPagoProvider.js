'use client'

import { initMercadoPago } from '@mercadopago/sdk-react'
import { useEffect, useState } from 'react'

export default function MercadoPagoProvider({ children }) {
  const [isInitialized, setIsInitialized] = useState(false)

  useEffect(() => {
    try {
      initMercadoPago(process.env.NEXT_PUBLIC_MP_PUBLIC_KEY, {
        locale: 'es-MX',
        trackingDisabled: true, // Deshabilita el seguimiento de eventos
        advancedFraudPrevention: true, // Habilita la prevención de fraude avanzada
      })
      setIsInitialized(true)
    } catch (error) {
      console.error('Error initializing Mercado Pago:', error)
    }
  }, [])

  if (!isInitialized) return null

  return children
}
