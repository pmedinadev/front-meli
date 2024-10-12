import axios from "@/lib/axios"
import useSWR from "swr"

export const useCategories = () => {
  const fetcher = url => axios.get(url).then(res => res.data.categories)
  const { data, error } = useSWR("/api/categories", fetcher)

  return {
    categories: data,
    isLoading: !error && !data,
    isError: error,
  }
}
