import {
  FEE_CONSTANTS,
  FEE_MESSAGES,
  SHIPPING_COSTS,
  TAX_RATES,
} from '@/constants/fees'

/**
 * Calcula el cargo por venta basado en el precio y tipo de publicación
 * Incluye porcentaje sobre el precio + cargo fijo según el rango de precios
 * @param {number} price - Precio del producto
 * @param {number} percentage - Porcentaje de cargo según el tipo de publicación	
 * @param {string} publicationType - Tipo de publicación ('free', 'classic', 'premium')
 * @returns {number} Cargo total (limitado a MAX_FEE)
 */
export const calculateFee = (price, percentage, publicationType) => {
  // Si el precio es 0 o la publicación es gratuita, no hay cargo
  if (!price || publicationType === 'free') return 0

  const percentageFee = (price * percentage) / 100

  let fixedFee = 0
  if (price < FEE_CONSTANTS.THRESHOLDS.LOW) {
    fixedFee = FEE_CONSTANTS.FIXED_FEES.UNDER_149
  } else if (price < FEE_CONSTANTS.THRESHOLDS.HIGH) {
    fixedFee = FEE_CONSTANTS.FIXED_FEES.BETWEEN_149_299
  }

  // Limitar el cargo total al máximo permitido
  return Math.min(percentageFee + fixedFee, FEE_CONSTANTS.MAX_FEE)
}

/**
 * Calcula el costo de envío según condición y precio del producto
 * @param {number} price - Precio del producto
 * @param {string} condition - Condición del producto ('new', 'used')
 * @param {string} publicationType - Tipo de publicación ('free', 'classic', 'premium')
 * @returns {Object} Objeto con el costo real y el costo a mostrar al vendedor
 */
export const calculateShipping = (price, condition, publicationType) => {
  if (!price) return { cost: 0, displayCost: 0 }

  const shippingCost =
    condition === 'used' || publicationType === 'free'
      ? SHIPPING_COSTS.USED_OR_FREE
      : price >= FEE_CONSTANTS.THRESHOLDS.HIGH
        ? SHIPPING_COSTS.NEW_OVER_299
        : SHIPPING_COSTS.NEW_UNDER_299

  return {
    cost: shippingCost, // Costo real
    displayCost: shippingCost > price ? 0 : shippingCost, // Costo a mostrar al vendedor
  }
}

/**
 * Calcula impuestos a pagar (IVA + ISR) sobre el precio del producto
 * @param {number} price - Precio del producto
 * @returns {number} Impuestos a pagar (IVA + ISR)
 */
export const calculateTaxes = price => {
  if (!price) return 0
  return price * (TAX_RATES.IVA + TAX_RATES.ISR)
}

/**
 * Genera mensaje explicativo para el popover de cargos
 * @param {Object} type - Tipo de publicación con sus propiedades
 * @param {number} price - Precio del producto
 * @returns {string} Mensaje formateado según el rango de precio
 */
export const getPopoverMessage = (type, price) => {
  if (price < FEE_CONSTANTS.THRESHOLDS.LOW) {
    return FEE_MESSAGES.UNDER_149(
      type.feePercentage,
      FEE_CONSTANTS.FIXED_FEES.UNDER_149,
      FEE_CONSTANTS.THRESHOLDS.LOW,
    )
  }

  if (price <= FEE_CONSTANTS.THRESHOLDS.HIGH) {
    return FEE_MESSAGES.BETWEEN_149_299(
      type.feePercentage,
      FEE_CONSTANTS.FIXED_FEES.BETWEEN_149_299,
      FEE_CONSTANTS.THRESHOLDS.LOW,
      FEE_CONSTANTS.THRESHOLDS.HIGH,
    )
  }

  return FEE_MESSAGES.DEFAULT(type.feePercentage)
}
