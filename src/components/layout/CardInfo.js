import { Button, Col, Row } from 'react-bootstrap'

export default function CardInfo({
  color,
  icon,
  title,
  desc,
  link,
  className,
  onClick,
}) {
  return (
    <div className={`bg-disabled-meli rounded ${className}`}>
      <Row className="g-0">
        <Col className="col-auto">
          <div
            className={`bg-${color} h-100 rounded-start`}
            style={{ width: '4px' }}
          />
        </Col>
        <Col className="col-auto py-3 ps-3">
          <i className={`bi bi-${icon} text-${color}`} />
        </Col>
        <Col className="p-3">
          {title && (
            <h6 className="fw-bold">
              <small>{title}</small>
            </h6>
          )}
          {desc && (
            <p className="mb-1">
              <small>{desc}</small>
            </p>
          )}
          {link && (
            <p className="mb-0">
              <Button
                onClick={onClick}
                variant="link"
                className="link-underline link-underline-opacity-0 link-underline-opacity-100-hover p-0">
                <small>{link}</small>
              </Button>
            </p>
          )}
        </Col>
      </Row>
    </div>
  )
}
