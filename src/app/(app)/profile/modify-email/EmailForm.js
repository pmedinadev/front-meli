'use client'

import CardContainer from '@/components/layout/CardContainer'
import LoadingSpinner from '@/components/layout/LoadingSpinner'
import { useAuth } from '@/hooks/auth'
import { useProfile } from '@/hooks/useProfile'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import {
  Button,
  Form,
  FormControl,
  FormGroup,
  Row,
} from 'react-bootstrap'

export default function EmailForm() {
  const { user } = useAuth({ middleware: 'auth' })
  const { updateProfile, loading, errors } = useProfile()
  const [formData, setFormData] = useState({
    email: '',
  })
  const [originalEmail, setOriginalEmail] = useState('')
  const router = useRouter()

  useEffect(() => {
    if (user) {
      setFormData({
        email: user.email,
      })
      setOriginalEmail(user.email)
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
    const success = await updateProfile({ email: formData.email })
    if (success) {
      localStorage.setItem('emailUpdated', 'true')
      router.push('/profile/account-data')
    }
  }

  if (!user) {
    return <LoadingSpinner />
  }

  if (user) {
    return (
      <>
        <div className="d-flex flex-column align-items-center">
          <Row className="g-0 w-50">
            <CardContainer className="bg-body p-4">
              <h5 className="fw-bold">Ingresa tu e-mail</h5>
              <p>Te enviaremos un código de verificación para confirmar que tienes acceso a tu e-mail.</p>
              <Form onSubmit={handleSubmit}>
                <FormGroup className="mb-4">
                  <FormControl
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    isInvalid={errors.email}
                  />
                  <FormControl.Feedback type="invalid">
                    {errors.email}
                  </FormControl.Feedback>
                </FormGroup>
                <Button type="submit" className="fw-bold w-100" disabled={loading || formData.email === originalEmail}>
                  {loading ? 'Cargando...' : 'Continuar'}
                </Button>
              </Form>
            </CardContainer>
          </Row>
        </div>
      </>
    )
  }
}
