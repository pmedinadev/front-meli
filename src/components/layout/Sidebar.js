'use client'

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
  const [activeKey, setActiveKey] = useState('')

  const handleToggle = key => {
    setActiveKey(activeKey === key ? '' : key)
  }

  return (
    <Container className="d-flex flex-column vh-100 p-3 bg-light">
      <Nav className="flex-column justify-content-center">
        <NavItem>
          <Button
            variant="link"
            className="text-muted text-decoration-none d-flex align-items-center"
            onClick={() => handleToggle('0')}>
            <i className="bi bi-bag fs-4 me-2" />
            <small>Purchases</small>
          </Button>
          <Accordion activeKey={activeKey}>
            <AccordionItem eventKey="0" className="border-0 bg-light">
              <AccordionBody className="ps-4 p-0">
                <NavLink as={Link} href="/" className="text-muted py-1">
                  <small>Purchases</small>
                </NavLink>
                <NavLink as={Link} href="/" className="text-muted py-1">
                  <small>Questions</small>
                </NavLink>
                <NavLink as={Link} href="/" className="text-muted py-1">
                  <small>Reviews</small>
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
            <small className="mb-1">Sales</small>
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink
            as={Link}
            href="/profile"
            className="text-muted d-flex align-items-center">
            <i className="bi bi-person-circle fs-4 me-2" />
            <small className="mb-1">Profile</small>
          </NavLink>
        </NavItem>
      </Nav>
    </Container>
  )
}
