import { useState, useMemo, useCallback } from 'react'

/**
 * Generic search hook
 * Dapat digunakan untuk search functionality di berbagai komponen
 */
export function useSearch<T>(
  items: T[],
  searchFields: (keyof T)[],
  options?: {
    caseSensitive?: boolean
    trim?: boolean
  }
) {
  const [searchQuery, setSearchQuery] = useState('')

  const filteredItems = useMemo(() => {
    if (!searchQuery || searchQuery.trim() === '') return items

    const query = options?.trim !== false ? searchQuery.trim() : searchQuery
    const normalizedQuery = options?.caseSensitive ? query : query.toLowerCase()

    return items.filter((item) => {
      return searchFields.some((field) => {
        const value = item[field]
        if (value === null || value === undefined) return false

        const stringValue = String(value)
        const normalizedValue = options?.caseSensitive
          ? stringValue
          : stringValue.toLowerCase()

        return normalizedValue.includes(normalizedQuery)
      })
    })
  }, [items, searchQuery, searchFields, options])

  const clearSearch = useCallback(() => {
    setSearchQuery('')
  }, [])

  return {
    searchQuery,
    setSearchQuery,
    filteredItems,
    clearSearch,
    hasSearch: searchQuery.trim() !== '',
  }
}

/**
 * Hook untuk debounced search
 * Berguna untuk search yang melakukan API calls
 */
export function useDebouncedSearch(delay = 300) {
  const [searchQuery, setSearchQuery] = useState('')
  const [debouncedQuery, setDebouncedQuery] = useState('')

  const updateSearch = useCallback(
    (query: string) => {
      setSearchQuery(query)

      const timeoutId = setTimeout(() => {
        setDebouncedQuery(query)
      }, delay)

      return () => clearTimeout(timeoutId)
    },
    [delay]
  )

  const clearSearch = useCallback(() => {
    setSearchQuery('')
    setDebouncedQuery('')
  }, [])

  return {
    searchQuery,
    debouncedQuery,
    setSearchQuery: updateSearch,
    clearSearch,
    isSearching: searchQuery !== debouncedQuery,
  }
}
