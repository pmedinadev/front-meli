import Link from 'next/link'
import { Breadcrumb, BreadcrumbItem } from 'react-bootstrap'

export default function PersonalInformation() {
  return (
    <>
      <small>
        <Breadcrumb style={{ '--bs-breadcrumb-divider': "'>'" }}>
          <BreadcrumbItem linkAs={Link} href="/profile">
            My profile
          </BreadcrumbItem>
          <BreadcrumbItem active>Personal information</BreadcrumbItem>
        </Breadcrumb>
      </small>

      <h3 className="mt-4">Manage your information</h3>
    </>
  )
}
