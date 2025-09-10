export interface ApiResponse {
  success: boolean
  deals: unknown[]
}

export interface Home {
  id: string
  price: number
  address: string
  imageUrl: string
  daysOnMarket: number
  isNewListing: boolean
  listingStatus: 'active' | 'sold' | 'for-sale'

}

export interface HomeFilters {
  sortBy: 'newest' | 'oldest'
  listingStatus: 'active' | 'sold' | 'all'
  searchTerm?: string
}
