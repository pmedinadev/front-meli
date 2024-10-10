'use client'

import CardContainer from '@/components/layout/CardContainer'
import { useAuth } from '@/hooks/auth'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import {
  Button,
  Form,
  FormControl,
  FormGroup,
  FormLabel,
  Row,
} from 'react-bootstrap'

export default function DisplayName() {
  const { user, updateProfile } = useAuth({ middleware: 'auth' })
  const [formData, setFormData] = useState({
    display_name: '',
  })
  const [errors, setErrors] = useState([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (user) {
      setFormData({
        display_name: user.display_name,
      })
    }
  }, [user])

  const handleChange = e => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = e => {
    e.preventDefault()
    updateProfile({ ...formData, setErrors, setLoading })
  }

  if (user) {
    return (
      <>
        <div className="d-flex flex-column align-items-center">
          <Row className="g-0 w-50">
            <h4 className="mb-4">What do you want us to call you?</h4>
            <p className="text-body-tertiary">
              Everyone who interacts with you on Mercado Libre will see the name
              you choose.
            </p>
            <p className="text-body-tertiary">
              We will only use your full name if required for legal
              reasons.
            </p>
            <CardContainer className="p-4">
              <Form onSubmit={handleSubmit}>
                <FormGroup className="mb-4">
                  <FormLabel className="text-muted">Display name</FormLabel>
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
                  disabled={loading}
                  className="py-2 px-4 fw-medium">
                  {loading ? 'Loading...' : 'Save'}
                </Button>
                <Button
                  variant="link"
                  size="sm"
                  as={Link}
                  href="/profile"
                  className="text-decoration-none fw-medium ms-3">
                  Go back
                </Button>
              </Form>
            </CardContainer>
          </Row>
        </div>
      </>
    )
  }
}
