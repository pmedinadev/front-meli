'use client'

import Button from '@/components/Button'
import Link from 'next/link'
import { useAuth } from '@/hooks/auth'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import AuthSessionStatus from '@/app/(auth)/AuthSessionStatus'
import {
  FormCheck,
  FormControl,
  FormGroup,
  FormLabel,
  Spinner,
  Stack,
  Toast,
  ToastBody,
  ToastContainer,
  ToastHeader,
} from 'react-bootstrap'

const Login = () => {
  const router = useRouter()

  const { login } = useAuth({
    middleware: 'guest',
    redirectIfAuthenticated: '/',
  })

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [shouldRemember, setShouldRemember] = useState(false)
  const [errors, setErrors] = useState([])
  const [status, setStatus] = useState(null)
  const [loading, setLoading] = useState(false)
  const [showToast, setShowToast] = useState(false)

  useEffect(() => {
    if (router.reset?.length > 0 && errors.length === 0) {
      setStatus(atob(router.reset))
    } else {
      setStatus(null)
    }

    // Mostrar el toast si hay un mensaje de éxito en el indicador en el localStorage
    if (localStorage.getItem('password-updated') === 'true') {
      setShowToast(true)
      localStorage.removeItem('password-updated')
    }
  }, [router, errors])

  const submitForm = async event => {
    event.preventDefault()

    login({
      email,
      password,
      remember: shouldRemember,
      setErrors,
      setStatus,
      setLoading,
    })
  }

  return (
    <>
      <AuthSessionStatus className="mb-4" status={status} />
      <h4 className="mb-4">Ingresa tu e-mail para iniciar sesión</h4>
      <form onSubmit={submitForm}>
        {/* E-mail */}
        <div>
          <FormGroup>
            <FormLabel>E-mail</FormLabel>
            <FormControl
              id="email"
              type="email"
              value={email}
              onChange={event => setEmail(event.target.value)}
              required
              autoFocus
              isInvalid={!!errors.email}
            />
            <FormControl.Feedback type="invalid">
              {errors.email}
            </FormControl.Feedback>
          </FormGroup>
        </div>

        {/* Contraseña */}
        <div className="mt-4">
          <FormGroup>
            <FormLabel>Contraseña</FormLabel>
            <FormControl
              id="password"
              type="password"
              value={password}
              onChange={event => setPassword(event.target.value)}
              required
              autoComplete="current-password"
              isInvalid={!!errors.password}
            />
            <FormControl.Feedback type="invalid">
              {errors.password}
            </FormControl.Feedback>
          </FormGroup>
        </div>

        {/* Recuérdame */}
        <div className="mt-4">
          <FormCheck
            type="checkbox"
            label="Recuérdame"
            id="remember_me"
            name="remember"
            onChange={event => setShouldRemember(event.target.checked)}
          />
        </div>

        <div className="d-grid mt-4">
          <Button disabled={loading} className="btn btn-primary">
            {loading ? (
              <>
                <Spinner animation="border" size="sm" /> Cargando...
              </>
            ) : (
              'Ingresar'
            )}
          </Button>
          <Stack
            direction="horizontal"
            gap={2}
            className="justify-content-center mt-4">
            <Link
              href="/forgot-password"
              className="link-primary link-underline link-underline-opacity-0 link-underline-opacity-100-hover">
              ¿Olvidaste tu contraseña?
            </Link>
            <span className="text-primary">·</span>
            <Link
              href="/register"
              className="link-primary link-underline link-underline-opacity-0 link-underline-opacity-100-hover">
              Crea una nueva cuenta
            </Link>
          </Stack>
        </div>
      </form>

      {/* Toast de éxito */}
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
          <ToastBody>Tu contraseña ha sido cambiada exitosamente.</ToastBody>
        </Toast>
      </ToastContainer>
    </>
  )
}

export default Login
