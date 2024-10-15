'use client'

import CardContainer from '@/components/layout/CardContainer'
import LoadingSpinner from '@/components/layout/LoadingSpinner'
import { useAuth } from '@/hooks/auth'
import { useProfile } from '@/hooks/useProfile'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import {
  Button,
  Form,
  FormControl,
  FormGroup,
  FormLabel,
  Row,
} from 'react-bootstrap'

export default function DisplayNameForm() {
  const { user } = useAuth({ middleware: 'auth' })
  const { updateProfile, loading, errors } = useProfile()
  const [formData, setFormData] = useState({
    display_name: '',
  })
  const [originalDisplayName, setOriginalDisplayName] = useState('')
  const router = useRouter()

  useEffect(() => {
    if (user) {
      setFormData({
        display_name: user.display_name,
      })
      setOriginalDisplayName(user.display_name)
    }
  }, [user])

  const handleChange = e => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = async e => {
    e.preventDefault()
    const success = await updateProfile({ ...formData })
    if (success) {
      localStorage.setItem('displayNameUpdated', 'true')
      router.push('/profile/personal-data')
    }
  }

  if (!user) {
    return <LoadingSpinner />
  }

  return (
    <>
      <div className="d-flex flex-column align-items-center">
        <Row className="g-0 w-50">
          <h4 className="mb-4">¿Cómo quieres que te llamemos?</h4>
          <p className="text-body-tertiary">
            Verán el nombre que elijas todas las personas que interactúen
            contigo en Mercado Libre.
          </p>
          <p className="text-body-tertiary">
            Solo usaremos el nombre que figura en tu documento de identidad si
            es necesario por motivos legales.
          </p>
          <CardContainer className="bg-body p-4">
            <Form onSubmit={handleSubmit}>
              <FormGroup className="mb-4">
                <FormLabel className="text-muted">
                  <small>Nombre elegido</small>
                </FormLabel>
                <FormControl
                  type="text"
                  name="display_name"
                  value={formData.display_name}
                  onChange={handleChange}
                  isInvalid={!!errors.display_name}
                />
                <FormControl.Feedback type="invalid">
                  {errors.display_name}
                </FormControl.Feedback>
              </FormGroup>
              <Button
                size="sm"
                type="submit"
                disabled={
                  loading || formData.display_name === originalDisplayName
                }
                className="py-2 px-4 fw-medium">
                {loading ? 'Cargando...' : 'Guardar'}
              </Button>
              <Button
                variant="link"
                size="sm"
                as={Link}
                href="/profile/personal-data"
                className="text-decoration-none fw-medium ms-3">
                Regresar
              </Button>
            </Form>
          </CardContainer>
        </Row>
      </div>
    </>
  )
}
