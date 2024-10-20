'use client'

import Button from '@/components/Button'
import Link from 'next/link'
import { useAuth } from '@/hooks/auth'
import { useState } from 'react'
import { FormControl, FormGroup, FormLabel, Spinner } from 'react-bootstrap'

const Page = () => {
  const { register } = useAuth({
    middleware: 'guest',
    redirectIfAuthenticated: '/',
  })

  const [email, setEmail] = useState('')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [passwordConfirmation, setPasswordConfirmation] = useState('')
  const [errors, setErrors] = useState([])
  const [loading, setLoading] = useState(false)

  const submitForm = event => {
    event.preventDefault()

    register({
      email,
      username,
      password,
      password_confirmation: passwordConfirmation,
      setErrors,
      setLoading,
    })
  }

  return (
    <>
      <h4 className="mb-4">Completa los datos para crear tu cuenta</h4>
      <form onSubmit={submitForm}>
        {/* E-mail */}
        <div>
          <FormGroup className="mb-3">
            <FormLabel>Agrega tu e-mail</FormLabel>
            <FormControl
              id="email"
              type="email"
              value={email}
              onChange={event => setEmail(event.target.value)}
              autoFocus
              required
              isInvalid={!!errors.email}
            />
            <FormControl.Feedback type="invalid">
              {errors.email}
            </FormControl.Feedback>
          </FormGroup>
        </div>

        {/* Nombre de usuario */}
        <div>
          <FormGroup className="mb-3">
            <FormLabel>Elige un nombre de usuario</FormLabel>
            <FormControl
              id="username"
              type="text"
              value={username}
              onChange={event => setUsername(event.target.value)}
              required
              isInvalid={!!errors.username}
            />
            <FormControl.Feedback type="invalid">
              {errors.username}
            </FormControl.Feedback>
          </FormGroup>
        </div>

        {/* Contraseña */}
        <div>
          <FormGroup className="mb-3">
            <FormLabel>Crea tu contraseña</FormLabel>
            <FormControl
              id="password"
              type="password"
              value={password}
              onChange={event => setPassword(event.target.value)}
              required
              autoComplete="new-password"
              isInvalid={!!errors.password}
            />
            <FormControl.Feedback type="invalid">
              {errors.password}
            </FormControl.Feedback>
          </FormGroup>
        </div>

        {/* Confirmar contraseña */}
        <div>
          <FormGroup className="mb-3">
            <FormLabel>Confirma tu contraseña</FormLabel>
            <FormControl
              id="passwordConfirmation"
              type="password"
              value={passwordConfirmation}
              onChange={event => setPasswordConfirmation(event.target.value)}
              required
              isInvalid={!!errors.password_confirmation}
            />
            <FormControl.Feedback type="invalid">
              {errors.password_confirmation}
            </FormControl.Feedback>
          </FormGroup>
        </div>

        <div>
          <Button disabled={loading} className="btn btn-primary">
            {loading ? (
              <>
                <Spinner animation="border" size="sm" /> Cargando...
              </>
            ) : (
              'Registrarme'
            )}
          </Button>
          <Link
            href="/login"
            className="link-primary link-underline link-underline-opacity-0 link-underline-opacity-100-hover ms-3">
            ¿Ya estás registrado?
          </Link>
        </div>
      </form>
    </>
  )
}

export default Page
