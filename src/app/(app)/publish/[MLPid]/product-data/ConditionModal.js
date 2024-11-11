import Link from 'next/link'
import {
  Modal,
  ModalBody,
  ModalHeader,
  ModalTitle,
  Table,
} from 'react-bootstrap'

export default function ConditionModal(props) {
  return (
    <Modal {...props} centered size="lg">
      <ModalHeader closeButton className="border-bottom-0 p-5 pb-0">
        <ModalTitle className="fs-5">
          ¿Cómo identificar la condición de tu producto?
        </ModalTitle>
      </ModalHeader>
      <ModalBody className="p-5 pt-4">
        <small>
          <Table bordered className="mb-4">
            <colgroup>
              <col style={{ width: '15%' }} />
              <col style={{ width: '15%' }} />
              <col style={{ width: '15%' }} />
            </colgroup>
            <thead className="table-secondary">
              <tr>
                <th className="fw-medium">Nuevos</th>
                <th className="fw-medium">Usados</th>
                <th className="fw-medium">Reacondicionados</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  <ul className="mb-0">
                    <li>Sin uso</li>
                    <li>No utilizados para exhibición</li>
                    <li>Con el empaque completo</li>
                    <li>Sin piezas modificadas y/o no originales</li>
                  </ul>
                </td>
                <td>
                  <ul className="mb-0">
                    <li>Con uso</li>
                    <li>Utilizados para exhibición</li>
                    <li>Con el empaque incompleto</li>
                    <li>Sin todos sus accesorios originales nuevos</li>
                  </ul>
                </td>
                <td>
                  <ul className="mb-0">
                    <li>Con uso</li>
                    <li>
                      Contienen piezas que fueron reemplazadas y probadas para
                      que funcione correctamente
                    </li>
                  </ul>
                </td>
              </tr>
            </tbody>
          </Table>
        </small>
        <p className="text-muted mb-0">
          <small>
            Conoce más acerca de la condición de los productos que vendes.
            <Link
              href="#"
              className="ms-1 link-underline link-underline-opacity-0 link-underline-opacity-100-hover">
              Revisar política.
            </Link>
          </small>
        </p>
      </ModalBody>
    </Modal>
  )
}
