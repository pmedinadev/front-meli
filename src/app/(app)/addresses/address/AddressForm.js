'use client'

import {
  Button,
  Col,
  Container,
  Form,
  FormCheck,
  FormControl,
  FormGroup,
  FormLabel,
  FormText,
  Row,
} from 'react-bootstrap'
import CardContainer from '@/components/layout/CardContainer'
import styles from './AddressForm.module.css'
import { useAuth } from '@/hooks/auth'
import LoadingSpinner from '@/components/layout/LoadingSpinner'
import { useRouter } from 'next/navigation'
import { useAddresses } from '@/hooks/useAddresses'
import { useState } from 'react'

export default function AddressForm() {
  const { user } = useAuth({ middleware: 'auth' })
  const router = useRouter()
  const { createAddress } = useAddresses()
  const [formData, setFormData] = useState({
    street_address: '',
    no_street_number: false,
    zip_code: '',
    unknown_zip_code: false,
    state: '',
    municipality: '',
    locality: '',
    neighborhood: '',
    interior_number: '',
    delivery_instructions: '',
    address_type: '',
    contact_name: '',
    contact_phone: '',
    is_default: false,
  })
  const [errors, setErrors] = useState({})

  const handleSubmit = async e => {
    e.preventDefault()
    setErrors({})

    try {
      await createAddress.mutateAsync(formData)
      router.push('/profile/addresses')
    } catch (error) {
      if (error.response?.data?.errors) {
        setErrors(error.response.data.errors)
      }
    }
  }

  const handleChange = e => {
    const { name, value, type, checked } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }))
  }

  if (!user) return <LoadingSpinner />

  return (
    <Container className="mt-4">
      <div className="d-flex justify-content-center">
        <div className="w-50">
          <h4 className="mb-3">Nuevo domicilio</h4>
          <CardContainer className="bg-body p-4">
            <Form onSubmit={handleSubmit}>
              <FormGroup controlId="street-address" className="mb-1">
                <FormLabel className={styles.formLabel}>Dirección</FormLabel>
                <FormControl
                  type="text"
                  name="street_address"
                  value={formData.street_address}
                  onChange={handleChange}
                  placeholder="Ej: Avenida los leones 4563"
                  className="p-2"
                  isInvalid={!!errors.street_address}
                />
                {errors.street_address && (
                  <FormControl.Feedback type="invalid">
                    {errors.street_address[0]}
                  </FormControl.Feedback>
                )}
              </FormGroup>
              <FormCheck
                type="checkbox"
                name="no_street_number"
                checked={formData.no_street_number}
                onChange={handleChange}
                id="no-street-number"
                label="Mi calle no tiene número"
              />

              <FormGroup controlId="zip-code" className="mt-4">
                <FormLabel className={styles.formLabel}>
                  Código Postal
                </FormLabel>
                <Row className="g-3 align-items-center">
                  <Col>
                    <FormControl
                      type="text"
                      name="zip_code"
                      value={formData.zip_code}
                      onChange={handleChange}
                      placeholder="Ej: 09440"
                      className="p-2"
                      isInvalid={!!errors.zip_code}
                    />
                    {errors.zip_code && (
                      <FormControl.Feedback type="invalid">
                        {errors.zip_code[0]}
                      </FormControl.Feedback>
                    )}
                  </Col>
                  <Col>
                    <FormCheck
                      type="checkbox"
                      name="unknown_zip_code"
                      checked={formData.unknown_zip_code}
                      onChange={handleChange}
                      id="unknown-zip-code"
                      label="No sé mi CP"
                      className="mb-0"
                    />
                  </Col>
                </Row>
              </FormGroup>

              <Row className="mt-2 g-3">
                <FormGroup as={Col} controlId="state">
                  <FormLabel className={styles.formLabel}>Estado</FormLabel>
                  <FormControl
                    type="text"
                    name="state"
                    value={formData.state}
                    onChange={handleChange}
                    className="p-2"
                    isInvalid={!!errors.state}
                  />
                  {errors.state && (
                    <FormControl.Feedback type="invalid">
                      {errors.state[0]}
                    </FormControl.Feedback>
                  )}
                </FormGroup>
                <FormGroup as={Col} controlId="municipality">
                  <FormLabel className={styles.formLabel}>
                    Municipio o alcaldía
                  </FormLabel>
                  <FormControl
                    type="text"
                    name="municipality"
                    value={formData.municipality}
                    onChange={handleChange}
                    className="p-2"
                    isInvalid={!!errors.municipality}
                  />
                  {errors.municipality && (
                    <FormControl.Feedback type="invalid">
                      {errors.municipality[0]}
                    </FormControl.Feedback>
                  )}
                </FormGroup>
              </Row>

              <Row className="mt-2 g-3">
                <FormGroup as={Col} controlId="locality">
                  <FormLabel className={styles.formLabel}>Localidad</FormLabel>
                  <FormControl
                    type="text"
                    name="locality"
                    value={formData.locality}
                    onChange={handleChange}
                    className="p-2"
                    isInvalid={!!errors.locality}
                  />
                  {errors.locality && (
                    <FormControl.Feedback type="invalid">
                      {errors.locality[0]}
                    </FormControl.Feedback>
                  )}
                </FormGroup>
                <FormGroup as={Col} controlId="neighborhood">
                  <FormLabel className={styles.formLabel}>
                    Colonia o barrio
                  </FormLabel>
                  <FormControl
                    type="text"
                    name="neighborhood"
                    value={formData.neighborhood}
                    onChange={handleChange}
                    className="p-2"
                    isInvalid={!!errors.neighborhood}
                  />
                  {errors.neighborhood && (
                    <FormControl.Feedback type="invalid">
                      {errors.neighborhood[0]}
                    </FormControl.Feedback>
                  )}
                </FormGroup>
              </Row>

              <Row className="mt-2 g-3">
                <FormGroup as={Col} xs={6} controlId="interior-number">
                  <FormLabel className={styles.formLabel}>
                    Número interior / Departamento (opcional)
                  </FormLabel>
                  <FormControl
                    type="text"
                    name="interior_number"
                    value={formData.interior_number}
                    onChange={handleChange}
                    placeholder="Ej: 201"
                    className="p-2"
                  />
                </FormGroup>
              </Row>

              <FormGroup controlId="delivery-instructions" className="my-4">
                <FormLabel className={styles.formLabel}>
                  Indicaciones para la entrega (opcional)
                </FormLabel>
                <FormControl
                  as="textarea"
                  name="delivery_instructions"
                  value={formData.delivery_instructions}
                  onChange={handleChange}
                  placeholder="Ej.: Entre calles, color del edificio, no tiene timbre."
                  rows={3}
                  className={styles.textarea}
                />
                <FormText
                  role="progressbar"
                  maxLength={128}
                  aria-valuenow={0}
                  aria-valuemin={0}
                  aria-valuemax={128}
                  aria-label="Máximo 128 caracteres"
                  className={`${styles.formText} d-block text-end`}>
                  0 / 128
                </FormText>
              </FormGroup>

              <FormGroup className="mb-3">
                <h2 className="fs-6 fw-normal">Tipo de domicilio</h2>
                <Form.Check
                  type="radio"
                  name="address_type"
                  id="residential"
                  value="residential"
                  checked={formData.address_type === 'residential'}
                  onChange={handleChange}
                  isInvalid={!!errors.address_type}
                  label={
                    <>
                      <i className="bi bi-house-door me-2" />
                      Residencial
                    </>
                  }
                />
                <Form.Check
                  type="radio"
                  name="address_type"
                  id="business"
                  value="business"
                  checked={formData.address_type === 'business'}
                  onChange={handleChange}
                  isInvalid={!!errors.address_type}
                  label={
                    <>
                      <i className="bi bi-briefcase me-2" />
                      Laboral
                    </>
                  }
                />
                {errors.address_type && (
                  <Form.Control.Feedback type="invalid" className="d-block">
                    {errors.address_type[0]}
                  </Form.Control.Feedback>
                )}
              </FormGroup>

              <h2 className="fs-6 fw-normal mt-4">Datos de contacto</h2>
              <p className={styles.subtitle}>
                Te llamaremos si hay un problema con la entrega
              </p>
              <FormGroup controlId="contact-name" className="mb-4">
                <FormLabel className={styles.formLabel}>
                  Nombre y apellido
                </FormLabel>
                <FormControl
                  type="text"
                  name="contact_name"
                  value={formData.contact_name}
                  onChange={handleChange}
                  className="p-2"
                  isInvalid={!!errors.contact_name}
                />
                {errors.contact_name && (
                  <FormControl.Feedback type="invalid">
                    {errors.contact_name[0]}
                  </FormControl.Feedback>
                )}
              </FormGroup>

              <FormGroup controlId="contact-phone" className="mb-4">
                <FormLabel className={styles.formLabel}>Teléfono</FormLabel>
                <FormControl
                  type="text"
                  name="contact_phone"
                  value={formData.contact_phone}
                  onChange={handleChange}
                  className="p-2"
                  isInvalid={!!errors.contact_phone}
                />
                {errors.contact_phone && (
                  <FormControl.Feedback type="invalid">
                    {errors.contact_phone[0]}
                  </FormControl.Feedback>
                )}
              </FormGroup>

              <div className="text-end">
                <Button
                  type="submit"
                  className="fw-medium px-3 py-2"
                  disabled={createAddress.isPending}>
                  {createAddress.isPending ? 'Guardando...' : 'Continuar'}
                </Button>
              </div>
            </Form>
          </CardContainer>
        </div>
      </div>
    </Container>
  )
}
