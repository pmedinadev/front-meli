import axios from '@/lib/axios'
import { useState } from 'react'

export const useCart = () => {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const addToCart = async (cartId, productId, quantity) => {
    setLoading(true)
    setError(null)
    try {
      const response = await axios.post('/api/cartproducts', {
        cart_id: cartId,
        product_id: productId,
        quantity,
      })
      window.dispatchEvent(new Event('cartUpdate'))
      return response.data.cartproduct
    } catch (error) {
      setError(error.response?.data?.error || error.message)
      throw error
    } finally {
      setLoading(false)
    }
  }

  const getCartProducts = async cartId => {
    setLoading(true)
    setError(null)
    try {
      const response = await axios.get(`/api/carts/${cartId}`)
      return response.data.cart.products
    } catch (error) {
      setError(error.response?.data || error.message)
      throw error
    } finally {
      setLoading(false)
    }
  }

  const updateQuantity = async (cartProductId, quantity) => {
    setLoading(true)
    setError(null)
    try {
      const response = await axios.patch(`/api/cartproducts/${cartProductId}`, {
        quantity,
      })
      window.dispatchEvent(new Event('cartUpdate'))
      return response.data.cartproduct
    } catch (error) {
      setError(error.response?.data?.error || error.message)
      throw error
    } finally {
      setLoading(false)
    }
  }

  const removeFromCart = async cartProductId => {
    setLoading(true)
    setError(null)
    try {
      await axios.delete(`/api/cartproducts/${cartProductId}`)
      window.dispatchEvent(new Event('cartUpdate'))
      return true
    } catch (error) {
      setError(error.response?.data?.error || error.message)
      throw error
    } finally {
      setLoading(false)
    }
  }

  return {
    addToCart,
    getCartProducts,
    updateQuantity,
    removeFromCart,
    loading,
    error,
  }
}
