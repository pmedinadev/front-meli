import { useQuery } from '@tanstack/react-query'
import axios from '@/lib/axios'

/**
 * Hook personalizado para gestionar categorías.
 * Proporciona:
 * - Listado de categorías con caché
 * - Estado de carga y errores
 * - Función para obtener categoría por slug
 */
export const useCategories = () => {
  // Query principal para obtener todas las categorías
  const {
    data: categories,
    isLoading: loading,
    error,
  } = useQuery({
    queryKey: ['categories'], // Clave única para identificar esta query
    queryFn: async () => {
      const response = await axios.get('/api/categories')
      return response.data.categories
    },
  })

  /**
   * Hook para obtener una categoría específica por slug
   * @param {string} slug - Identificador URL-friendly de la categoría
   */
  const useCategory = slug => {
    return useQuery({
      queryKey: ['category', slug],
      queryFn: async () => {
        const response = await axios.get(`/api/categories/slug/${slug}`)
        return response.data.category
      },
      enabled: !!slug, // Solo ejecuta si hay slug
    })
  }

  return {
    categories,
    loading,
    error: error?.message,
    useCategory,
  }
}
