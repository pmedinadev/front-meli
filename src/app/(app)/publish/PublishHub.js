'use client'

import CardContainer from '@/components/layout/CardContainer'
import LoadingSpinner from '@/components/layout/LoadingSpinner'
import { useAuth } from '@/hooks/auth'
import { useProducts } from '@/hooks/useProducts'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button, Col, Container, Row, Spinner } from 'react-bootstrap'
import { CldImage } from 'next-cloudinary'

export default function PublishHub() {
  const { user } = useAuth({ middleware: 'auth' })
  useAuth({ middleware: 'verified', redirectIfAuthenticated: '/verify-email' })
  const { createProduct, getDraftProducts } = useProducts()
  const [formData, setFormData] = useState({
    status: 'draft',
    user_id: null,
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [drafts, setDrafts] = useState([])
  const [isLoadingDrafts, setIsLoadingDrafts] = useState(true)
  const router = useRouter()

  useEffect(() => {
    if (user) {
      setFormData(prev => ({
        ...prev,
        user_id: user.id,
      }))
      loadDrafts(user.id)
    }
  }, [user])

  const loadDrafts = async userId => {
    const draftProducts = await getDraftProducts(userId)
    setDrafts(draftProducts || [])
    setIsLoadingDrafts(false)
  }

  const handleSubmit = async e => {
    e.preventDefault()
    setIsSubmitting(true)
    const productId = await createProduct(formData)
    if (productId) {
      router.push(`/publish/MLP${productId}/product-data`)
    }
    setIsSubmitting(false)
  }

  const handleDraftClick = productId => {
    router.push(`/publish/MLP${productId}/product-data`)
  }

  if (!user) return <LoadingSpinner />

  return (
    <>
      <div
        className="w-100"
        style={{
          background: 'linear-gradient(to bottom, #fee600, transparent)',
        }}>
        <div className="d-flex flex-column align-items-center w-75">
          {(drafts.length > 0 && (
            <h2 className="py-5">¡Qué bueno volver a verte!</h2>
          )) || <h2 className="py-5">¡Hola! ¿Listo para publicar?</h2>}
        </div>
      </div>
      <Container className="d-flex flex-column align-items-center">
        <Row className="g-0 w-75">
          <CardContainer className="bg-light">
            <div className="p-4">
              <h6 className="fw-bold mb-0">
                ¿Qué publicación quieres continuar?
              </h6>
            </div>

            <hr className="border-secondary m-0" />

            {/* Borradores de publicaciones */}
            {isLoadingDrafts ? (
              <div className="p-4 text-center">
                <Spinner animation="border" size="sm" role="status" />
              </div>
            ) : drafts.length > 0 ? (
              drafts.map((draft, index) => (
                <div key={draft.id}>
                  <Button
                    variant="light"
                    className="p-4 w-100 rounded-0 text-start"
                    onClick={() => handleDraftClick(draft.id)}
                    role="button">
                    <Row className="g-0 align-items-center">
                      <Col className="col-auto pe-4">
                        {draft.photos && draft.photos.length > 0 ? (
                          <CldImage
                            src={draft.photos[0].public_id}
                            width={40}
                            height={40}
                            crop="fill"
                            className="rounded-circle border"
                            alt={draft.title || 'Product draft'}
                          />
                        ) : (
                          <Image
                            src="/profile_avatar_placeholder.png"
                            width={40}
                            height={40}
                            className="rounded-circle border"
                            alt="Product draft"
                          />
                        )}
                      </Col>
                      <Col>
                        <p className="mb-0">{draft.title || 'Sin título'}</p>
                        <p className="mb-0 text-muted">
                          <small>
                            Publicación iniciada el{' '}
                            {new Date(draft.created_at).toLocaleDateString()}
                          </small>
                        </p>
                      </Col>
                    </Row>
                  </Button>
                  {index < drafts.length - 1 && (
                    <hr className="border-secondary m-0" />
                  )}
                </div>
              ))
            ) : (
              <div className="p-4 text-muted text-center">
                No tienes borradores guardados
              </div>
            )}

            <hr className="border-secondary m-0" />

            <Button
              onClick={handleSubmit}
              variant="light"
              className="w-100 p-4 text-decoration-none rounded-0 rounded-bottom text-start text-primary"
              disabled={isSubmitting}>
              {isSubmitting ? (
                <>
                  <Spinner
                    as="span"
                    animation="border"
                    size="sm"
                    role="status"
                    aria-hidden="true"
                    className="me-2"
                  />{' '}
                  Cargando...
                </>
              ) : (
                'Iniciar nueva publicación'
              )}
            </Button>
          </CardContainer>
        </Row>
      </Container>
    </>
  )
}
