// constants/pricing.js
export const PUBLICATION_TYPES = {
  GRATUITA: {
    value: 'free',
    feePercentage: 0,
    features: ['Exposición baja', 'Duración de 60 días'],
  },
  CLÁSICA: {
    value: 'classic',
    feePercentage: 15,
    features: ['Exposición baja', 'Duración ilimitada', 'Ofreces envío gratis'],
  },
  PREMIUM: {
    value: 'premium',
    feePercentage: 19.5,
    features: [
      'Exposición en la página de inicio',
      'Duración ilimitada',
      'Ofreces envío gratis y descuentos',
    ],
  },
}

export const WARRANTY_DURATION_TYPES = [
  { value: 'days', label: 'Días' },
  { value: 'months', label: 'Meses' },
  { value: 'years', label: 'Años' },
]
