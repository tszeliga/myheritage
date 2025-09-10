import { httpClient } from '../../../shared/services/api/httpClient'
import type { Home } from '../types/home'
import { mockHomes } from '../data/mockHomes'
export interface HomesApiResponse {
  homes: Home[]
  total: number
}

/**
 * API service for homes data
 */
export class HomesApi {
  /**
   * Fetch all homes from the API
   */
  static async getHomes(): Promise<Home[]> {
    try {
      // const response = await httpClient.get<Home[]>('/get-listings')
      const response = await mockHomes
      const mappedResponse = response.deals.map((deal): Home => {
        return {
          id: deal._id,
          price: deal.userData.askingPrice || 0,
          address: deal.address.formattedAddress,
          imageUrl: '',
          listingStatus: deal.zillowData.homeStatus === 'FOR_SALE' ? 'active' : 'sold',
          isNewListing: deal.zillowData.listing_sub_type.is_newHome,
          daysOnMarket: Math.floor(Math.random() * 31),
          imageUrl: '//photos.zillowstatic.com/fp/92d19c487805a00aa26d4f4660f17abc-cc_ft_1536.webp'
        }
      })
      return mappedResponse
    } catch (error) {
      console.error('Error fetching homes:', error)
      throw new Error('Failed to fetch homes data')
    }
  }

  /**
   * Fetch homes with optional filters (future enhancement)
   */
  static async getHomesWithFilters(filters?: {
    listingStatus?: 'active' | 'sold' | 'all'
    sortBy?: 'newest' | 'oldest'
  }): Promise<Home[]> {
    try {
      const params = new URLSearchParams()
      
      if (filters?.listingStatus && filters.listingStatus !== 'all') {
        params.append('listingStatus', filters.listingStatus)
      }
      
      if (filters?.sortBy) {
        params.append('sortBy', filters.sortBy)
      }

      const url = `/homes${params.toString() ? `?${params.toString()}` : ''}`
      const response = await httpClient.get<Home[]>(url)
      return response.data
    } catch (error) {
      console.error('Error fetching filtered homes:', error)
      throw new Error('Failed to fetch homes data')
    }
  }
}