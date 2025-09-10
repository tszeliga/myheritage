import { createSelector } from '@reduxjs/toolkit'
import type { RootState } from '../index'

export const selectAllHomes = (state: RootState) => state.homes.homes
export const selectFilters = (state: RootState) => state.homes.filters
export const selectIsLoading = (state: RootState) => state.homes.isLoading
export const selectError = (state: RootState) => state.homes.error
export const selectLastFetchTime = (state: RootState) =>
  state.homes.lastFetchTime

export const selectFilteredAndSortedHomes = createSelector(
  [selectAllHomes, selectFilters],
  (homes, filters) => {
    const filtered = homes.filter(home => {
      // Filter by listing status
      if (
        filters.listingStatus &&
        home.listingStatus !== filters.listingStatus
      ) {
        return false
      }

      return true
    })

    // Sort the filtered results
    const sorted = [...filtered].sort((a, b) => {
      switch (filters.sortBy) {
        case 'newest':
          return a.daysOnMarket - b.daysOnMarket // Newer listings have fewer days on market
        case 'oldest':
          return b.daysOnMarket - a.daysOnMarket // Older listings have more days on market
        default:
          return 0
      }
    })

    return sorted
  }
)
