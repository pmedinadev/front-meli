import axios from '@/lib/axios'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import useSWR from 'swr'

const SEARCH_HISTORY_KEY = 'search-history'
const MAX_HISTORY_ITEMS = 5
const DEBOUNCE_DELAY = 300

export const useSearch = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [suggestions, setSuggestions] = useState([])
  const router = useRouter()

  const fetcher = url => axios.get(url).then(res => res.data.products)

  const { data: searchResults, error } = useSWR(
    searchTerm && searchTerm.length >= 2
      ? `/api/products/search?q=${searchTerm}`
      : null,
    fetcher,
  )

  useEffect(() => {
    const handler = setTimeout(() => {
      if (searchTerm && searchTerm.length >= 2) {
        setSuggestions(searchResults || [])
      } else {
        setSuggestions([])
      }
    }, DEBOUNCE_DELAY)

    return () => clearTimeout(handler)
  }, [searchTerm, searchResults])

  const getSearchHistory = () => {
    if (typeof window === 'undefined') return []
    return JSON.parse(localStorage.getItem(SEARCH_HISTORY_KEY) || '[]')
  }

  const addToSearchHistory = term => {
    if (typeof window === 'undefined') return
    const history = getSearchHistory()
    const newHistory = [term, ...history.filter(item => item !== term)].slice(
      0,
      MAX_HISTORY_ITEMS,
    )
    localStorage.setItem(SEARCH_HISTORY_KEY, JSON.stringify(newHistory))
  }

  const handleSearch = e => {
    e.preventDefault()
    const term = searchTerm.trim()
    if (!term || term.length < 2) return

    addToSearchHistory(term)
    router.push(`/search?q=${encodeURIComponent(term)}`)
  }

  return {
    searchTerm,
    setSearchTerm,
    suggestions,
    handleSearch,
    getSearchHistory,
    addToSearchHistory,
    loading: !error && !searchResults,
    error,
  }
}
