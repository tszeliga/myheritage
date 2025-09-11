export const SORT_OPTIONS = {
  NEWEST: 'newest',
  OLDEST: 'oldest'
} as const

export const LISTING_STATUS = {
  ACTIVE: 'active',
  SOLD: 'sold',
  ALL: 'all'
} as const

export type SortOption = typeof SORT_OPTIONS[keyof typeof SORT_OPTIONS]
export type ListingStatus = typeof LISTING_STATUS[keyof typeof LISTING_STATUS]
export type FilterListingStatus = ListingStatus | typeof LISTING_STATUS.ALL

export interface ApiResponseDeal {
  _id: string
  address: {
    formattedAddress: string
  }
  userData: {
    askingPrice?: number | null
  }
  zillowData?: {
    homeStatus: string
    listing_sub_type: {
      is_newHome: boolean
    }
  }
}

export interface ApiResponse {
  success: boolean
  deals: ApiResponseDeal[]
}

export interface Home {
  id: string
  price: number
  address: string
  imageUrl: string
  daysOnMarket: number
  isNewListing: boolean
  listingStatus: Exclude<ListingStatus, typeof LISTING_STATUS.ALL>
}

export interface HomeFilters {
  sortBy: SortOption
  filterBy: FilterListingStatus
  searchTerm?: string
}
