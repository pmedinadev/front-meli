'use client'

import { useAuth } from '@/hooks/auth'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Breadcrumb, BreadcrumbItem } from 'react-bootstrap'
import LoadingSpinner from './layout/LoadingSpinner'

export default function BreadcrumbProfile() {
  const { user } = useAuth({ middleware: 'auth' })

  if (!user) {
    return <LoadingSpinner />
  }

  const pathname = usePathname()

  return (
    <small>
      <Breadcrumb style={{ '--bs-breadcrumb-divider': "'>'" }}>
        <BreadcrumbItem linkAs={Link} href="/profile">
          My profile
        </BreadcrumbItem>
        <BreadcrumbItem
          linkAs={Link}
          href="/profile/personal-information"
          active={pathname === '/profile/personal-information'}>
          Personal information
        </BreadcrumbItem>
        {pathname === '/profile/personal-information/personal-data' && (
          <BreadcrumbItem active>Personal data</BreadcrumbItem>
        )}
      </Breadcrumb>
    </small>
  )
}
