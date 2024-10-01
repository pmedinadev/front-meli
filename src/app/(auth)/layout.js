// import Link from 'next/link'
import AuthCard from '@/app/(auth)/AuthCard'
import Navigation from './Navigation'
import { Col, Container, Row } from 'react-bootstrap'

const Layout = ({ children }) => {
  return (
    <div className="d-flex flex-column min-vh-100">
      <Navigation />
      <Container fluid className="flex-grow-1 d-flex align-items-center">
        <Row className="w-100 justify-content-center">
          <Col xs={12} sm={10} nd={8} lg={6} xl={5}>
            <AuthCard>{children}</AuthCard>
          </Col>
        </Row>
      </Container>
    </div>
  )
}

export default Layout
