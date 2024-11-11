import { CldImage } from 'next-cloudinary'
import { Modal, ModalBody, ModalHeader, ModalTitle } from 'react-bootstrap'

export default function TitleModal(props) {
  return (
    <Modal {...props} size="lg" centered>
      <ModalHeader closeButton className="border-bottom-0 p-4 pb-0">
        <ModalTitle className="fs-5 w-100 text-center">
          Crea títulos simples, claros y descriptivos
        </ModalTitle>
      </ModalHeader>
      <ModalBody className="p-4">
        <div className="text-center">
          <CldImage
            src="products/rbililseko62ewc7mdgc"
            width="751"
            height="184"
            sizes="100vw"
          />
        </div>
        <div className="px-4">
          <small>
            <p>
              <i className="bi bi-check me-2 text-primary fs-6" />
              Incluye producto, marca, modelo y algunas especificaciones del
              producto.
            </p>
            <p>
              <i className="bi bi-check me-2 text-primary fs-6" />
              Asegúrate de no repetir información que ya aparecerá en tu
              publicación como su condición, la forma de pago o el tipo de
              envío.
            </p>
            <p className="mb-0">
              <i className="bi bi-check me-2 text-primary fs-6" />
              Usa variantes si vendes productos similares. Si la categoría de tu
              producto no tiene variantes, incluye información en el título que
              ayude a tus compradores a diferenciarlos.
            </p>
          </small>
        </div>
      </ModalBody>
    </Modal>
  )
}
