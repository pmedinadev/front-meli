'use client'

import CardContainer from '@/components/layout/CardContainer'
import LoadingSpinner from '@/components/layout/LoadingSpinner'
import { useAuth } from '@/hooks/auth'
import { useProfile } from '@/hooks/useProfile'
import { CldUploadWidget } from 'next-cloudinary'
import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import {
  Col,
  Row,
  Stack,
  Toast,
  ToastBody,
  ToastContainer,
  ToastHeader,
} from 'react-bootstrap'

const options = [
  {
    icon: 'person-vcard',
    title: 'Información personal',
    subtitle: 'Información de tu identificación oficial y tu actividad fiscal.',
    href: '/profile/personal-information',
  },
  {
    icon: 'person',
    title: 'Datos de tu cuenta',
    subtitle: 'Datos que representan a la cuenta en Mercado Libre.',
    href: '/profile/account-data',
  },
  {
    icon: 'credit-card',
    title: 'Tarjetas',
    subtitle: 'Tarjetas guardadas en tu cuenta.',
    href: '/profile/cards',
  },
  {
    icon: 'geo-alt',
    title: 'Direcciones',
    subtitle: 'Direcciones guardadas en tu cuenta.',
    href: '/profile/addresses',
  },
]

export default function MyProfileHub() {
  const { user } = useAuth({ middleware: 'auth' })
  const { updateProfile, loading } = useProfile()
  const [showToast, setShowToast] = useState(false)
  const [toastMessage, setToastMessage] = useState('')

  useEffect(() => {
    if (localStorage.getItem('avatarUpdated') === 'true') {
      setToastMessage('Imagen actualizada correctamente')
      setShowToast(true)
      localStorage.removeItem('avatarUpdated')
    }
  }, [])

  if (!user) {
    return <LoadingSpinner />
  }

  const handleUploadSuccess = async result => {
    const { secure_url, coordinates } = result.info
    const [x, y, width, height] = coordinates.custom[0]
    const croppedImageUrl = `${secure_url.replace('/upload/', `/upload/c_crop,g_custom,x_${x},y_${y},w_${width},h_${height}/`)}`
    const success = await updateProfile({ avatar: croppedImageUrl })
    if (success) {
      localStorage.setItem('toastMessage', 'Imagen actualizada correctamente')
    } else {
      localStorage.setItem('toastMessage', 'Error al actualizar la imagen')
    }
    setToastMessage(localStorage.getItem('toastMessage'))
    setShowToast(true)
  }

  const handleQueuesEnd = (result, { widget }) => {
    widget.close()
  }

  return (
    <>
      {/* Perfil */}
      <CardContainer className="bg-body px-4 py-2">
        <Row className="g-0 d-flex align-items-center">
          <Col className="col-auto me-4">
            <div className="position-relative">
              <Image
                src={user?.avatar || '/profile_avatar_placeholder.png'}
                width={80}
                height={80}
                alt={`@${user?.username}'s profile picture`}
                className="user-image rounded-circle border border-tertiary"
                priority
              />
              <CldUploadWidget
                signatureEndpoint="sign-cloudinary-params"
                options={{
                  sources: ['local', 'url', 'camera'],
                  cropping: true,
                  showSkipCropButton: false,
                  croppingAspectRatio: 1,
                  croppingShowDimensions: true,
                  multiple: false,
                  publicId: user?.username,
                }}
                uploadPreset="ml_default"
                onSuccess={handleUploadSuccess}
                onQueuesEnd={handleQueuesEnd}>
                {({ open }) => (
                  <button
                    type="button"
                    onClick={() => {
                      open()
                    }}
                    disabled={loading}
                    className="bg-body border border-tertiary rounded-circle position-absolute translate-middle"
                    style={{
                      top: '90%',
                      left: '90%',
                    }}>
                    <small>
                      <i className="bi bi-camera" />
                    </small>
                  </button>
                )}
              </CldUploadWidget>
            </div>
          </Col>
          <Col className="d-flex flex-column">
            <h5 className="mb-0">
              {user?.display_name || `@${user?.username}`}
            </h5>
            <p className="text-muted mb-0">{user?.email}</p>
          </Col>
        </Row>
      </CardContainer>

      {/* Opciones */}
      <CardContainer className="bg-body mt-3 p-4">
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

      {/* Toast */}
      <ToastContainer position="bottom-end" className="p-4">
        <Toast
          onClose={() => setShowToast(false)}
          show={showToast}
          delay={5000}
          autohide
          className="p-0">
          <ToastHeader>
            <i className="bi bi-check-circle-fill text-success me-2" />
            <strong className="me-auto">Éxito</strong>
          </ToastHeader>
          <ToastBody>{toastMessage}</ToastBody>
        </Toast>
      </ToastContainer>
    </>
  )
}
