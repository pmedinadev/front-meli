'use client'

import { useAuth } from "@/hooks/auth"

export default function PersonalInformation() {
  const { user } = useAuth({ middleware: 'auth' })

  if (user) {
    return (
      <>
        <h3 className="mt-4">Personal data</h3>
      </>
    )
  }
}
