import React from 'react';
import { Container, Row, Col, Accordion, AccordionItem, AccordionBody, AccordionHeader } from 'react-bootstrap';

export default function Footer() {
  const styles = {
    bodyWrapper: {
      display: 'flex',
      flexDirection: 'column',
      minHeight: '100vh',
    },
    mainContent: {
      flex: 1,
    },
    footer: {
      backgroundColor: 'white',
      color: 'black',
      padding: '20px 0',
    },
  };

  return (
    <div style={styles.bodyWrapper}>
      <main style={styles.mainContent}>
       
      </main>
    <footer style={styles.footer} className=" bg-white text-black">
      <Container>
        <Accordion>
          <AccordionItem eventKey="0">
            <AccordionHeader>Mas informacion</AccordionHeader>
            <AccordionBody className='p-0'>
              <Row>
                <Col md={2} sm={6} className="mb-4">
                  <h6>Acerca de</h6>
                  <ul className="list-unstyled">
                    <li><a href="#" className="text-muted text-decoration-none">Mercado Libre</a></li>
                    <li><a href="#" className="text-muted text-decoration-none">Investor Relations</a></li>
                    <li><a href="#" className="text-muted text-decoration-none">Tendencias</a></li>
                    <li><a href="#" className="text-muted text-decoration-none">Sustentabilidad</a></li>
                    <li><a href="#" className="text-muted text-decoration-none">Blog</a></li>
                  </ul>
                </Col>
                <Col md={2} sm={6} className="mb-4">
                  <h6>Otros sitios</h6>
                  <ul className="list-unstyled">
                    <li><a href="#" className="text-muted text-decoration-none">Developers</a></li>
                    <li><a href="#" className="text-muted text-decoration-none">Mercado Pago</a></li>
                    <li><a href="#" className="text-muted text-decoration-none">Mercado Shops</a></li>
                    <li><a href="#" className="text-muted text-decoration-none">Envios</a></li>
                    <li><a href="#" className="text-muted text-decoration-none">Mercado Ads</a></li>
                  </ul>
                </Col>
                <Col md={2} sm={6} className="mb-4">
                  <h6>Ayuda</h6>
                  <ul className="list-unstyled">
                    <li><a href="#" className="text-muted text-decoration-none">Comprar</a></li>
                    <li><a href="#" className="text-muted text-decoration-none">Vender</a></li>
                    <li><a href="#" className="text-muted text-decoration-none">Resolución de problemas</a></li>
                    <li><a href="#" className="text-muted text-decoration-none">Centro de seguridad</a></li>
                  </ul>
                </Col>
                <Col md={2} sm={6} className="mb-4">
                  <h6>Redes Sociales</h6>
                  <ul className="list-unstyled">
                    <li><a href="https://x.com/ML_Mexico" className="text-muted text-decoration-none">X</a></li>
                    <li><a href="https://www.facebook.com/mex.mercadolibre/?brand_redir=23221995011" className="text-muted text-decoration-none">Facebook</a></li>
                    <li><a href="https://www.youtube.com/user/mercadolibre" className="text-muted text-decoration-none">YouTube</a></li>
                  </ul>
                </Col>
                <Col md={2} sm={6} className="mb-4">
                  <h6>Mi cuenta</h6>
                  <ul className="list-unstyled">
                    <li><a href="#" className="text-muted text-decoration-none">Resumen</a></li>
                    <li><a href="#" className="text-muted text-decoration-none">Favoritos</a></li>
                    <li><a href="#" className="text-muted text-decoration-none">Vender</a></li>
                  </ul>
                </Col>
                <Col md={2} sm={6} className="mb-4">
                  <h6>Suscripciones</h6>
                  <ul className="list-unstyled">
                    <li><a href="#" className="text-muted text-decoration-none">Meli+</a></li>
                    <li><a href="#" className="text-muted text-decoration-none">Disney+</a></li>
                    <li><a href="#" className="text-muted text-decoration-none">Deezer Premium</a></li>
                    <li><a href="#" className="text-muted text-decoration-none">Max</a></li>
                    <li><a href="#" className="text-muted text-decoration-none">Paramount+</a></li>
                    <li><a href="#" className="text-muted text-decoration-none">ViX Premium</a></li>
                  </ul>
                </Col>
              </Row>
             
            </AccordionBody>
          </AccordionItem>
        </Accordion>

       <Container id="" className="p-0 container-ml">
              <Row className="justify-content-center text-nowrap">
                <Col className="list-unstyled mb-2 text-center mx-1 p-0 m-0">
                  <li><a href="#" className="text-black text-decoration-none d-inline-block small">Trabaja con nosotros</a></li>
                </Col>
                <Col className="list-unstyled mb-2 text-center mx-1 p-0">
                  <li><a href="#" className="text-black text-decoration-none d-inline-block small">Términos y condiciones</a></li>
                </Col>
                <Col className="list-unstyled mb-2 text-center mx-1 p-0">
                  <li><a href="#" className="text-black text-decoration-none d-inline-block small">Promociones</a></li>
                </Col>
                <Col className="list-unstyled mb-2 text-center mx-1 p-0">
                  <li><a href="#" className="text-black text-decoration-none d-inline-block small">Cómo cuidamos tu privacidad</a></li>
                </Col>
                <Col xs={6} sm={4} md={1} className="list-unstyled mb-2 text-center mx-1 p-0">
                  <li><a href="#" className="text-black text-decoration-none d-inline-block small">Accesibilidad</a></li>
                </Col>
                <Col xs={6} sm={4} md={1} className="list-unstyled mb-1 text-center mx-1 p-0">
                  <li><a href="http://localhost:3000/help" className="text-black text-decoration-none d-inline-block small">Ayuda</a></li>
                </Col>
                <Col xs={6} sm={4} md={1} className="list-unstyled mb-1 text-center mx-1 p-0">
                  <li><a href="#" className="text-black text-decoration-none d-inline-block small">Hot Sale</a></li>
                </Col>
                <Col xs={6} sm={4} md={1} className="list-unstyled mb-1 text-center mx-1 p-0">
                  <li><a href="#" className="text-black text-decoration-none d-inline-block small">Programa de Afiliados</a></li>
                </Col>
              </Row>
      </Container>
        <small className="small-text mt-4 text-muted">
          <p className=' small-text m-0'>Copyright © 1999-2024 El presente canal de instrucción o ambiente, es operado por DeRemate.Com de México, S. de R.L. de C.V. identificada bajo la marca comercial "Mercado Libre".
          Blvd. Miguel de Cervantes Saavedra 161, Pisos 14 y 15, Granada, Miguel Hidalgo, 11520 Ciudad de México, CDMX, México</p>
        </small>
      </Container>
    </footer>
    </div>
  );
}
