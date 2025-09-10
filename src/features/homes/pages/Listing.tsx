import React from 'react'
import Header from '../../../shared/components/Header'
import useMediaQuery from '../../../shared/hooks/useMediaQuery'
import HomeListing from '../components/HomeListing'
import { MapPlaceholder } from '../components/MapPlaceholder'
import { useHomes } from '../hooks/useHomes'

const Listing: React.FC = () => {
  const isMedium = useMediaQuery('(min-width: 768px)')
  const homesData = useHomes()

  return (
    <div className="h-screen bg-white flex flex-col">
      <Header onSearch={homesData.updateSearch} />
      <div className="flex flex-1 h-full">
        {isMedium && (
          <div className="flex-1 relative">
            <MapPlaceholder className="w-full h-full" />
          </div>
        )}

        <div className="w-full md:w-120 bg-white border-r border-gray-200 flex flex-col">
          <HomeListing homesData={homesData} />
        </div>
      </div>
    </div>
  )
}

export default Listing
