import LoginLinks from '@/app/LoginLinks'
import Image from 'next/image'
import Link from 'next/link'
import {
  Button,
  Container,
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
              title="Categories"
              className="link-body-emphasis border-0">
              <DropdownItem as={Link} href="/">
                Example 1
              </DropdownItem>
            </NavDropdown>
            <NavLink as={Link} href="/">
              Sell
            </NavLink>
            <NavLink as={Link} href="/">
              Help
            </NavLink>
          </Nav>
          <LoginLinks />
          <Button
            variant="link"
            size="lg"
            as={Link}
            href="/"
            className="link-body-emphasis ms-3 p-0">
            <i className="bi bi-cart" />
          </Button>
        </NavbarCollapse>
      </Container>
    </Navbar>
  )
}
