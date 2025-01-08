'use client'

import {
  Button,
  Col,
  Container,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Row,
} from 'react-bootstrap'
import CardContainer from '@/components/layout/CardContainer'
import LoadingSpinner from '@/components/layout/LoadingSpinner'
import Link from 'next/link'
import { useAuth } from '@/hooks/auth'
import { useAddresses } from '@/hooks/useAddresses'
import styles from './AddressesHub.module.css'

export default function AddressesHub() {
  const { user } = useAuth({ middleware: 'auth' })
  const { addresses } = useAddresses()

  if (!user || addresses.isLoading) return <LoadingSpinner />

  return (
    <Container>
      <div className="d-flex justify-content-center">
        <div className="w-75">
          <h5 className="mb-4">Direcciones</h5>
          <CardContainer className="bg-light">
            {addresses.data?.map(address => (
              <Row key={address.id} className="g-0 p-4 border-bottom">
                <Col xs="auto" className="me-4">
                  <i
                    className={`bi bi-${address.address_type === 'residential' ? 'house-door' : 'briefcase'} fs-5`}
                  />
                </Col>
                <Col>
                  <span className="d-block mb-2">
                    Calle {address.street_address}
                  </span>
                  <small className="text-muted">
                    <span className="d-block">
                      Código postal {address.zip_code} - {address.state} -{' '}
                      {address.municipality}
                    </span>
                    <span className="d-block">
                      {address.contact_name} - {address.contact_phone}
                    </span>
                  </small>
                  <Button
                    variant="link"
                    className="p-0 text-decoration-none mt-3">
                    Editar datos y horarios del lugar
                  </Button>
                </Col>
                <Col xs="auto">
                  <Dropdown align="end">
                    <DropdownToggle
                      as={Button}
                      variant="link"
                      className={`${styles.dropdownToggle} p-0 text-decoration-none`}>
                      <i className="bi bi-three-dots-vertical fs-5 text-muted" />
                    </DropdownToggle>

                    <DropdownMenu className="shadow-sm border-0">
                      <DropdownItem>Editar</DropdownItem>
                      <DropdownItem>
                        Gestionar mis domicilios de envíos
                      </DropdownItem>
                    </DropdownMenu>
                  </Dropdown>
                </Col>
              </Row>
            ))}
            <Button
              as={Link}
              href="/addresses/address"
              variant="light"
              className="py-3 px-4 w-100 rounded-0 rounded-bottom fw-medium text-start text-primary">
              <div className="d-flex justify-content-between">
                Agregar dirección
                <i className="bi bi-chevron-right" />
              </div>
            </Button>
          </CardContainer>
        </div>
      </div>
    </Container>
  )
}
