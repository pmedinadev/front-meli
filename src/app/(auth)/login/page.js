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

  useEffect(() => {
    if (router.reset?.length > 0 && errors.length === 0) {
      setStatus(atob(router.reset))
    } else {
      setStatus(null)
    }
  })

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
      <form onSubmit={submitForm}>
        {/* Email Address */}
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

        {/* Password */}
        <div className="mt-4">
          <FormGroup>
            <FormLabel>Password</FormLabel>
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

        {/* Remember Me */}
        <div className="mt-4">
          <FormCheck
            type="checkbox"
            label="Remember me"
            id="remember_me"
            name="remember"
            onChange={event => setShouldRemember(event.target.checked)}
          />
        </div>

        <div className="d-grid mt-4">
          <Button disabled={loading} className="btn btn-primary">
            {loading ? (
              <>
                <Spinner animation="border" size="sm" /> Loading...
              </>
            ) : (
              'Log in'
            )}
          </Button>
          <Stack
            direction="horizontal"
            gap={2}
            className="justify-content-center mt-4">
            <Link
              href="/forgot-password"
              className="link-primary link-underline link-underline-opacity-0 link-underline-opacity-100-hover">
              Forgot your password?
            </Link>
            <span className="text-primary">·</span>
            <Link
              href="/register"
              className="link-primary link-underline link-underline-opacity-0 link-underline-opacity-100-hover">
              Create a new account
            </Link>
          </Stack>
        </div>
      </form>
    </>
  )
}

export default Login
