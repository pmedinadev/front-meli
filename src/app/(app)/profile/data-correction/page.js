'use client'

import CardContainer from '@/components/layout/CardContainer'
import { useAuth } from '@/hooks/auth'
import { useProfile } from '@/hooks/useProfile'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
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
  const { user } = useAuth({ middleware: 'auth' })
  const { updateProfile, loading, errors } = useProfile()
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    second_last_name: '',
  })
  const [originalFirstName, setOriginalFirstName] = useState('')
  const [originalLastName, setOriginalLastName] = useState('')
  const [originalSecondLastName, setOriginalSecondLastName] = useState('')
  const router = useRouter()

  useEffect(() => {
    if (user) {
      setFormData({
        first_name: user.first_name,
        last_name: user.last_name,
        second_last_name: user.second_last_name,
      })
      setOriginalFirstName(user.first_name)
      setOriginalLastName(user.last_name)
      setOriginalSecondLastName(user.second_last_name)
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
      localStorage.setItem('dataUpdated', 'true')
      router.push('/profile/personal-data')
    }
  }

  if (user) {
    return (
      <>
        <Row className="g-0">
          <h3 className="text-center mt-1">Correct your name</h3>
          <Form
            onSubmit={handleSubmit}
            className="d-flex flex-column align-items-center">
            <CardContainer className="bg-body mt-4 p-4 w-50">
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
                href="/profile/personal-data"
                className="text-decoration-none fw-medium me-4">
                Go back
              </Button>
              <Button
                size="sm"
                type="submit"
                disabled={
                  loading ||
                  (formData.first_name === originalFirstName &&
                    formData.last_name === originalLastName &&
                    formData.second_last_name === originalSecondLastName)
                }
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
