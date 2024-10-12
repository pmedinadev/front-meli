import Sidebar from '@/components/layout/Sidebar'
import { Col, Container, Row } from 'react-bootstrap'

export const metadata = {
  title: 'My profile',
}

export default function MyProfileLayout({ children }) {
  return (
    <Row className='g-0'>
      <Col xs={2}>
        <Sidebar />
      </Col>
      <Col xs={10}>
        <Container className="mt-5">{children}</Container>
      </Col>
    </Row>
  )
}
