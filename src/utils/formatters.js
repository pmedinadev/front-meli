/**
 * Formatea un precio separando la parte entera de los decimales
 * @param {number} price - Precio a formatear
 * @returns {Object} Objeto con la parte entera formateada con comas y decimales
 */
export const formatPrice = price => {
  const [whole, decimal] = parseFloat(price).toFixed(2).split('.')
  const formattedWhole = whole.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
  return { whole: formattedWhole, decimal: decimal === '00' ? null : decimal }
}

/**
 * Formatea un precio como string incluyendo decimales si existen
 * @param {number} price - Precio a formatear
 * @returns {string} Precio formateado (ej: "1,234.56" o "1,234")
 */
export const formatPriceWithDecimals = price => {
  const { whole, decimal } = formatPrice(price)
  return decimal ? `${whole}.${decimal}` : whole
}
