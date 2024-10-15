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

export default function PersonalDataHub() {
  const { user } = useAuth({ middleware: 'auth' })
  const [showToast, setShowToast] = useState(false)
  const [toastMessage, setToastMessage] = useState('')

  useEffect(() => {
    if (localStorage.getItem('displayNameUpdated') === 'true') {
      setToastMessage('Nombre elegido actualizado correctamente')
      setShowToast(true)
      localStorage.removeItem('displayNameUpdated')
    } else if (localStorage.getItem('dataUpdated') === 'true') {
      setToastMessage('Datos personales actualizados correctamente')
      setShowToast(true)
      localStorage.removeItem('dataUpdated')
    }
  }, [])

  if (!user) {
    return <LoadingSpinner />
  }

  const fullName =
    user.first_name && user.last_name && user.second_last_name
      ? `${user.first_name} ${user.last_name} ${user.second_last_name}`
      : 'No proporcionado'

  const identityDocument = user.identity_document || 'No proporcionado'
  const displayName = user.display_name || 'No proporcionado'

  return (
    <>
      <h4>Datos personales</h4>

      <CardContainer className="bg-body mt-4 p-4">
        <Row className="align-items-center">
          <Col className="d-flex flex-column">
            <span>Nombre y apellido</span>
            <small className="text-body-tertiary">{fullName}</small>
          </Col>
          <Col className="d-flex flex-column">
            <span>CURP</span>
            <small className="text-body-tertiary">{identityDocument}</small>
          </Col>
          <Col className="col-auto">
            <Button
              variant="link"
              size="sm"
              as={Link}
              href="/profile/modify-data"
              className="text-decoration-none fw-medium">
              Modificar
            </Button>
          </Col>
        </Row>
      </CardContainer>

      <CardContainer className="bg-body mt-3 p-4">
        <Row className="align-items-center">
          <Col className="d-flex flex-column">
            <span>Nombre elegido</span>
            <small className="text-body-tertiary">{displayName}</small>
          </Col>
          <Col className="col-auto">
            <Button
              variant="link"
              size="sm"
              as={Link}
              href="/profile/modify-display-name"
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
