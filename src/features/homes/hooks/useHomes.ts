import { useCallback, useEffect, useMemo, useState } from 'react'
import type { Home, HomeFilters } from '../types/home'
import { HomesApi } from '../services/homesApi'

export const useHomes = () => {
  const [homes, setHomes] = useState<Home[]>([])
  const [filters, setFilters] = useState<HomeFilters>({
    sortBy: 'newest',
    listingStatus: 'all'
  })
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchHomes = async () => {
      setIsLoading(true)
      setError(null)
      
      try {
        const homesData = await HomesApi.getHomes()
        setHomes(homesData)
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : 'Failed to fetch homes'
        setError(errorMessage)
        console.error('Error loading homes:', err)
      } finally {
        setIsLoading(false)
      }
    }

    fetchHomes()
  }, [])

  /**
   * Filter and sort homes based on current filters
   */
  const filteredHomes = useMemo(() => {
    let filtered = [...homes]

    // Filter by listing status
    if (filters.listingStatus && filters.listingStatus !== 'all') {
      filtered = filtered.filter(home => home.listingStatus === filters.listingStatus)
    }

    // Filter by search term (simple string matching on address)
    if (filters.searchTerm && filters.searchTerm.trim()) {
      const searchLower = filters.searchTerm.toLowerCase().trim()
      filtered = filtered.filter(home => 
        home.address.toLowerCase().includes(searchLower)
      )
    }

    // Sort homes
    if (filters.sortBy) {
      filtered.sort((a, b) => {
        switch (filters.sortBy) {
          case 'newest':
            return a.daysOnMarket - b.daysOnMarket // Newer listings have fewer days on market
          case 'oldest':
            return b.daysOnMarket - a.daysOnMarket // Older listings have more days on market
          default:
            return 0
        }
      })
    }

    return filtered
  }, [homes, filters])

  /**
   * Update filters
   */
  const updateFilters = useCallback((newFilters: Partial<HomeFilters>) => {
    setFilters(prevFilters => ({
      ...prevFilters,
      ...newFilters
    }))
  }, [])

  /**
   * Update search term
   */
  const updateSearch = useCallback((searchTerm: string) => {
    setFilters(prevFilters => ({
      ...prevFilters,
      searchTerm
    }))
  }, [])

  /**
   * Clear all filters
   */
  const clearFilters = useCallback(() => {
    setFilters({
      sortBy: 'newest',
      listingStatus: 'all'
    })
  }, [])

  /**
   * Refetch homes data from API
   */
  const refetch = useCallback(async () => {
    setIsLoading(true)
    setError(null)
    
    try {
      const homesData = await HomesApi.getHomes()
      setHomes(homesData)
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to fetch homes'
      setError(errorMessage)
      console.error('Error refetching homes:', err)
    } finally {
      setIsLoading(false)
    }
  }, [])

  return {
    // Data
    homes: filteredHomes,
    allHomes: homes,
    filters,
    
    // State
    isLoading,
    error,
    
    // Actions
    updateFilters,
    updateSearch,
    clearFilters,
    refetch,
    
    // Computed values
    totalCount: filteredHomes.length,
    totalAllHomes: homes.length,
    hasHomes: filteredHomes.length > 0,
    isEmpty: filteredHomes.length === 0 && !isLoading,
    isFiltered: Object.keys(filters).length > 0,
    hasError: !!error
  }
}