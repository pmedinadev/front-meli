// Importar componentes UI
import { Button, Col, Row, Spinner } from 'react-bootstrap'
import { CldImage } from 'next-cloudinary'
import Link from 'next/link'

// Importar hooks
import { useState } from 'react'

// Importar formateador de precios
import { formatPrice } from '@/utils/formatters'

import PropTypes from 'prop-types'
import QuantityControl from './QuantityControl'

// Constante para definir la cantidad máxima de productos
const MAX_ITEMS_PER_PRODUCT = 6

/**
 * CartItem - Componente que representa un producto en el carrito de compras
 * @param {Object} item - Datos del producto
 * @param {Function} onUpdateQuantity - Función para actualizar la cantidad del producto
 * @param {Function} onRemove - Función para eliminar el producto del carrito
 */
export default function CartItem({
  item: product,
  onUpdateQuantity: onQuantityChange,
  onRemove: onProductRemove,
}) {
  // Estados locales
  const [isUpdating, setIsUpdating] = useState(false) // Estado para indicar si se está actualizando la cantidad
  const [isDeleting, setIsDeleting] = useState(false) // Estado para indicar si se está eliminando el producto

  // Formatear el precio del producto
  const formattedPrice = formatPrice(product.price)

  // Manejador de eventos para actualizar la cantidad del producto
  const handleQuantityUpdate = async newQuantity => {
    if (newQuantity < 1 || newQuantity > MAX_ITEMS_PER_PRODUCT) return

    setIsUpdating(true)
    await onQuantityChange(product.cart_product_id, newQuantity)
    setIsUpdating(false)
  }

  // Manejador de eventos para eliminar el producto del carrito
  const handleProductRemove = async () => {
    setIsDeleting(true)
    await onProductRemove(product.cart_product_id)
    setIsDeleting(false)
  }

  return (
    <article className="p-3 border-bottom">
      {/* Estado de eliminación - Mostrar spinner si se está eliminando el producto */}
      {isDeleting ? (
        <div className="d-flex justify-content-center align-items-center p-2">
          <Spinner animation="border" className="text-primary" />
        </div>
      ) : (
        <Row className="align-items-center">
          {/* Imagen del producto */}
          <Col xs="auto">
            <Link href={`/p/MLP${product.id}`}>
              <CldImage
                src={product.photos?.[0]?.public_id || 'users/placeholder'}
                width={64}
                height={64}
                crop="fill"
                alt={product.title}
              />
            </Link>
          </Col>

          {/* Título y acciones */}
          <Col xs={6}>
            <Link
              href={`/p/MLP${product.id}`}
              className="link-dark text-decoration-none text-truncate">
              <h6 className="mb-1 text-truncate">{product.title}</h6>
            </Link>
            <div className="d-flex gap-3">
              <Button
                variant="link"
                size="sm"
                className="fw-medium text-primary text-decoration-none p-0"
                onClick={handleProductRemove}
                disabled={isUpdating || isDeleting}>
                Eliminar
              </Button>
              <Button
                variant="link"
                size="sm"
                className="fw-medium text-primary text-decoration-none p-0"
                disabled={isUpdating || isDeleting}>
                Comprar ahora
              </Button>
            </div>
          </Col>

          {/* Control de cantidad */}
          <Col xs="auto">
            <QuantityControl
              quantity={product.quantity}
              onUpdate={handleQuantityUpdate}
              isUpdating={isUpdating}
              stock={product.stock}
            />

            {/* Stock disponible */}
            <div className="text-center text-muted">
              {product.stock === 1 ? (
                <span>
                  <small>¡Última disponible!</small>
                </span>
              ) : (
                <span>
                  <small>{product.stock} disponibles</small>
                </span>
              )}
            </div>
          </Col>

          {/* Precio */}
          <Col className="text-end">
            <span className="mb-0 fs-5">
              $ {formattedPrice.whole}
              {formattedPrice.decimal && (
                <sup style={{ fontSize: '12px' }}>{formattedPrice.decimal}</sup>
              )}
            </span>
          </Col>
        </Row>
      )}
    </article>
  )
}

CartItem.propTypes = {
  item: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    quantity: PropTypes.number.isRequired,
    stock: PropTypes.number.isRequired,
    photos: PropTypes.arrayOf(
      PropTypes.shape({
        public_id: PropTypes.string,
      }),
    ),
    cart_product_id: PropTypes.number.isRequired,
  }).isRequired,
  onUpdateQuantity: PropTypes.func.isRequired,
  onRemove: PropTypes.func.isRequired,
}
