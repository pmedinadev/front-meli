import axios from '@/lib/axios'
import { useState } from 'react'

export const usePhotos = () => {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const createProductPhoto = async photoData => {
    setLoading(true)
    setError(null)
    try {
      const response = await axios.post('/api/productphotos', photoData)
      setLoading(false)
      return response.data.productPhoto
    } catch (error) {
      setError(error.response ? error.response.data : error.message)
      setLoading(false)
    }
  }

  const deleteProductPhoto = async photoId => {
    setLoading(true)
    setError(null)
    try {
      await axios.delete(`/api/productphotos/${photoId}`)
      return true
    } catch (error) {
      setError(error.response ? error.response.data : error.message)
      return false
    } finally {
      setLoading(false)
    }
  }

  return { createProductPhoto, deleteProductPhoto, loading, error }
}
