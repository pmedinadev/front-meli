'use client'

import CardContainer from '@/components/layout/CardContainer'
import { useAuth } from '@/hooks/auth'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import {
  Button,
  Col,
  Form,
  FormControl,
  FormGroup,
  FormLabel,
  Row,
} from 'react-bootstrap'

export default function DataCorrection() {
  const { user, updateProfile } = useAuth({ middleware: 'auth' })
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    second_last_name: '',
  })
  const [errors, setErrors] = useState([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (user) {
      setFormData({
        first_name: user.first_name,
        last_name: user.last_name,
        second_last_name: user.second_last_name,
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
        <Row className="g-0">
          <h3 className="text-center mt-1">Correct your name</h3>
          <Form onSubmit={handleSubmit} className="d-flex flex-column align-items-center">
            <CardContainer className="mt-4 p-4 w-50">
              <FormGroup className="mb-4">
                <FormLabel className="text-muted">First name</FormLabel>
                <FormControl
                  type="text"
                  name="first_name"
                  value={formData.first_name}
                  onChange={handleChange}
                  isInvalid={!!errors.first_name}
                />
                <FormControl.Feedback type="invalid">
                  {errors.first_name}
                </FormControl.Feedback>
              </FormGroup>

              <Row className="mb-4">
                <FormGroup as={Col}>
                  <FormLabel className="text-muted">Last name</FormLabel>
                  <FormControl
                    type="text"
                    name="last_name"
                    value={formData.last_name}
                    onChange={handleChange}
                    isInvalid={!!errors.last_name}
                  />
                  <FormControl.Feedback type="invalid">
                    {errors.last_name}
                  </FormControl.Feedback>
                </FormGroup>
                <FormGroup as={Col}>
                  <FormLabel className="text-muted">Second last name</FormLabel>
                  <FormControl
                    type="text"
                    name="second_last_name"
                    value={formData.second_last_name}
                    onChange={handleChange}
                    isInvalid={!!errors.second_last_name}
                  />
                  <FormControl.Feedback type="invalid">
                    {errors.second_last_name}
                  </FormControl.Feedback>
                </FormGroup>
              </Row>

              <Row>
                <FormGroup as={Col} lg={6}>
                  <FormLabel className="text-muted">
                    Identity document
                  </FormLabel>
                  <FormControl type="text" />
                </FormGroup>
              </Row>
            </CardContainer>

            <div className="d-flex align-items-center justify-content-end mt-4 w-50">
              <Button
                variant="link"
                size="sm"
                as={Link}
                href="/profile"
                className="text-decoration-none fw-medium me-4">
                Go back
              </Button>
              <Button
                size="sm"
                type="submit"
                disabled={loading}
                className="py-2 px-4 fw-medium">
                {loading ? 'Loading...' : 'Save'}
              </Button>
            </div>
          </Form>
        </Row>
      </>
    )
  }
}
