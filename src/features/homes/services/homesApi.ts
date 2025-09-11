import { httpClient } from '@shared/services/api/httpClient'
import type { ApiResponse } from '@features/homes/types/home'

/**
 * API service for homes data
 */
export class HomesApi {
  static async getHomes(): Promise<ApiResponse> {
    try {
      const response = await httpClient.get<ApiResponse>('/get-listings')
      return response.data
    } catch (error) {
      console.error('Error fetching homes:', error)
      throw new Error('Failed to fetch homes data')
    }
  }
}