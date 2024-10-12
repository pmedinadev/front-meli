'use client'

import CardContainer from '@/components/layout/CardContainer'
import { useAuth } from '@/hooks/auth'
import { useProfile } from '@/hooks/useProfile'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import {
  Button,
  Form,
  FormControl,
  FormGroup,
  FormLabel,
  FormSelect,
  InputGroup,
  Row,
} from 'react-bootstrap'

export default function PhoneNumber() {
  const { user } = useAuth({ middleware: 'auth' })
  const { updateProfile, loading, errors } = useProfile()
  const [formData, setFormData] = useState({
    phone: '',
    countryCode: '+52',
  })
  const router = useRouter()

  const handleChange = e => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = async e => {
    e.preventDefault()
    const fullPhoneNumber = `${formData.countryCode}${formData.phone}`
    const success = await updateProfile({ phone: fullPhoneNumber })
    if (success) {
      localStorage.setItem('phoneUpdated', 'true')
      router.push('/profile/account-data')
    }
  }

  if (user) {
    return (
      <>
        <div className="d-flex flex-column align-items-center">
          <Row className="g-0 w-50">
            <CardContainer className="bg-body p-5">
              <h5 className="mb-4 fw-bold">Enter your phone number</h5>
              <Form onSubmit={handleSubmit}>
                <FormGroup className="mb-4">
                  <FormLabel>Area code + number</FormLabel>
                  <InputGroup>
                    <FormSelect
                      name='countryCode'
                      value={formData.countryCode}
                      onChange={handleChange}>
                      <option value="+52">+52</option>
                      <option value="+1">+1</option>
                    </FormSelect>
                    <FormControl
                      type="text"
                      name="phone"
                      value={formData.phone}
                      required
                      onChange={handleChange}
                      isInvalid={!!errors.phone}
                      className="w-75"
                    />
                  </InputGroup>
                  <FormControl.Feedback type="invalid">
                    {errors.phone}
                  </FormControl.Feedback>
                </FormGroup>
                <Button
                  size="sm"
                  type="submit"
                  disabled={loading}
                  className="py-2 px-4 fw-medium">
                  {loading ? 'Loading...' : 'Continue'}
                </Button>
                <Button
                  variant="link"
                  size="sm"
                  as={Link}
                  href="/profile/account-data"
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
