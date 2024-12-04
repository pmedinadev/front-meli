/**
 * Determina quién pagará el envío basado en las condiciones del producto
 * @param {number} shippingCost - Costo del envío
 * @param {number} price - Precio del producto
 * @param {string} publicationType - Tipo de publicación ('free', 'classic', 'premium')
 * @param {string} selectedShipping - Opción de envío seleccionada ('free', 'paid')
 * @returns {string} Tipo de envío ('paid_by_buyer' o 'paid_by_seller')
 */
export const determineShippingType = (
  shippingCost,
  price,
  publicationType,
  selectedShipping,
) => {
  // Si el costo del envío supera el precio del producto
  if (shippingCost > price) {
    return 'paid_by_buyer'
  }

  // Si la publicación es gratuita y el envío lo paga el comprador
  if (publicationType === 'free' && selectedShipping === 'paid') {
    return 'paid_by_buyer'
  }

  // Si la publicación es gratuita con envío gratis o clásica/premium
  return 'paid_by_seller'
}
