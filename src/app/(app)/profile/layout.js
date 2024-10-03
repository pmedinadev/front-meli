import { Container } from 'react-bootstrap'

export const metadata = {
  title: 'My profile',
}

export default function MyProfileLayout({ children }) {
  return <Container className="mt-5">{children}</Container>
}
