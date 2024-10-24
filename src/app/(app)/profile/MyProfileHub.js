'use client'

import CardContainer from '@/components/layout/CardContainer'
import LoadingSpinner from '@/components/layout/LoadingSpinner'
import { useAuth } from '@/hooks/auth'
import { useProfile } from '@/hooks/useProfile'
import { CldImage, CldUploadWidget } from 'next-cloudinary'
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
import cloudinaryText from '@/lib/cloudinary-text.json'

// Opciones de perfil
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
  // Hook de autenticación
  const { user } = useAuth({ middleware: 'auth' })
  // Hook para actualizar el perfil
  const { updateProfile, loading } = useProfile()
  // Estado para mostrar el toast
  const [showToast, setShowToast] = useState(false)
  // Mensaje del toast
  const [toastMessage, setToastMessage] = useState('')

  // Efecto para mostrar el mensaje del toast si la imagen se actualizó correctamente
  useEffect(() => {
    if (localStorage.getItem('avatarUpdated') === 'true') {
      setToastMessage('Imagen actualizada correctamente')
      setShowToast(true)
      localStorage.removeItem('avatarUpdated')
    }
  }, [])

  // Mostrar spinner de carga si el usuario no está autenticado
  if (!user) {
    return <LoadingSpinner />
  }

  // Manejar el éxito de la subida de la imagen
  const handleUploadSuccess = async result => {
    const { secure_url, coordinates } = result.info
    let imageUrl = secure_url

    // Verificar si hay coordenadas de recorte y aplicarlas
    if (coordinates && coordinates.custom) {
      const [x, y, width, height] = coordinates.custom[0]
      imageUrl = `${secure_url.replace('/upload/', `/upload/c_crop,g_custom,x_${x},y_${y},w_${width},h_${height}/`)}`
    }

    // Actualizar el perfil del usuario con la URL de la imagen
    const success = await updateProfile({ avatar: imageUrl })
    if (success) {
      localStorage.setItem('toastMessage', 'Imagen actualizada correctamente')
    } else {
      localStorage.setItem('toastMessage', 'Error al actualizar la imagen')
    }
    setToastMessage(localStorage.getItem('toastMessage'))
    setShowToast(true)
  }

  // Manejar el cierre del widget de Cloudinary
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
              {/* Mostrar la imagen del usuario o un placeholder */}
              <CldImage
                src={user?.avatar || 'users/placeholder'}
                width="80"
                height="80"
                {...(user?.avatar && { preserveTransformations: true })}
                alt={`@${user?.username}'s profile picture`}
                className="rounded-circle border border-tertiary"
              />
              {/* Widget de subida de Cloudinary */}
              <CldUploadWidget
                signatureEndpoint="sign-cloudinary-params"
                options={{
                  sources: ['local'],
                  cropping: true,
                  showSkipCropButton: false,
                  croppingAspectRatio: 1,
                  croppingShowDimensions: true,
                  multiple: false,
                  publicId: user?.username,
                  text: { ...cloudinaryText },
                  language: 'es',
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
                      top: '85%',
                      left: '85%',
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
