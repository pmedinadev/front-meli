import CardContainer from '@/components/layout/CardContainer'
import { Button, Col, Container, FormControl, Row } from 'react-bootstrap'

export default function HelpPage() {
  return (
    <Container>
      <div className="d-flex justify-content-center">
        <div className="m-4 w-lg-50">
          <h3 className="mb-4">¿Con qué podemos ayudarte?</h3>
          <FormControl placeholder="Buscar en Ayuda" className="mb-4 p-3 border-secondary" />

          <h5>Compras</h5>
          <CardContainer className="bg-body p-4 mb-5">
            <Row className="mb-3">
              <Col xs="auto">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="23"
                  height="24"
                  viewBox="0 0 23 24">
                  <g fill="none" fill-rule="evenodd">
                    <g fill-rule="nonzero">
                      <g>
                        <path
                          fill="#FFD115"
                          d="M2 23L3.668 8 20.006 8 21.676 23z"
                          transform="translate(-321 -284) translate(322 285)"></path>
                        <path
                          stroke="#585858"
                          d="M0 21L1.668 6 18.006 6 19.676 21z"
                          transform="translate(-321 -284) translate(322 285)"></path>
                        <path
                          stroke="#585858"
                          d="M14.994 6.281V5.247C14.994 2.349 12.644 0 9.747 0 6.849 0 4.5 2.35 4.5 5.247v1.059"
                          transform="translate(-321 -284) translate(322 285)"></path>
                      </g>
                    </g>
                  </g>
                </svg>
              </Col>
              <Col>
                <h6>Administrar y cancelar compras</h6>
                <p className="mb-0 text-muted">
                  <small>
                    Pagar, seguir envíos, modificar, reclamar o cancelar
                    compras.
                  </small>
                </p>
              </Col>
              <Col xs="auto" className="d-flex align-items-center">
                <i className="bi bi-chevron-right" />
              </Col>
            </Row>
            <hr />
            <Row className="mb-3">
              <Col xs="auto">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="23"
                  height="24"
                  viewBox="0 0 23 24">
                  <g fill="none" fill-rule="evenodd">
                    <g fill-rule="nonzero">
                      <g>
                        <path
                          fill="#FFD115"
                          d="M2 23L3.668 8 20.006 8 21.676 23z"
                          transform="translate(-321 -284) translate(322 285)"></path>
                        <path
                          stroke="#585858"
                          d="M0 21L1.668 6 18.006 6 19.676 21z"
                          transform="translate(-321 -284) translate(322 285)"></path>
                        <path
                          stroke="#585858"
                          d="M14.994 6.281V5.247C14.994 2.349 12.644 0 9.747 0 6.849 0 4.5 2.35 4.5 5.247v1.059"
                          transform="translate(-321 -284) translate(322 285)"></path>
                      </g>
                    </g>
                  </g>
                </svg>
              </Col>
              <Col>
                <h6>Administrar y cancelar compras</h6>
                <p className="mb-0 text-muted">
                  <small>
                    Pagar, seguir envíos, modificar, reclamar o cancelar
                    compras.
                  </small>
                </p>
              </Col>
              <Col xs="auto" className="d-flex align-items-center">
                <i className="bi bi-chevron-right" />
              </Col>
            </Row>
            <hr />
            <Row>
              <Col xs="auto">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="23"
                  height="24"
                  viewBox="0 0 23 24">
                  <g fill="none" fill-rule="evenodd">
                    <g fill-rule="nonzero">
                      <g>
                        <path
                          fill="#FFD115"
                          d="M2 23L3.668 8 20.006 8 21.676 23z"
                          transform="translate(-321 -284) translate(322 285)"></path>
                        <path
                          stroke="#585858"
                          d="M0 21L1.668 6 18.006 6 19.676 21z"
                          transform="translate(-321 -284) translate(322 285)"></path>
                        <path
                          stroke="#585858"
                          d="M14.994 6.281V5.247C14.994 2.349 12.644 0 9.747 0 6.849 0 4.5 2.35 4.5 5.247v1.059"
                          transform="translate(-321 -284) translate(322 285)"></path>
                      </g>
                    </g>
                  </g>
                </svg>
              </Col>
              <Col>
                <h6>Administrar y cancelar compras</h6>
                <p className="mb-0 text-muted">
                  <small>
                    Pagar, seguir envíos, modificar, reclamar o cancelar
                    compras.
                  </small>
                </p>
              </Col>
              <Col xs="auto" className="d-flex align-items-center">
                <i className="bi bi-chevron-right" />
              </Col>
            </Row>
          </CardContainer>
          </div>
      </div>
    </Container>
  )
}
