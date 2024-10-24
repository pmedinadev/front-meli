import { useEffect, useState } from 'react'
import axios from '@/lib/axios'

export const useCategories = () => {
  const [categories, setCategories] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get('/api/categories')
        setCategories(response.data.categories)
        setLoading(false)
      } catch (error) {
        setError(true)
        setLoading(false)
      }
    }

    fetchCategories()
  }, [])

  return {
    categories,
    loading,
    error,
  }
}
