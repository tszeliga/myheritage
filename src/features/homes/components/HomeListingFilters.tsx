import type {
  FilterListingStatus,
  HomeFilters,
  SortOption
} from '@features/homes/types/home'
import { LISTING_STATUS, SORT_OPTIONS } from '@features/homes/types/home'
import React from 'react'

const SORT_OPTIONS_CONFIG = [
  { value: SORT_OPTIONS.NEWEST, label: 'Newest' },
  { value: SORT_OPTIONS.OLDEST, label: 'Oldest' }
] as const

const FILTER_OPTIONS_CONFIG = [
  { value: LISTING_STATUS.ACTIVE, label: 'Active' },
  { value: LISTING_STATUS.SOLD, label: 'Sold' },
  { value: LISTING_STATUS.ALL, label: 'All' }
] as const

interface HomeListingFiltersProps {
  filters: HomeFilters
  updateFilters: (newFilters: Partial<HomeFilters>) => void
  totalCount: number
}

const HomeListingFilters: React.FC<HomeListingFiltersProps> = ({
  filters,
  updateFilters,
  totalCount
}) => {
  return (
    <div className="flex-shrink-0 p-4">
      <h1 className="text-xl font-semibold text-gray-900 mb-2">
        Homes for sale!
      </h1>
      <p className="text-sm text-gray-600 mb-4">{totalCount} listings found.</p>

      <div className="flex gap-2">
        <div className="flex flex-col">
          <select
            id="sort-by"
            name="sortBy"
            className="px-3 py-2 border border-gray-300 rounded-lg text-sm bg-white"
            value={filters.sortBy || SORT_OPTIONS.NEWEST}
            onChange={e =>
              updateFilters({ sortBy: e.target.value as SortOption })
            }
          >
            {SORT_OPTIONS_CONFIG.map(option => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>

        <div className="flex flex-col">
          <select
            id="filter-by"
            name="filterBy"
            className="px-3 py-2 border border-gray-300 rounded-lg text-sm bg-white"
            value={filters.filterBy || LISTING_STATUS.ALL}
            onChange={e =>
              updateFilters({
                filterBy: e.target.value as FilterListingStatus
              })
            }
          >
            {FILTER_OPTIONS_CONFIG.map(option => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  )
}

export default HomeListingFilters
