'use client'

import CardContainer from '@/components/layout/CardContainer'
import LoadingSpinner from '@/components/layout/LoadingSpinner'
import { useAuth } from '@/hooks/auth'
import { useState } from 'react'
import {
  Button,
  Form,
  FormControl,
  FormGroup,
  FormLabel,
  Row,
} from 'react-bootstrap'

export default function PasswordForm() {
  const { user, updatePassword } = useAuth({ middleware: 'auth' })
  const [formData, setFormData] = useState({
    current_password: '',
    password: '',
    password_confirmation: '',
  })
  const [errors, setErrors] = useState([])
  const [loading, setLoading] = useState(false)

  const handleChange = e => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = async e => {
    e.preventDefault()
    setLoading(true)
    await updatePassword({ ...formData, setErrors, setLoading })
    setLoading(false)
  }

  if (!user) {
    return <LoadingSpinner />
  }

  return (
    <>
      <div className="d-flex flex-column align-items-center">
        <Row className="g-0 w-50">
          <h4 className="mb-4">Cambia tu contraseña</h4>
          <CardContainer className="bg-body p-4">
            <Form onSubmit={handleSubmit}>
              <FormGroup className="mb-4">
                <FormLabel>Ingresa tu contraseña actual</FormLabel>
                <FormControl
                  type="password"
                  name="current_password"
                  value={formData.current_password}
                  onChange={handleChange}
                  isInvalid={!!errors.current_password}
                />
                <FormControl.Feedback type="invalid">
                  {errors.current_password}
                </FormControl.Feedback>
              </FormGroup>
              <FormGroup className="mb-4">
                <FormLabel>Ingresa tu nueva contraseña</FormLabel>
                <FormControl
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  isInvalid={!!errors.password}
                />
                <FormControl.Feedback type="invalid">
                  {errors.password}
                </FormControl.Feedback>
              </FormGroup>
              <FormGroup className="mb-4">
                <FormLabel>Confirma tu nueva contraseña</FormLabel>
                <FormControl
                  type="password"
                  name="password_confirmation"
                  value={formData.password_confirmation}
                  onChange={handleChange}
                  isInvalid={!!errors.password_confirmation}
                />
                <FormControl.Feedback type="invalid">
                  {errors.password_confirmation}
                </FormControl.Feedback>
              </FormGroup>
              <Button
                type="submit"
                disabled={loading}
                className="px-4 fw-medium">
                {loading ? (
                  <small>Cargando...</small>
                ) : (
                  <small>Cambiar contraseña</small>
                )}
              </Button>
            </Form>
          </CardContainer>
        </Row>
      </div>
    </>
  )
}
