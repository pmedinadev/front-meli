/**
 * Constantes para cálculo de cargos y comisiones
 * FEE_CONSTANTS: Rangos y cargos fijos por venta
 * SHIPPING_COSTS: Costos de envío según condición y precio
 * TAX_RATES: Porcentajes de impuestos aplicables
 * FEE_MESSAGES: Mensajes explicativos para el popover de cargos
 */
export const FEE_CONSTANTS = {
  MAX_FEE: 283350, // Cargo máximo permitido ($ 283,350)
  THRESHOLDS: {
    LOW: 149, // Rango bajo para cargos ($ 149)
    HIGH: 299, // Rango alto para cargos ($ 299)
  },
  FIXED_FEES: {
    UNDER_149: 28, // Cargo fijo para productos bajo $ 149 ($ 28)
    BETWEEN_149_299: 33, // Cargo fijo para productos entre $ 149 y $ 299 ($ 33)
  },
}

export const SHIPPING_COSTS = {
  USED_OR_FREE: 159, // Costo de envío para productos usados o publicaciones gratuitas
  NEW_UNDER_299: 127.2, // Costo de envío para productos nuevos bajo $ 299 ($ 127.20)
  NEW_OVER_299: 95.4, // Costo de envío para productos nuevos sobre $ 299 ($ 95.40)
}

export const TAX_RATES = {
  IVA: 0.16, // Porcentaje de IVA: 16%
  ISR: 0.2, // Porcentaje de ISR: 20%
}

export const FEE_MESSAGES = {
  UNDER_149: (percentage, fee, threshold) =>
    `Pagarás el ${percentage}% del total de la venta más $ ${fee} por unidad vendida porque tu producto cuesta menos de $ ${threshold}.`,
  BETWEEN_149_299: (percentage, fee, low, high) =>
    `Pagarás el ${percentage}% del total de la venta más $ ${fee} por unidad vendida porque tu producto cuesta entre $ ${low} y $ ${high}.`,
  DEFAULT: percentage => `Pagarás el ${percentage}% del total de la venta.`,
}
