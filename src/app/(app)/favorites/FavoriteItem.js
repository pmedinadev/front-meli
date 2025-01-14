import { Button, Col, Row } from "react-bootstrap";

export default function FavoriteItem({title, price}) {
    return (
        <Row className="bg-body p-4 g-0 border-top">
            <Col className="me-4" xs="auto">
            <div className="bg-body-meli d-flex align-items-center justify-content-center" style={{ width: '160px', height: '160px'}} >
                <i className="bi bi-image fs-2"
                />
            </div>
            </Col>
            <Col>
                <h5 className="fw-normal mb-3">{title}</h5>
                <h4 className="fw-medium">$ 30,000</h4>
                <small>
                    <span className="fw-medium text-success d-block mb-3">Envío gratis</span>
                    <Button className="p-0 me-4 text-decoration-none fw-medium" size="sm" variant="link">Agregar a lista</Button>
                    <Button className="p-0 text-decoration-none fw-medium" size="sm" variant="link">Eliminar</Button>
                </small>
            </Col>
        </Row>
    )
}