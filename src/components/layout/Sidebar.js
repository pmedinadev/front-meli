'use client'

import { useAuth } from '@/hooks/auth'
import Link from 'next/link'
import { useState } from 'react'
import {
  Accordion,
  AccordionBody,
  AccordionItem,
  Button,
  Container,
  Nav,
  NavItem,
  NavLink,
} from 'react-bootstrap'

export default function Sidebar() {
  const { user } = useAuth({ middleware: 'auth' })
  const [activeKey, setActiveKey] = useState('')

  if (user) {

    const handleToggle = key => {
      setActiveKey(activeKey === key ? '' : key)
    }

    return (
      <Container className="p-3 bg-disabled-meli">
        <Nav className="flex-column justify-content-center">
          <NavItem>
            <Button
              variant="link"
              className="text-muted text-decoration-none d-flex align-items-center"
              onClick={() => handleToggle('0')}>
              <i className="bi bi-bag fs-4 me-2" />
              <small>Compras</small>
            </Button>
            <Accordion activeKey={activeKey}>
              <AccordionItem eventKey="0" className="border-0 bg-disabled-meli">
                <AccordionBody className="ps-4 p-0">
                  <NavLink as={Link} href="/" className="text-muted py-1">
                    <small>Compras</small>
                  </NavLink>
                  <NavLink as={Link} href="/" className="text-muted py-1">
                    <small>Preguntas</small>
                  </NavLink>
                  <NavLink as={Link} href="/" className="text-muted py-1">
                    <small>Opiniones</small>
                  </NavLink>
                </AccordionBody>
              </AccordionItem>
            </Accordion>
          </NavItem>
          <NavItem>
            <NavLink
              as={Link}
              href="/"
              className="text-muted d-flex align-items-center">
              <i className="bi bi-tag fs-4 me-2" />
              <small>Ventas</small>
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              as={Link}
              href="/profile"
              className="text-muted d-flex align-items-center">
              <i className="bi bi-person-circle fs-4 me-2" />
              <small>Mi perfil</small>
            </NavLink>
          </NavItem>
        </Nav>
      </Container>
    )
  }
}
