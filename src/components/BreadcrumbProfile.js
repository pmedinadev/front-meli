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
        {pathname.startsWith('/profile/personal-information') && (
          <BreadcrumbItem
            linkAs={Link}
            href="/profile/personal-information"
            active={pathname === '/profile/personal-information'}>
            Personal information
          </BreadcrumbItem>
        )}
        {pathname.startsWith('/profile/personal-data') && (
          <BreadcrumbItem
            linkAs={Link}
            href="/profile/personal-data"
            active={pathname === '/profile/personal-data'}>
            Personal data
          </BreadcrumbItem>
        )}
        {pathname ===
          '/profile/data-correction' && (
          <BreadcrumbItem active>Data correction</BreadcrumbItem>
        )}
      </Breadcrumb>
    </small>
  )
}
