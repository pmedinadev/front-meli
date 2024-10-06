'use client'

import LoadingSpinner from '@/components/layout/LoadingSpinner'
import { useAuth } from '@/hooks/auth'
import Image from 'next/image'
import Link from 'next/link'
import { Col, Row, Stack } from 'react-bootstrap'

const options = [
  {
    icon: 'person-vcard',
    title: 'Personal information',
    subtitle: 'Information of your official identity and fiscal activity.',
    href: '/profile/personal-information',
  },
  {
    icon: 'person',
    title: 'Account details',
    subtitle: 'Data that represent your Mercado Libre account.',
    href: '/profile/account-details',
  },
  {
    icon: 'lock',
    title: 'Security',
    subtitle: 'Security settings for your account.',
    href: '/profile/security',
  },
  {
    icon: 'credit-card',
    title: 'Cards',
    subtitle: 'Cards saved to your account.',
    href: '/profile/cards',
  },
  {
    icon: 'geo-alt',
    title: 'Addresses',
    subtitle: 'Addresses saved to your account.',
    href: '/profile/addresses',
  },
]

export default function MyProfile() {
  const { user } = useAuth({ middleware: 'auth' })

  if (!user) {
    return <LoadingSpinner />
  }

  return (
    <>
      <Row className="g-0 d-flex align-items-center bg-body rounded shadow-sm px-4 py-2">
        <Col className="col-auto me-4">
          <Image
            src="/profile_avatar_placeholder.png"
            width={80}
            height={80}
            alt={`@${user?.name}'s profile picture`}
            className="user-image rounded-circle"
            priority
          />
        </Col>
        <Col className="d-flex flex-column">
          <h5 className="mb-0">{user?.name}</h5>
          <p className="text-muted mb-0">{user?.email}</p>
        </Col>
      </Row>
      <Stack gap={5} className="bg-body rounded shadow-sm mt-3 px-5 py-4">
        {options.map((item, index) => (
          <Row
            as={Link}
            href={item.href}
            key={index}
            className="d-flex align-items-center text-decoration-none">
            <Col className="col-auto">
              <i className={`bi bi-${item.icon} text-primary fs-3`} />
            </Col>
            <Col className="d-flex flex-column">
              <h6 className="link-body-emphasis fw-normal mb-1">
                {item.title}
              </h6>
              <p className="text-body-tertiary mb-0">{item.subtitle}</p>
            </Col>
            <Col className="col-auto">
              <i className="bi bi-chevron-right text-muted fs-5" />
            </Col>
          </Row>
        ))}
      </Stack>
    </>
  )
}
