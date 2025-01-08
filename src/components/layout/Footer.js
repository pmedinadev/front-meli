'use client'

import { Collapse, Container } from 'react-bootstrap'
import { useState } from 'react'

const FOOTER_SECTIONS = [
  {
    title: 'Acerca de',
    links: [
      'Mercado Libre',
      'Investor relations',
      'Tendencias',
      'Sustentabilidad',
      'Blog',
    ],
  },
  {
    title: 'Otros sitios',
    links: [
      'Developers',
      'Mercado Pago',
      'Mercado Shops',
      'Envíos',
      'Mercado Ads',
    ],
  },
  {
    title: 'Ayuda',
    links: [
      'Comprar',
      'Vender',
      'Resolución de problemas',
      'Centro de seguridad',
    ],
  },
  {
    title: 'Redes sociales',
    links: ['X', 'Facebook', 'YouTube'],
  },
  {
    title: 'Mi cuenta',
    links: ['Resumen', 'Favoritos', 'Vender'],
  },
  {
    title: 'Suscripciones',
    links: [
      'Meli+',
      'Disney+',
      'Deezer Premium',
      'Max',
      'Paramount+',
      'VIX Premium',
    ],
  },
  {
    title: 'Temporadas',
    links: ['Buen Fin', 'Hot Sale', 'Black Friday'],
  },
]

const FooterColumn = ({ title, links }) => (
  <div className="d-flex flex-column">
    <span className="text-body fw-medium mb-3">{title}</span>
    {links.map((link, index) => (
      <span key={index}>{link}</span>
    ))}
  </div>
)

const BUTTON_STYLES = {
  fontSize: '13px',
  color: '#666666',
}

const CONTENT_STYLES = {
  fontSize: '14px',
  color: '#999999',
}

export default function Footer() {
  const [isOpen, setIsOpen] = useState(false)

  const handleEntered = () => {
    window.scrollTo({
      top: document.documentElement.scrollHeight,
      behavior: 'smooth',
    })
  }

  return (
    <footer>
      <div className="text-center">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className={`btn rounded-bottom-0 bg-${isOpen ? 'disabled-meli' : 'body'}`}
          style={BUTTON_STYLES}
          aria-expanded={isOpen}>
          Más información
          <i className={`bi bi-chevron-${isOpen ? 'down' : 'up'} ms-1`} />
        </button>
      </div>

      <Collapse in={isOpen} onEntered={handleEntered}>
        <div>
          <div
            className="d-flex gap-5 justify-content-center bg-disabled-meli py-5"
            style={CONTENT_STYLES}>
            {FOOTER_SECTIONS.map((section, index) => (
              <FooterColumn key={index} {...section} />
            ))}
          </div>
        </div>
      </Collapse>

      <div className="bg-body py-3 border-top">
        <Container>
          <div className="d-flex gap-3 pb-2" style={{ fontSize: '13px' }}>
            <span>Trabaja con nosotros</span>
            <span>Términos y condiciones</span>
            <span>Promociones</span>
            <span>Cómo cuidamos tu privacidad</span>
            <span>Accesibilidad</span>
            <span>Ayuda</span>
            <span>Hot Sale</span>
            <span>Programa de Afiliados</span>
          </div>
          <div style={{ fontSize: '12px' }}>
            <span className="d-block" style={{ color: '#999999' }}>
              Copyright © 1999-2025 El presente canal de instrucción o
              ambiente, es operado por DeRemate.Com de México, S. de R.L. de
              C.V. identificada bajo la marca comercial "Mercado Libre".
            </span>
            <span className="d-block">
              Blvd. Miguel de Cervantes Saavedra 161, Pisos 14 y 15, Granada,
              Miguel Hidalgo, 11520 Ciudad de México, CDMX, México
            </span>
          </div>
        </Container>
      </div>
    </footer>
  )
}
