import React, { memo } from 'react'
import PropTypes from 'prop-types'
import {
  Col,
  Modal,
  ModalBody,
  ModalHeader,
  ModalTitle,
  Row,
} from 'react-bootstrap'
import ModalImage1 from './ModalImage1'
import ModalImage2 from './ModalImage2'
import ModalImage3 from './ModalImage3'

// Imágenes y textos para el modal
const MODAL_CONTENTS = [
  {
    image: <ModalImage1 />,
    title: 'Envío simple y monitoreado',
    description:
      'Imprime la etiqueta de envío, pégala en tu paquete y llévalo al punto de despacho más cercano. Podrás seguir el envío.',
  },
  {
    image: <ModalImage2 />,
    title: 'Envíos gratis a un menor costo',
    description:
      'Los envíos gratis mejoran tu exposición. Según tu reputación, puedes obtener reintegros exclusivos en los costos de tus envíos.',
  },
  {
    image: <ModalImage3 />,
    title: 'Cobra más rápido y sin imprevistos',
    description:
      'Tendrás tu dinero disponible en un máximo de 2 días desde la entrega del producto. Si hay algún imprevisto, te cubrimos. Tus paquetes están asegurados.',
  },
]

/**
 * Componente reutilizable para mostrar contenido en el modal
 * @param {Object} props - Propiedades del componente
 * @param {ReactNode} props.image - Componente de imagen
 * @param {string} props.title - Título del contenido
 * @param {string} props.description - Descripción del contenido
 */
const ModalContent = memo(({ image, title, description }) => (
  <Col className="d-flex flex-column align-items-center">
    {image}
    <small className="text-center">
      <span className="fw-medium">{title}</span>
      <p className="mb-0">{description}</p>
    </small>
  </Col>
))

ModalContent.displayName = 'ModalContent'

ModalContent.propTypes = {
  image: PropTypes.node.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
}

export default function ShippingModal(props) {
  return (
    <Modal {...props} size="lg" centered>
      <ModalHeader closeButton className="border-bottom-0 p-4 pb-0">
        <ModalTitle className="fs-5 w-100 text-center">
          Nos envías tus productos y nosotros los despachamos
        </ModalTitle>
      </ModalHeader>
      <ModalBody className="p-4">
        <Row className="g-1">
          {MODAL_CONTENTS.map((content, index) => (
            <ModalContent
              key={index}
              image={content.image}
              title={content.title}
              description={content.description}
            />
          ))}
        </Row>
      </ModalBody>
    </Modal>
  )
}

ShippingModal.propTypes = {
  show: PropTypes.bool.isRequired,
  onHide: PropTypes.func.isRequired,
}
