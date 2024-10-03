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

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [passwordConfirmation, setPasswordConfirmation] = useState('')
  const [errors, setErrors] = useState([])
  const [loading, setLoading] = useState(false)

  const submitForm = event => {
    event.preventDefault()

    register({
      name,
      email,
      password,
      password_confirmation: passwordConfirmation,
      setErrors,
      setLoading,
    })
  }

  return (
    <form onSubmit={submitForm}>
      {/* Email Address */}
      <div>
        <FormGroup className="mb-3">
          <FormLabel>Add your e-mail</FormLabel>
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

      {/* Name */}
      <div>
        <FormGroup className="mb-3">
          <FormLabel>Choose a name</FormLabel>
          <FormControl
            id="name"
            type="text"
            value={name}
            onChange={event => setName(event.target.value)}
            required
            isInvalid={!!errors.name}
          />
          <FormControl.Feedback type="invalid">
            {errors.name}
          </FormControl.Feedback>
        </FormGroup>
      </div>

      {/* Password */}
      <div>
        <FormGroup className="mb-3">
          <FormLabel>Create your password</FormLabel>
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

      {/* Confirm Password */}
      <div>
        <FormGroup className="mb-3">
          <FormLabel>Confirm your password</FormLabel>
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
              <Spinner animation="border" size="sm" /> Loading...
            </>
          ) : (
            'Register'
          )}
        </Button>
        <Link
          href="/login"
          className="link-primary link-underline link-underline-opacity-0 link-underline-opacity-100-hover ms-3">
          Already registered?
        </Link>
      </div>
    </form>
  )
}

export default Page
