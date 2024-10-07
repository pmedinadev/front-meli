'use client'

import CardContainer from '@/components/layout/CardContainer'
import { useAuth } from '@/hooks/auth'
import Link from 'next/link'
import { Col, Row, Stack } from 'react-bootstrap'

export default function PersonalInformation() {
  const { user } = useAuth({ middleware: 'auth' })

  const options = [
    {
      icon: 'person',
      title: 'Personal data',
      subtitle: `${user?.name}`,
      href: '/profile/personal-information/personal-data',
    },
    {
      icon: 'receipt',
      title: 'Tax data',
      subtitle: 'The data we use to calculate taxes and issue invoices.',
      href: '/profile/personal-information/tax-data',
    }
  ]

  if (user) {
    return (
      <>
        <h3 className="mt-4">Manage your information</h3>

        <CardContainer className="mt-4 px-5 py-4">
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
