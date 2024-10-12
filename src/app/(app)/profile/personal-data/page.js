'use client'

import CardContainer from '@/components/layout/CardContainer'
import { useAuth } from '@/hooks/auth'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { Button, Col, Row, Toast, ToastBody, ToastContainer, ToastHeader } from 'react-bootstrap'

export default function PersonalInformation() {
  const { user } = useAuth({ middleware: 'auth' })
  const [showToast, setShowToast] = useState(false)
  const [toastMessage, setToastMessage] = useState('')

  useEffect(() => {
    if (localStorage.getItem('displayNameUpdated') === 'true') {
      setToastMessage('Display name updated successfully')
      setShowToast(true)
      localStorage.removeItem('displayNameUpdated')
    } else if (localStorage.getItem('dataUpdated') === 'true') {
      setToastMessage('Personal data updated successfully')
      setShowToast(true)
      localStorage.removeItem('dataUpdated')
    }
  }, [])

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

        <CardContainer className="bg-body mt-4 p-4">
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

        <CardContainer className="bg-body mt-3 p-4">
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

        <ToastContainer position="bottom-end" className="p-4">
          <Toast
            onClose={() => setShowToast(false)}
            show={showToast}
            delay={5000}
            autohide
            className="p-0">
            <ToastHeader>
              <i className="bi bi-check-circle-fill text-success me-2" />
              <strong className="me-auto">Success</strong>
            </ToastHeader>
            <ToastBody>{toastMessage}</ToastBody>
          </Toast>
        </ToastContainer>
      </>
    )
  }
}
