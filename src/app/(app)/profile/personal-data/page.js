'use client'

import CardContainer from '@/components/layout/CardContainer'
import { useAuth } from '@/hooks/auth'
import Link from 'next/link'
import { Button, Col, Row } from 'react-bootstrap'

export default function PersonalInformation() {
  const { user } = useAuth({ middleware: 'auth' })

  if (user) {
    const fullName =
      user.first_name && user.last_name && user.second_last_name
        ? `${user.first_name} ${user.last_name} ${user.second_last_name}`
        : 'Not set'

    const identityDocument = user.identity_document || 'Not set'
    const displayName = user.display_name || 'Not set'

    return (
      <>
        <h4>Personal data</h4>

        <CardContainer className="mt-4 p-4">
          <Row className="align-items-center">
            <Col className="d-flex flex-column">
              <span>Full name</span>
              <small className="text-body-tertiary">{fullName}</small>
            </Col>
            <Col className="d-flex flex-column">
              <span>Identity document</span>
              <small className="text-body-tertiary">{identityDocument}</small>
            </Col>
            <Col className="col-auto">
              <Button
                variant="link"
                size="sm"
                as={Link}
                href="/profile/data-correction"
                className="text-decoration-none fw-medium">
                Modify
              </Button>
            </Col>
          </Row>
        </CardContainer>

        <CardContainer className="mt-3 p-4">
          <Row className="align-items-center">
            <Col className="d-flex flex-column">
              <span>Display name</span>
              <small className="text-body-tertiary">{displayName}</small>
            </Col>
            <Col className="col-auto">
              <Button
                variant="link"
                size="sm"
                as={Link}
                href="/profile/display-name"
                className="text-decoration-none fw-medium">
                Modify
              </Button>
            </Col>
          </Row>
        </CardContainer>
      </>
    )
  }
}
