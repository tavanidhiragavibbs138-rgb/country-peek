import { useState, useEffect, useRef } from 'react'

const API_BASE = 'https://restcountries.com/v3.1/name/'
const MIN_QUERY_LENGTH = 2

export default function useCountries(query) {
  const [countries, setCountries] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const cacheRef = useRef({})

  useEffect(() => {
    const normalizedQuery = query.trim().toLowerCase()

    if (!normalizedQuery) {
      setCountries([])
      setError(null)
      setLoading(false)
      return
    }

    if (normalizedQuery.length < MIN_QUERY_LENGTH) {
      setCountries([])
      setError(null)
      setLoading(false)
      return
    }

    if (cacheRef.current[normalizedQuery]) {
      setCountries(cacheRef.current[normalizedQuery])
      setError(null)
      setLoading(false)
      return
    }

    const controller = new AbortController()
    const timer = setTimeout(() => {
      setLoading(true)
      setError(null)

      fetch(`${API_BASE}${encodeURIComponent(normalizedQuery)}`, {
        signal: controller.signal,
      })
        .then((res) => {
          if (!res.ok) {
            throw new Error('No countries found.')
          }
          return res.json()
        })
        .then((data) => {
          cacheRef.current[normalizedQuery] = data
          setCountries(data)
          setError(null)
        })
        .catch((fetchError) => {
          if (fetchError.name === 'AbortError') return
          setCountries([])
          setError(
            fetchError.message === 'No countries found.'
              ? 'No countries found. Try a different search term.'
              : 'Unable to load countries. Check your connection and try again.'
          )
        })
        .finally(() => {
          setLoading(false)
        })
    }, 400)

    return () => {
      clearTimeout(timer)
      controller.abort()
    }
  }, [query])

  return { countries, loading, error }
}
