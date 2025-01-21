/**
 * Definición de tipos de publicación disponibles
 * Cada tipo incluye:
 * - value: Identificador único
 * - text: Nombre mostrado al usuario
 * - feePercentage: Porcentaje de cargo por venta
 * - features: Lista de características incluidas
 */
export const PUBLICATION_TYPES = {
  FREE: {
    value: 'free',
    text: 'Gratuita',
    feePercentage: 0,
    features: ['Exposición baja', 'Duración de 60 días'],
  },
  CLASSIC: {
    value: 'classic',
    text: 'Clásica',
    feePercentage: 15,
    features: ['Exposición alta', 'Duración ilimitada', 'Ofreces envío gratis'],
  },
  PREMIUM: {
    value: 'premium',
    text: 'Premium',
    feePercentage: 19.5,
    features: [
      'Exposición en la página de inicio',
      'Duración ilimitada',
      'Ofreces envío gratis y descuentos',
    ],
  },
}

/**
 * Tipos de duración disponibles para garantías
 * Usado en el formulario de condiciones de venta
 */
export const WARRANTY_DURATION_TYPES = [
  { value: 'days', label: 'Días' },
  { value: 'months', label: 'Meses' },
  { value: 'years', label: 'Años' },
]
