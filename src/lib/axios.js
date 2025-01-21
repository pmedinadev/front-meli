import Axios from 'axios'

/**
 * Configuración personalizada de Axios para peticiones al backend
 * - Incluye URL base desde variables de entorno
 * - Configura headers para AJAX
 * - Habilita credenciales y tokens CSRF
 */
const axios = Axios.create({
  baseURL: process.env.NEXT_PUBLIC_BACKEND_URL,
  headers: {
    'X-Requested-With': 'XMLHttpRequest', // Identifica peticiones AJAX
  },
  withCredentials: true, // Permite envío de cookies cross-origin
  withXSRFToken: true, // Habilita protección CSRF
})

export default axios
