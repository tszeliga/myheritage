import {
  fetchHomes,
  selectError,
  selectFilteredHomes,
  selectFilters,
  selectLoading,
  selectTotalCount,
  setFilters
} from '@features/homes/store/homesSlice'
import Spinner from '@shared/components/Spinner'
import { useAppDispatch, useAppSelector } from '@store/hooks'
import React from 'react'
import type { HomeFilters } from '../types/home'
import HomeItem from './HomeItem'
import HomeItemBanner from './HomeItemBanner'
import HomeListingEmpty from './HomeListingEmpty'
import HomeListingError from './HomeListingError'
import HomeListingFilters from './HomeListingFilters'

const HomeListing: React.FC = () => {
  const dispatch = useAppDispatch()

  const homes = useAppSelector(selectFilteredHomes)
  const isLoading = useAppSelector(selectLoading)
  const error = useAppSelector(selectError)
  const filters = useAppSelector(selectFilters)
  const totalCount = useAppSelector(selectTotalCount)

  const refetch = () => {
    dispatch(fetchHomes())
  }

  const updateFilters = (newFilters: Partial<HomeFilters>) => {
    dispatch(setFilters(newFilters))
  }

  const BANNER_POSITION = 3

  if (error) {
    return <HomeListingError error={error} onRefetch={refetch} />
  }

  return (
    <div className="flex flex-col w-full h-full overflow-y-auto">
      <HomeListingFilters
        filters={filters}
        updateFilters={updateFilters}
        totalCount={totalCount}
      />

      <div className="flex-1 min-h-0">
        {isLoading ? (
          <Spinner />
        ) : homes.length > 0 ? (
          <div className="divide-y divide-gray-200 py-2">
            {homes.map((home, index) => (
              <React.Fragment key={home.id}>
                <HomeItem home={home} />
                {index === BANNER_POSITION - 2 && <HomeItemBanner />}
              </React.Fragment>
            ))}
          </div>
        ) : (
          <HomeListingEmpty />
        )}
      </div>
    </div>
  )
}

export default HomeListing
