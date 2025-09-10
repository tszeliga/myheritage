import type { PayloadAction } from '@reduxjs/toolkit'
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { mockHomes } from '../../features/homes/data/mockHomes'
import type { Home, HomeFilters } from '../../features/homes/types/home'

interface HomesState {
  homes: Home[]
  filters: HomeFilters
  isLoading: boolean
  error: string | null
  lastFetchTime: number | null
}

const initialState: HomesState = {
  homes: [],
  filters: {
    sortBy: 'newest',
    listingStatus: 'active'
  },
  isLoading: false,
  error: null,
  lastFetchTime: null
}

export const fetchHomes = createAsyncThunk(
  'homes/fetchHomes',
  async (_, { rejectWithValue }) => {
    try {
      // For now, using mock data. Replace with actual API call when ready:
      // const response = await httpClient.get<{ success: boolean; deals: any[] }>('/get-listings')

      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 500))

      // Add listingStatus to mock homes
      const homesWithStatus = mockHomes.map(home => ({
        ...home,
        listingStatus: 'active' as const
      }))

      return homesWithStatus
    } catch {
      return rejectWithValue('Failed to fetch homes')
    }
  }
)

const homesSlice = createSlice({
  name: 'homes',
  initialState,
  reducers: {
    updateFilters: (state, action: PayloadAction<Partial<HomeFilters>>) => {
      state.filters = { ...state.filters, ...action.payload }
    },
    clearFilters: state => {
      state.filters = {
        sortBy: 'newest',
        listingStatus: 'active'
      }
    },
    clearError: state => {
      state.error = null
    }
  },
  extraReducers: builder => {
    builder
      .addCase(fetchHomes.pending, state => {
        state.isLoading = true
        state.error = null
      })
      .addCase(fetchHomes.fulfilled, (state, action) => {
        state.isLoading = false
        state.homes = action.payload
        state.lastFetchTime = Date.now()
        state.error = null
      })
      .addCase(fetchHomes.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.payload as string
      })
  }
})

export const { updateFilters, clearFilters, clearError } = homesSlice.actions
export default homesSlice.reducer
