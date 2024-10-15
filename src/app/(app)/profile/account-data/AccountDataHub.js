'use client'

import CardContainer from '@/components/layout/CardContainer'
import LoadingSpinner from '@/components/layout/LoadingSpinner'
import { useAuth } from '@/hooks/auth'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import {
  Button,
  Col,
  Row,
  Toast,
  ToastBody,
  ToastContainer,
  ToastHeader,
} from 'react-bootstrap'

export default function AccountDataHub() {
  const { user } = useAuth({ middleware: 'auth' })
  const [showToast, setShowToast] = useState(false)
  const [toastMessage, setToastMessage] = useState('')

  useEffect(() => {
    if (localStorage.getItem('usernameUpdated') === 'true') {
      setToastMessage('Username updated successfully')
      setShowToast(true)
      localStorage.removeItem('usernameUpdated')
    } else if (localStorage.getItem('phoneUpdated') === 'true') {
      setToastMessage('Phone number updated successfully')
      setShowToast(true)
      localStorage.removeItem('phoneUpdated')
    } else if (localStorage.getItem('emailUpdated') === 'true') {
      setToastMessage('E-mail updated successfully')
      setShowToast(true)
      localStorage.removeItem('emailUpdated')
    }
  }, [])

  const email = user?.email || 'Not set'
  const phone = user?.phone || 'Not set'
  const username = user?.username || 'Not set'
  const isEmailVerified = user?.email_verified_at

  if (!user) {
    return <LoadingSpinner />
  }

  return (
    <>
      <h4>Datos de tu cuenta</h4>

      <CardContainer className="bg-body mt-4">
        <div className="d-flex align-items-center px-4 py-2">
          {isEmailVerified ? (
            <>
              <i className="bi bi-check-circle-fill me-2 text-success" />
              <small className="fw-medium text-success">Validado</small>
            </>
          ) : (
            <>
              <i className="bi bi-clock-fill me-2 text-warning" />
              <small className="fw-medium text-warning">
                Validación pendiente
              </small>
            </>
          )}
        </div>
        <hr className="m-0 text-secondary" />
        <Row className="align-items-center p-4">
          <Col className="d-flex flex-column">
            <span>E-mail</span>
            <small className="text-body-tertiary">{email}</small>
          </Col>
          <Col className="col-auto">
            <Button
              variant="link"
              size="sm"
              as={Link}
              href="/profile/modify-email"
              className="text-decoration-none fw-medium">
              Modificar
            </Button>
          </Col>
        </Row>
      </CardContainer>

      <CardContainer className="bg-body mt-3 p-4">
        <Row className="align-items-center">
          <Col className="d-flex flex-column">
            <span>Teléfono</span>
            <small className="text-body-tertiary">{phone}</small>
          </Col>
          <Col className="col-auto">
            <Button
              variant="link"
              size="sm"
              as={Link}
              href="/profile/modify-phone"
              className="text-decoration-none fw-medium">
              Modificar
            </Button>
          </Col>
        </Row>
      </CardContainer>

      <CardContainer className="bg-body mt-3 p-4">
        <Row className="align-items-center">
          <Col className="d-flex flex-column">
            <span>Nombre de usuario</span>
            <small className="text-body-tertiary">@{username}</small>
          </Col>
          <Col className="col-auto">
            <Button
              variant="link"
              size="sm"
              as={Link}
              href="/profile/modify-username"
              className="text-decoration-none fw-medium">
              Modificar
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
