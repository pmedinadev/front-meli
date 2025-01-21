import axios from '@/lib/axios'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

export const useOrders = (orderId, productId) => {
  const queryClient = useQueryClient()

  const createOrder = useMutation({
    mutationFn: async data => {
      const { data: response } = await axios.post('/api/orders', data)
      return response
    },
  })

  const getOrder = useQuery({
    queryKey: ['order', orderId],
    queryFn: async () => {
      const { data } = await axios.get(`/api/orders/${orderId}`)
      return data
    },
    enabled: !!orderId,
  })

  const getOrderItem = useQuery({
    queryKey: ['orderItem', orderId, productId],
    queryFn: async () => {
      const { data } = await axios.get(
        `/api/orders/${orderId}/products/${productId}`,
      )
      return data
    },
    enabled: !!orderId && !!productId,
  })

  const updateShipping = useMutation({
    mutationFn: async ({ orderId, addressId }) => {
      const { data } = await axios.post(`/api/orders/${orderId}/shipping`, {
        address_id: addressId,
      })
      return data
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['order', orderId])
    },
  })

  const createPreference = useMutation({
    mutationFn: async orderId => {
      const { data } = await axios.post(`/api/orders/${orderId}/preference`)
      return data
    },
  })

  return {
    createOrder,
    getOrder,
    getOrderItem,
    updateShipping,
    createPreference,
  }
}
