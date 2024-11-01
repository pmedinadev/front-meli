'use client'

import LoginLinks from '@/app/LoginLinks'
import { useCategories } from '@/hooks/useCategories'
import Image from 'next/image'
import Link from 'next/link'
import {
  Button,
  Container,
  DropdownDivider,
  DropdownItem,
  Nav,
  Navbar,
  NavbarBrand,
  NavbarCollapse,
  NavbarToggle,
  NavDropdown,
  NavLink,
} from 'react-bootstrap'

export default function Navigation() {
  const { categories, loading, error } = useCategories()

  return (
    <Navbar expand="lg" className="bg-primary-meli">
      <Container>
        <Link href="/">
          <NavbarBrand>
            <Image
              src="/logo_large.png"
              width={159}
              height={40}
              alt="Mercado Libre logo"
              priority
            />
          </NavbarBrand>
        </Link>
        <NavbarToggle
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
        />
        <NavbarCollapse id="navbarSupportedContent">
          <Nav as="nav" className="me-auto mb-2 mb-lg-0">
            <NavDropdown
              title="Categorías"
              className="link-body-emphasis border-0">
              {loading && <DropdownItem>Cargando...</DropdownItem>}
              {error && <DropdownItem>Error cargando categorías</DropdownItem>}
              {categories && categories.slice(0, 10).map(category => (
                <DropdownItem key={category.id} as={Link} href={`/category/${category.id}`}>
                  {category.name}
                </DropdownItem>
              ))}
              <DropdownDivider />
              <DropdownItem as={Link} href="/categories">
                Ver más categorías
              </DropdownItem>
            </NavDropdown>
            <NavLink as={Link} href="/">
              Vender
            </NavLink>
            <NavLink as={Link} href="/">
              Ayuda
            </NavLink>
          </Nav>
          <LoginLinks />
          <Button
            variant="link"
            size="lg"
            as={Link}
            title='Carrito'
            href="/cart"
            className="link-body-emphasis ms-3 p-0">
            <i className="bi bi-cart" />
          </Button>
        </NavbarCollapse>
      </Container>
    </Navbar>
  )
}
