import HomeListing from '@features/homes/components/HomeListing'
import { MapPlaceholder } from '@features/homes/components/MapPlaceholder'
import {
  fetchHomes,
  selectInitialized,
  updateSearch
} from '@features/homes/store/homesSlice'
import Header from '@shared/components/Header'
import useMediaQuery from '@shared/hooks/useMediaQuery'
import { useAppDispatch, useAppSelector } from '@store/hooks'
import React, { useEffect } from 'react'

const Listing: React.FC = () => {
  const isMedium = useMediaQuery('(min-width: 768px)')
  const dispatch = useAppDispatch()
  const initialized = useAppSelector(selectInitialized)

  useEffect(() => {
    if (!initialized) {
      dispatch(fetchHomes())
    }
  }, [dispatch, initialized])

  const handleSearch = (searchTerm: string) => {
    dispatch(updateSearch(searchTerm))
  }

  return (
    <div className="h-screen bg-white flex flex-col">
      <Header onSearch={handleSearch} />
      <div className="flex flex-1 overflow-y-auto">
        {isMedium && (
          <div className="flex-1 relative">
            <MapPlaceholder className="w-full h-full" />
          </div>
        )}

        <div className="w-full md:w-96 bg-white flex flex-col max-h-[calc(100vh-155px)] sm:max-h-[calc(100vh-70px)]">
          <HomeListing />
        </div>
      </div>
    </div>
  )
}

export default Listing
