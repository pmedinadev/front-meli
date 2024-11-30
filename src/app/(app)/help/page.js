import CardContainer from '@/components/layout/CardContainer'
import { Button, Col, Container, FormControl, Row } from 'react-bootstrap'

export default function HelpPage() {
  return (
    <Container>
      <div className="d-flex justify-content-center">
        <div className="m-4 w-lg-65">
          <h3 className="mb-4">¿Con qué podemos ayudarte?</h3>
          <Row className="align-items-center">
            <Col>
          <FormControl
            placeholder="Buscar en Ayuda"
            className="mb-4 p-3 border-secondary"
          />
          </Col>
          <Col xs="auto">
          <Button variante="primary" className="mb-3 p-2">
            Buscar
          </Button>
          </Col>
          </Row>

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
                  width="26"
                  height="27"
                  viewBox="0 0 26 27">
                  <g fill="none" fill-rule="evenodd">
                    <g>
                      <g>
                        <g transform="translate(-319 -363) translate(320 364)">
                          <circle
                            cx="12.157"
                            cy="12.866"
                            r="12"
                            fill="#CFB53C"
                            fill-rule="nonzero"></circle>
                          <circle
                            cx="11.491"
                            cy="12.2"
                            r="11.333"
                            fill="#FFD115"
                            fill-rule="nonzero"></circle>
                          <path
                            stroke="#585858"
                            stroke-linecap="square"
                            stroke-width=".8"
                            d="M14.087.193c-2.205-.396-4.516-.19-6.675.688M0 13.838c.212 1.592.735 3.174 1.591
                             4.657 1.915 3.316 5.093 5.436 8.54 6.084 2.748.516 5.666.097 8.254-1.397 1.786-1.03 
                             3.207-2.454 4.22-4.105 1.216-1.977 1.846-4.28 
                             1.817-6.622-.025-2.09-.574-4.21-1.7-6.16-.878-1.521-2.022-2.79-3.336-3.782-1.577-1.19-3.398-1.978-5.299-2.32"></path>
                        </g>
                        <g stroke="#585858" stroke-linecap="square">
                          <path
                            d="M.416 5.293h6.233c1.722 0 3.117-1.03 3.117-2.649C9.766 1.024 8.371 0 6.65 0H3.533"
                            transform="translate(-319 -363) translate(320 364) translate(8 9)"></path>
                          <path
                            d="M2 3.293L0 5.292 2 7.293"
                            transform="translate(-319 -363) translate(320 364) translate(8 9)"></path>
                        </g>
                      </g>
                    </g>
                  </g>
                </svg>
              </Col>
              <Col>
                <h6>Devoluciones y reembolsos</h6>
                <p className="mb-0 text-muted">
                  <small>
                    Devolver un producto o consultar por reintegros de dinero de
                    una compra.
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
                <div class="svg-to-component cx-contents-list__icon cx-contents-list__icon--top">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="26"
                    height="27"
                    viewBox="0 0 26 27">
                    <g fill="none" fill-rule="evenodd">
                      <g>
                        <g>
                          <g transform="translate(-319 -443) translate(320 444)">
                            <circle
                              cx="12.157"
                              cy="12.866"
                              r="12"
                              fill="#CFB53C"
                              fill-rule="nonzero"></circle>
                            <circle
                              cx="11.491"
                              cy="12.2"
                              r="11.333"
                              fill="#FFD115"
                              fill-rule="nonzero"></circle>
                            <path
                              stroke="#585858"
                              stroke-linecap="square"
                              stroke-width=".8"
                              d="M14.087.193c-2.205-.396-4.516-.19-6.675.688M0 13.838c.212 1.592.735 3.174 1.591 4.657 1.915 3.316 5.093 5.436 8.54 6.084 2.748.516 5.666.097 8.254-1.397 1.786-1.03 3.207-2.454 4.22-4.105 1.216-1.977 1.846-4.28 1.817-6.622-.025-2.09-.574-4.21-1.7-6.16-.878-1.521-2.022-2.79-3.336-3.782-1.577-1.19-3.398-1.978-5.299-2.32"></path>
                          </g>
                          <path
                            fill="#585858"
                            fill-rule="nonzero"
                            d="M10.848 13.76c0-1.206.864-1.818 1.674-2.394.72-.504 1.386-.954 1.386-1.782 0-.792-.612-1.476-1.908-1.476-1.224 0-2.052.54-2.682 1.368L8.274 8.324c.882-1.134 2.232-1.818 3.906-1.818 2.232 0 3.582 1.224 3.582 2.808 0 1.494-1.026 2.232-1.962 2.88-.72.522-1.386.972-1.386 1.728 0 .288.18.63.432.846l-1.332.504c-.45-.432-.666-.936-.666-1.512zm.054 3.996c0-.612.504-1.116 1.116-1.116.612 0 1.134.504 1.134 1.116 0 .612-.522 1.134-1.134 1.134-.612 0-1.116-.522-1.116-1.134z"
                            transform="translate(-319 -443) translate(320 444)"></path>
                        </g>
                      </g>
                    </g>
                  </svg>
                </div>
              </Col>
              <Col>
                <h6>Preguntas frecuentes sobre compras</h6>
                <p className="mb-0 text-muted"></p>
              </Col>
              <Col xs="auto" className="d-flex align-items-center">
                <i className="bi bi-chevron-right" />
              </Col>
            </Row>
          </CardContainer>

          <h5>Ventas</h5>
          <CardContainer className="bg-body p-4 mb-5">
            <Row className="mb-3">
              <Col xs="auto">
                <div class="svg-to-component cx-contents-list__icon cx-contents-list__icon--top">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="25"
                    height="24"
                    viewBox="0 0 25 24">
                    <g fill="none" fill-rule="evenodd">
                      <g>
                        <g transform="translate(-320 -606) translate(320 607)">
                          <path
                            fill="#FFD115"
                            fill-rule="nonzero"
                            d="M3.5 4.5L3.5 8.561 16.25 21.311 24.811 12.75 12.061 0 3.5 0 3.5 3z"></path>
                          <path
                            fill-rule="nonzero"
                            stroke="#585858"
                            d="M1.5 5.75L1.5 8.811 14.25 21.561 22.811 13 10.061 0.25 1.5 0.25 1.5 3.25"></path>
                          <circle
                            cx="6.748"
                            cy="5.5"
                            r="1.5"
                            fill="#585858"
                            fill-rule="nonzero"></circle>
                          <path
                            stroke="#585858"
                            stroke-linecap="square"
                            d="M0.5 5.5L7.5 5.5"></path>
                        </g>
                      </g>
                    </g>
                  </svg>
                </div>
              </Col>
              <Col>
                <h6>Reputación, ventas y envíos</h6>
                <p className="mb-0 text-muted">
                  <small>
                    Reclamar por tu reputación, consultar por un envío, pago o
                    devolución.
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
                <div class="svg-to-component cx-contents-list__icon cx-contents-list__icon--top">
                  <div class="svg-to-component cx-contents-list__icon cx-contents-list__icon--top">
                    <div class="svg-to-component cx-contents-list__icon cx-contents-list__icon--top">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="23"
                        viewBox="0 0 24 23">
                        <g fill="none" fill-rule="evenodd">
                          <g>
                            <g>
                              <g>
                                <path
                                  fill="#FFD115"
                                  d="M1.571 1.571H22.523000000000003V21.476000000000003H1.571z"
                                  transform="translate(-331 -740) translate(307 583) translate(25 158)"></path>
                                <path
                                  stroke="#585858"
                                  stroke-width=".8"
                                  d="M20.952 12.48L20.952 14.143 0 14.143 0 6.81 20.952 6.81z"
                                  transform="translate(-331 -740) translate(307 583) translate(25 158)"></path>
                                <path
                                  stroke="#585858"
                                  stroke-width=".8"
                                  d="M20.952 11v9.952H0v-6.81m0-7.368V4.646M3.323 0h17.63v11"
                                  transform="translate(-331 -740) translate(307 583) translate(25 158)"></path>
                              </g>
                            </g>
                          </g>
                        </g>
                      </svg>
                    </div>
                  </div>
                </div>
              </Col>
              <Col>
                <h6>Administrar publicaciones</h6>
                <p className="mb-0 text-muted">
                  <small>
                    Mejorar la calidad, modificar, eliminar o resolver
                    problemas.
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
                <div class="svg-to-component cx-contents-list__icon cx-contents-list__icon--top">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="26"
                    height="27"
                    viewBox="0 0 26 27">
                    <g fill="none" fill-rule="evenodd">
                      <g>
                        <g>
                          <g transform="translate(-319 -443) translate(320 444)">
                            <circle
                              cx="12.157"
                              cy="12.866"
                              r="12"
                              fill="#CFB53C"
                              fill-rule="nonzero"></circle>
                            <circle
                              cx="11.491"
                              cy="12.2"
                              r="11.333"
                              fill="#FFD115"
                              fill-rule="nonzero"></circle>
                            <path
                              stroke="#585858"
                              stroke-linecap="square"
                              stroke-width=".8"
                              d="M14.087.193c-2.205-.396-4.516-.19-6.675.688M0 13.838c.212 1.592.735 3.174 1.591 4.657 1.915 3.316 5.093 5.436 8.54 6.084 2.748.516 5.666.097 8.254-1.397 1.786-1.03 3.207-2.454 4.22-4.105 1.216-1.977 1.846-4.28 1.817-6.622-.025-2.09-.574-4.21-1.7-6.16-.878-1.521-2.022-2.79-3.336-3.782-1.577-1.19-3.398-1.978-5.299-2.32"></path>
                          </g>
                          <path
                            fill="#585858"
                            fill-rule="nonzero"
                            d="M10.848 13.76c0-1.206.864-1.818 1.674-2.394.72-.504 1.386-.954 1.386-1.782 0-.792-.612-1.476-1.908-1.476-1.224 0-2.052.54-2.682 1.368L8.274 8.324c.882-1.134 2.232-1.818 3.906-1.818 2.232 0 3.582 1.224 3.582 2.808 0 1.494-1.026 2.232-1.962 2.88-.72.522-1.386.972-1.386 1.728 0 .288.18.63.432.846l-1.332.504c-.45-.432-.666-.936-.666-1.512zm.054 3.996c0-.612.504-1.116 1.116-1.116.612 0 1.134.504 1.134 1.116 0 .612-.522 1.134-1.134 1.134-.612 0-1.116-.522-1.116-1.134z"
                            transform="translate(-319 -443) translate(320 444)"></path>
                        </g>
                      </g>
                    </g>
                  </svg>
                </div>
              </Col>
              <Col>
                <h6>Preguntas frecuentes sobre ventas</h6>
                <p className="mb-0 text-muted"></p>
              </Col>
              <Col xs="auto" className="d-flex align-items-center">
                <i className="bi bi-chevron-right" />
              </Col>
            </Row>
          </CardContainer>

          <h5>Ayuda sobre tu cuenta</h5>
          <CardContainer className="bg-light mb-3 p-3">
            <Row className="align-items-center">
              <Col>
                <h6 className="mb-0">Configuración de mi cuenta</h6>
              </Col>
              <Col xs="auto">
              </Col>
              <Col xs="auto" className="d-flex align-items-center">
                <i className="bi bi-chevron-right" />
              </Col>
            </Row>
            <hr />
            <Row>
              <Col>
                <h6 className="mb-0">Seguridad y acceso a la cuenta</h6>
                <p className="mb-0 text-muted"></p>
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
