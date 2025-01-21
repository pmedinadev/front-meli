export const FREE_SHIPPING_THRESHOLD = 299

export const calculateSellerShipping = products => {
  const allFreeShipping = products.every(
    p => p.shipping_type === 'paid_by_seller',
  )

  const totalPrice = products.reduce(
    (sum, p) => sum + parseFloat(p.price) * p.quantity,
    0,
  )

  const totalShippingCost = products.reduce(
    (sum, p) =>
      sum + (p.shipping_type === 'paid_by_buyer' ? p.shipping_cost : 0),
    0,
  )

  // Si todos los productos tienen envío gratis o el total supera los $299
  if (allFreeShipping || totalPrice >= FREE_SHIPPING_THRESHOLD) {
    return {
      isFreeShipping: true,
      progress: 100,
      missingAmount: 0,
      shippingCost: 0,
    }
  }

  // Calcula el progreso hacia el envío gratis y el monto faltante
  const progress = (totalPrice / FREE_SHIPPING_THRESHOLD) * 100
  const missingAmount = FREE_SHIPPING_THRESHOLD - totalPrice

  return {
    isFreeShipping: false,
    progress: Math.min(progress, 100),
    missingAmount,
    shippingCost: totalShippingCost,
  }
}

export const calculateSelectedShipping = (groupedItems, selectedSellers) => {
  const selectedShippingData = Object.entries(groupedItems)
    .filter(([sellerId]) => selectedSellers.includes(parseInt(sellerId)))
    .map(([, { products }]) => calculateSellerShipping(products))

  const totalShippingCost = selectedShippingData.reduce(
    (sum, data) => sum + data.shippingCost,
    0,
  )

  const allFreeShipping = selectedShippingData.every(
    data => data.isFreeShipping,
  )

  return {
    count: selectedShippingData.length,
    cost: totalShippingCost,
    allFree: allFreeShipping,
  }
}

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
