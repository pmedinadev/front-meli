import { useState } from 'react'
import axios from '@/lib/axios'

export const useFavorites = () => {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  // Función para agregar un producto a favoritos
  const addFavorite = async (favoriteId, productId) => {
    setLoading(true)
    setError(null)

    try {
      const response = await axios.post(`/api/favoriteproducts`, {
        favorite_id: favoriteId,
        product_id: productId,
      })

      if (response.status === 201) {
        console.log(
          'Producto agregado a favoritos:',
          response.data.favoriteproducts,
        )
        return response.data.favoriteproducts // Devuelve el producto favorito agregado
      } else {
        throw new Error('Error al agregar el producto a favoritos')
      }
    } catch (error) {
      setError(
        error.response ? error.response.data.error : 'Internal Server Error',
      )
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  // Función para mostrar productos de favoritos
  const getFavoriteProducts = async favoriteId => {
    setLoading(true);
    setError(null);

    try {
      const response = await axios.get(`/api/favorites/${favoriteId}`);

      if (response.status === 200) {
        console.log('Productos favoritos obtenidos:', response.data.favoriteproducts);
        return response.data.favorite.products; // Devuelve la lista de productos favoritos
      } else {
        throw new Error('Error al obtener los productos favoritos');
      }
    } catch (error) {
      setError(
        error.response ? error.response.data.error : 'Internal Server Error',
      );
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  // Función para eliminar un producto de favoritos
  const removeFavorite = async favoriteId => {
    setLoading(true)
    setError(null)

    try {
      const response = await axios.delete(`/api/favoriteproducts/${favoriteId}`)

      if (response.status === 200) {
        console.log('Producto eliminado de favoritos:', response.data)
        return response.data.message // Mensaje de éxito
      } else {
        throw new Error('Error al eliminar el producto de favoritos')
      }
    } catch (error) {
      setError(
        error.response ? error.response.data.error : 'Internal Server Error',
      )
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  return {
    loading,
    error,
    addFavorite,
    getFavoriteProducts,
    removeFavorite,
  }
}
