import axios from '@/lib/axios'
import { useState } from 'react'
import useSWR from 'swr'

export const useProfile = () => {
  const { mutate } = useSWR('/api/user')

  const [loading, setLoading] = useState(false)
  const [errors, setErrors] = useState([])

  const csrf = () => axios.get('/sanctum/csrf-cookie')

  const initializeRequest = async () => {
    setLoading(true)
    await csrf()
    setErrors([])
  }

  const updateProfile = async props => {
    try {
      await initializeRequest()
      await axios.patch('/api/profile', props)
      mutate()
      setLoading(false)
      return true
    } catch (error) {
      setLoading(false)
      if (error.response.status !== 422) throw error
      setErrors(error.response.data.errors)
      return false
    }
  }

  return { updateProfile, loading, errors }
}
