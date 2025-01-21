import axios from '@/lib/axios'
import { useState } from 'react'

export const useProducts = () => {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const getDraftProducts = async userId => {
    setLoading(true)
    setError(null)
    try {
      const response = await axios.get(
        `/api/products?status=draft&user_id=${userId}`,
      )
      setLoading(false)
      return response.data.products
    } catch (error) {
      setError(error.response ? error.response.data : error.message)
      setLoading(false)
    }
  }

  const createProduct = async productData => {
    setLoading(true)
    setError(null)
    try {
      const response = await axios.post('/api/products', productData)
      setLoading(false)
      return response.data.product.id
    } catch (error) {
      setError(error.response ? error.response.data : error.message)
      setLoading(false)
    }
  }

  const updateProduct = async (id, productData) => {
    setLoading(true)
    setError(null)
    try {
      const response = await axios.patch(`/api/products/${id}`, productData)
      setLoading(false)
      return response.data.product
    } catch (error) {
      setError(error.response ? error.response.data : error.message)
      setLoading(false)
    }
  }

  const getProduct = async id => {
    setLoading(true)
    setError(null)
    try {
      const response = await axios.get(`/api/products/${id}`)
      setLoading(false)
      return response.data.product
    } catch (error) {
      setError(error.response ? error.response.data : error.message)
      setLoading(false)
    }
  }

  const getProductsByCategory = async categoryId => {
    setLoading(true)
    setError(null)
    try {
      const response = await axios.get(`/api/products?category_id=${categoryId}`)
      setLoading(false)
      return response.data.products
    } catch (error) {
      setError(error.response ? error.response.data : error.message)
      setLoading(false)
    }
  }

  return {
    getDraftProducts,
    createProduct,
    updateProduct,
    getProduct,
    getProductsByCategory,
    loading,
    error,
  }
}
