import React from 'react'
import type { HomeFilters } from '../types/home'

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
        <select
          className="px-3 py-2 border border-gray-300 rounded-lg text-sm bg-white"
          value={filters.sortBy || 'newest'}
          onChange={e =>
            updateFilters({ sortBy: e.target.value as 'newest' | 'oldest' })
          }
        >
          <option value="newest">Newest</option>
          <option value="oldest">Oldest</option>
        </select>

        <select
          className="px-3 py-2 border border-gray-300 rounded-lg text-sm bg-white"
          value={filters.listingStatus || 'all'}
          onChange={e =>
            updateFilters({
              listingStatus: e.target.value as 'active' | 'sold' | 'all'
            })
          }
        >
          <option value="active">Active</option>
          <option value="sold">Sold</option>
          <option value="all">All</option>
        </select>
      </div>
    </div>
  )
}

export default HomeListingFilters
