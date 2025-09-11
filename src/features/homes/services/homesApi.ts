// import { httpClient } from '@shared/services/api/httpClient'
import type { ApiResponse } from '@features/homes/types/home'
import { mockHomes } from '@features/homes/data/mockHomes'

/**
 * API service for homes data
 */
export class HomesApi {
  static async getHomes(): Promise<ApiResponse> {
    try {
      // const response = await httpClient.get<ApiResponse>('/get-listings')
      const response = mockHomes
      return response
    } catch (error) {
      console.error('Error fetching homes:', error)
      throw new Error('Failed to fetch homes data')
    }
  }
}