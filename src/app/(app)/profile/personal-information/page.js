'use client'

import CardContainer from '@/components/layout/CardContainer'
import { useAuth } from '@/hooks/auth'
import Link from 'next/link'
import { Col, Row, Stack } from 'react-bootstrap'

export default function PersonalInformation() {
  const { user } = useAuth({ middleware: 'auth' })

  const fullName =
      user?.first_name && user?.last_name && user?.second_last_name
        ? `${user?.first_name} ${user?.last_name} ${user?.second_last_name}`
        : 'Full name not set'

  const options = [
    {
      icon: 'person',
      title: 'Personal data',
      subtitle: `${fullName}`,
      href: '/profile/personal-data',
    },
    {
      icon: 'receipt',
      title: 'Tax data',
      subtitle: 'The data we use to calculate taxes and issue invoices.',
      href: '/profile/tax-data',
    },
  ]

  if (user) {
    return (
      <>
        <h4>Manage your information</h4>

        <CardContainer className="mt-4 p-4">
          <Stack gap={5}>
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
        </CardContainer>
      </>
    )
  }
}
