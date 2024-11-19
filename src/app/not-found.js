import NotFound from '@/components/svg/NotFound'
import Image from 'next/image'
import Link from 'next/link'
import { Col, Container, Navbar, NavbarBrand, Row } from 'react-bootstrap'

export const metadata = {
  title: 'Página no encontrada',
}

const NotFoundPage = () => {
  return (
    <div className="bg-white d-flex flex-column min-vh-100">
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
        </Container>
      </Navbar>
      <Container fluid className="flex-grow-1 d-flex align-items-center">
        <Row className="w-100 text-center">
          <Col>
            <NotFound />
            <h5 className="fw-bold my-4">Parece que esta página no existe</h5>
            <Link
              href="/"
              className="link-secondary link-underline link-underline-opacity-0 link-underline-opacity-100-hover">
              <small>Ir a la página principal</small>
            </Link>
          </Col>
        </Row>
      </Container>
    </div>
  )
}

export default NotFoundPage
