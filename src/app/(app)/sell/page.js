'use client'

import { useAuth } from '@/hooks/auth'

export default function SellPage() {
  const { user } = useAuth({ middleware: 'auth' })
  /* useAuth({ middleware: 'verified', redirectIfAuthenticated: '/verify-email' }) */

  return (
    <>
      <h1 className="text-center mt-4">Sell page {user?.name}</h1>
    </>
  )
}
