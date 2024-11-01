import Image from 'next/image'
import Link from 'next/link'
import { Container, Navbar, NavbarBrand } from 'react-bootstrap'

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
              priority
            />
          </NavbarBrand>
        </Link>
      </Container>
    </Navbar>
  )
}
