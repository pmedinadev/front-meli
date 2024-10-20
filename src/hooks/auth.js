import useSWR from 'swr'
import axios from '@/lib/axios'
import { useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'

export const useAuth = ({ middleware, redirectIfAuthenticated } = {}) => {
  const router = useRouter()
  const params = useParams()

  const {
    data: user,
    error,
    mutate,
    isValidating,
  } = useSWR('/api/user', () =>
    axios
      .get('/api/user')
      .then(res => res.data)
      .catch(error => {
        if (error.response.status !== 409) throw error
        router.push('/verify-email')
      }),
  )

  const csrf = () => axios.get('/sanctum/csrf-cookie')

  const initializeRequest = async (setLoading, setErrors, setStatus = null) => {
    setLoading(true)
    await csrf()
    setErrors([])
    if (setStatus) setStatus(null)
  }

  const register = async ({ setErrors, setLoading, ...props }) => {
    try {
      await initializeRequest(setLoading, setErrors)
      await axios.post('/register', props)
      mutate()
      setLoading(false)
    } catch (error) {
      setLoading(false)
      if (error.response.status !== 422) throw error
      setErrors(error.response.data.errors)
    }
  }

  const login = async ({ setErrors, setLoading, setStatus, ...props }) => {
    try {
      await initializeRequest(setLoading, setErrors, setStatus)
      await axios.post('/login', props)
      mutate()
      setLoading(false)
    } catch (error) {
      setLoading(false)
      if (error.response.status !== 422) throw error
      setErrors(error.response.data.errors)
    }
  }

  const forgotPassword = async ({ setErrors, setStatus, email }) => {
    try {
      await initializeRequest(null, setErrors, setStatus)
      const response = await axios.post('/forgot-password', { email })
      setStatus(response.data.status)
    } catch (error) {
      if (error.response.status !== 422) throw error
      setErrors(error.response.data.errors)
    }
  }

  const resetPassword = async ({ setErrors, setStatus, ...props }) => {
    try {
      await initializeRequest(null, setErrors, setStatus)
      const response = await axios.post('/reset-password', {
        token: params.token,
        ...props,
      })
      router.push('/login?reset=' + btoa(response.data.status))
    } catch (error) {
      if (error.response.status !== 422) throw error
      setErrors(error.response.data.errors)
    }
  }

  const resendEmailVerification = async ({ setStatus }) => {
    const response = await axios.post('/email/verification-notification')
    setStatus(response.data.status)
  }

  const updatePassword = async ({ setErrors, setLoading, ...props }) => {
    try {
      await initializeRequest(setLoading, setErrors)
      await axios.put('/password', props)
      setLoading(false)
      localStorage.setItem('password-updated', 'true')
      window.location.pathname = '/login'
    } catch (error) {
      setLoading(false)
      if (error.response.status !== 422) throw error
      setErrors(error.response.data.errors)
    }
  }

  const logout = async () => {
    if (!error) {
      await axios.post('/logout')
      mutate()
    }
    window.location.pathname = '/login'
  }

  useEffect(() => {
    if (middleware === 'guest' && redirectIfAuthenticated && user)
      router.push(redirectIfAuthenticated)

    if (window.location.pathname === '/verify-email' && user?.email_verified_at)
      router.push(redirectIfAuthenticated)

    if (middleware === 'auth' && error) logout()

    if (middleware === 'verified' && user && !user?.email_verified_at)
      router.push(redirectIfAuthenticated)
  }, [user, error])

  return {
    user,
    isValidating,
    register,
    login,
    forgotPassword,
    resetPassword,
    resendEmailVerification,
    updatePassword,
    logout,
  }
}
