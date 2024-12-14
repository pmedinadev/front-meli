'use client'

import CardContainer from '@/components/layout/CardContainer'
import LoadingSpinner from '@/components/layout/LoadingSpinner'
import { useAuth } from '@/hooks/auth'
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

export default function AddressesHub() {
  const { user } = useAuth({ middleware: 'auth' })

  if (!user) return <LoadingSpinner />

  return (
    <Container>
      <div className="d-flex justify-content-center">
        <div className="w-75">
          <h5 className="mb-4">Direcciones</h5>
          <CardContainer className="bg-light">
            <Row className="g-0 p-4 border-bottom">
              <Col xs="auto" className="me-4">
                <i className="bi bi-house-door fs-5" />
              </Col>
              <Col>
                <span className="fw-light d-block mb-2">
                  Calle San Pablo 4085
                </span>
                <small className="text-muted">
                  <span className="d-block">
                    Código postal 80246 - Sinaloa - Culiacán
                  </span>
                  <span className="d-block">
                    Jesús Pablo Medina García - 6672679789
                  </span>
                </small>
                <Button
                  variant="link"
                  className="p-0 text-decoration-none mt-3">
                  Editar datos y horarios del lugar
                </Button>
              </Col>
              <Col xs="auto">
                <Dropdown align="end" className="address-dropdown">
                  <DropdownToggle
                    as={Button}
                    variant="link"
                    className="p-0 text-decoration-none">
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
            <Button
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
