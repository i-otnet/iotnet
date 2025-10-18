import { useState, useMemo, useCallback } from 'react'

/**
 * Generic filter hook
 * Dapat digunakan untuk filtering functionality di berbagai komponen
 */
export function useFilter<T, K extends keyof T>(
  items: T[],
  filterKey: K,
  options?: {
    multiSelect?: boolean
  }
) {
  const [selectedFilters, setSelectedFilters] = useState<T[K][]>([])

  const filteredItems = useMemo(() => {
    if (selectedFilters.length === 0) return items

    return items.filter((item) => selectedFilters.includes(item[filterKey]))
  }, [items, selectedFilters, filterKey])

  const toggleFilter = useCallback(
    (value: T[K]) => {
      setSelectedFilters((prev) => {
        if (options?.multiSelect === false) {
          return [value]
        }

        if (prev.includes(value)) {
          return prev.filter((f) => f !== value)
        }
        return [...prev, value]
      })
    },
    [options?.multiSelect]
  )

  const clearFilters = useCallback(() => {
    setSelectedFilters([])
  }, [])

  const setFilters = useCallback((filters: T[K][]) => {
    setSelectedFilters(filters)
  }, [])

  const hasFilters = selectedFilters.length > 0

  return {
    selectedFilters,
    setSelectedFilters,
    filteredItems,
    toggleFilter,
    clearFilters,
    setFilters,
    hasFilters,
  }
}

/**
 * Hook untuk multiple filters
 * Mendukung filtering berdasarkan multiple criteria
 */
export function useMultiFilter<T>(items: T[]) {
  const [filters, setFilters] = useState<Record<string, (item: T) => boolean>>(
    {}
  )

  const filteredItems = useMemo(() => {
    const activeFilters = Object.values(filters)
    if (activeFilters.length === 0) return items

    return items.filter((item) => {
      return activeFilters.every((filterFn) => filterFn(item))
    })
  }, [items, filters])

  const addFilter = useCallback(
    (key: string, filterFn: (item: T) => boolean) => {
      setFilters((prev) => ({ ...prev, [key]: filterFn }))
    },
    []
  )

  const removeFilter = useCallback((key: string) => {
    setFilters((prev) => {
      const newFilters = { ...prev }
      delete newFilters[key]
      return newFilters
    })
  }, [])

  const clearFilters = useCallback(() => {
    setFilters({})
  }, [])

  return {
    filteredItems,
    addFilter,
    removeFilter,
    clearFilters,
    hasFilters: Object.keys(filters).length > 0,
    activeFiltersCount: Object.keys(filters).length,
  }
}
