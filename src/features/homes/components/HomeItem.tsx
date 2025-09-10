import React from 'react'
import type { Home } from './../types/home'

type HomeItemProps = {
  home: Home
}

const HomeItem: React.FC<HomeItemProps> = ({ home }) => {
  return (
    <div className="p-4 m-4 rounded-xl shadow-md hover:bg-gray-50 cursor-pointer transition-colors">
      <div className="flex gap-4">
        <div className="flex-shrink-0">
          <img
            src={home.imageUrl}
            alt={home.address}
            className="w-24 h-24 rounded-lg object-cover"
          />
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex justify-between items-start mb-2">
            <h3 className="text-lg font-semibold text-gray-900">
              ${home.price.toLocaleString()}
            </h3>
            <div className="flex gap-2">
              <span
                className={`text-xs font-medium px-2 py-1 rounded ${
                  home.listingStatus === 'active'
                    ? 'bg-green-100 text-green-800'
                    : 'bg-red-100 text-red-800'
                }`}
              >
                {home.listingStatus === 'active' ? 'Active' : 'Sold'}
              </span>
              {home.isNewListing && (
                <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2 py-1 rounded">
                  New
                </span>
              )}
            </div>
          </div>

          <p className="text-sm text-gray-700 mb-2 truncate">{home.address}</p>

          <div className="flex items-center justify-between text-xs text-gray-500">
            <span>{home.daysOnMarket} days on market</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default HomeItem
