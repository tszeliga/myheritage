import React from 'react'
import Spinner from '../../../shared/components/Spinner'
import { useHomes } from '../hooks/useHomes'
import HomeItem from './HomeItem'
import HomeItemBanner from './HomeItemBanner'
import HomeListingError from './HomeListingError'
import HomeListingFilters from './HomeListingFilters'
import HomeListingEmpty from './HomeListingEmpty'

interface HomeListingProps {
  homesData: ReturnType<typeof useHomes>
}

const HomeListing: React.FC<HomeListingProps> = ({ homesData }) => {
  const {
    homes,
    isLoading,
    error,
    refetch,
    filters,
    updateFilters,
    totalCount
  } = homesData

  const BANNER_INDEX = 1

  if (isLoading) {
    return <Spinner />
  }

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

      <div className="flex-1  min-h-0">
        {homes.length > 0 ? (
          <div className="divide-y divide-gray-200  py-2">
            {homes.map((home, index) => (
              <React.Fragment key={home.id}>
                <HomeItem home={home} />
                {index === BANNER_INDEX && <HomeItemBanner />}
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
