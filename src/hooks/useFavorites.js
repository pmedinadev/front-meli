import axios from '@/lib/axios'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

export const useFavorites = favoriteId => {
  const queryClient = useQueryClient()

  // Función para verificar si un producto está en favoritos
  const isInFavorites = useQuery({
    queryKey: ['product-in-favorites', favoriteId],
    queryFn: async () => {
      const { data } = await axios.get(`/api/favorites/${favoriteId}`)
      return data.favorite.products
    },
    enabled: !!favoriteId,
  })

  // Función para agregar un producto a favoritos
  const addFavorite = useMutation({
    mutationFn: async ({ favoriteId, productId }) => {
      const { data } = await axios.post('/api/favoriteproducts', {
        favorite_id: favoriteId,
        product_id: productId,
      })
      return data
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['favorites', favoriteId] })
    },
  })

  // Función para mostrar productos de favoritos
  const getFavoriteProducts = useQuery({
    queryKey: ['favorites', favoriteId],
    queryFn: async () => {
      const { data } = await axios.get(`/api/favorites/${favoriteId}`)
      return data.favorite.products
    },
    enabled: !!favoriteId,
  })

  // Función para eliminar un producto de favoritos
  const removeFavorite = useMutation({
    mutationFn: async favoriteProductId => {
      const { data } = await axios.delete(
        `/api/favoriteproducts/${favoriteProductId}`,
      )
      return data
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['favorites', favoriteId] })
    },
  })

  return {
    isInFavorites,
    checkIfFavorite: productId => {
      return isInFavorites.data?.some(product => product.id === productId)
    },
    addFavorite,
    getFavoriteProducts,
    removeFavorite,
    isInitialLoading: getFavoriteProducts.isLoading,
    isLoading: addFavorite.isPending || removeFavorite.isPending,
    error:
      getFavoriteProducts.error || addFavorite.error || removeFavorite.error,
  }
}
