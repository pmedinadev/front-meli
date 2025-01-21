import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import axios from '@/lib/axios'

export const useAddresses = () => {
  const queryClient = useQueryClient()

  const addresses = useQuery({
    queryKey: ['addresses'],
    queryFn: async () => {
      const { data } = await axios.get('/api/addresses')
      return data.addresses
    },
  })

  const createAddress = useMutation({
    mutationFn: async addressData => {
      const { data } = await axios.post('/api/addresses', addressData)
      return data
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['addresses'] })
    },
  })

  return { addresses, createAddress }
}
