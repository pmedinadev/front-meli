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
  FormText,
  Row,
} from 'react-bootstrap'

export default function UsernameForm() {
  const { user } = useAuth({ middleware: 'auth' })
  const { updateProfile, loading, errors } = useProfile()
  const [formData, setFormData] = useState({
    username: '',
  })
  const [originalUsername, setOriginalUsername] = useState('')
  const router = useRouter()

  useEffect(() => {
    if (user) {
      setFormData({
        username: user.username,
      })
      setOriginalUsername(user.username)
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
      localStorage.setItem('usernameUpdated', 'true')
      router.push('/profile/account-data')
    }
  }

  if (!user) {
    return <LoadingSpinner />
  }

  return (
    <>
      <div className="d-flex flex-column align-items-center">
        <Row className="g-0 w-50">
          <h4 className="mb-4">Ingresa un nuevo nombre de usuario</h4>
          <CardContainer className="bg-body p-4">
            <Form onSubmit={handleSubmit}>
              <FormGroup className="mb-4">
                <div className="d-flex justify-content-between">
                  <FormLabel>Usuario</FormLabel>
                  <FormText className="text-muted">
                    {formData.username.length}/30
                  </FormText>
                </div>
                <FormControl
                  type="text"
                  name="username"
                  value={formData.username}
                  maxLength="30"
                  required
                  onChange={handleChange}
                  isInvalid={!!errors.username}
                />
                {!errors.username ? (
                  <FormText className="text-muted">
                    El nombre de usuario debe tener como mínimo 4 caracteres y
                    no debe incluir espacios.
                  </FormText>
                ) : (
                  <FormControl.Feedback type="invalid">
                    {errors.username}
                  </FormControl.Feedback>
                )}
              </FormGroup>
              <Button
                size="sm"
                type="submit"
                disabled={loading || formData.username === originalUsername}
                className="py-2 px-4 fw-medium">
                {loading ? 'Cargando...' : 'Modificar'}
              </Button>
              <Button
                variant="link"
                size="sm"
                as={Link}
                href="/profile/account-data"
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
