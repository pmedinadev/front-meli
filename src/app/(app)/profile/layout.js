import Sidebar from '@/components/layout/Sidebar'
import { Col, Container, Row } from 'react-bootstrap'

export default function MyProfileLayout({ children }) {
  return (
    <Row className="g-0 sidebar-container">
      <Col className="col-auto d-flex">
        <Sidebar />
      </Col>
      <Col>
        <Container className="my-5 px-5">{children}</Container>
      </Col>
    </Row>
  )
}
