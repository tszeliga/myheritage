import { createSlice, createAsyncThunk, createSelector } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { HomesApi } from '@features/homes/services/homesApi'
import type { Home, HomeFilters, ApiResponseDeal } from '@features/homes/types/home'
import { SORT_OPTIONS, LISTING_STATUS } from '@features/homes/types/home'
import type { RootState } from '@store/index'

export interface HomesState {
  allHomes: Home[]
  loading: boolean
  error: string | null
  filters: HomeFilters
  initialized: boolean
}

const initialState: HomesState = {
  allHomes: [],
  loading: false,
  error: null,
  filters: {
    sortBy: SORT_OPTIONS.NEWEST,
    filterBy: LISTING_STATUS.ALL
  },
  initialized: false
}

export const fetchHomes = createAsyncThunk(
  'homes/fetchHomes',
  async () => {
    const response = await HomesApi.getHomes()
    
    return response.deals.map((deal: ApiResponseDeal): Home => {
      return {
        id: deal._id,
        price: deal.userData.askingPrice || 0,
        address: deal.address.formattedAddress,
        listingStatus: deal.zillowData?.homeStatus === 'FOR_SALE' ? LISTING_STATUS.ACTIVE : LISTING_STATUS.SOLD,
        isNewListing: deal.zillowData?.listing_sub_type.is_newHome || false,
        daysOnMarket: Math.floor(Math.random() * 31),
        imageUrl: '//photos.zillowstatic.com/fp/92d19c487805a00aa26d4f4660f17abc-cc_ft_1536.webp'
      }
    })
  
  }
)

const homesSlice = createSlice({
  name: 'homes',
  initialState,
  reducers: {
    setFilters: (state, action: PayloadAction<Partial<HomeFilters>>) => {
      state.filters = { ...state.filters, ...action.payload }
    },
    updateSearch: (state, action: PayloadAction<string>) => {
      state.filters.searchTerm = action.payload
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchHomes.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchHomes.fulfilled, (state, action) => {
        state.loading = false
        state.allHomes = action.payload
        state.initialized = true
      })
      .addCase(fetchHomes.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message || 'Failed to fetch homes'
      })
  }
})

export const { setFilters, updateSearch } = homesSlice.actions

export const selectAllHomes = (state: RootState) => state.homes.allHomes
export const selectFilters = (state: RootState) => state.homes.filters
export const selectLoading = (state: RootState) => state.homes.loading
export const selectError = (state: RootState) => state.homes.error
export const selectInitialized = (state: RootState) => state.homes.initialized

const selectNormalizedSearchTerm = createSelector(
  [selectFilters],
  (filters) => filters.searchTerm?.toLowerCase().trim() || null
)

export const selectFilteredHomes = createSelector(
  [selectAllHomes, selectFilters, selectNormalizedSearchTerm],
  (allHomes, filters, normalizedSearchTerm) => {
    let filtered = [...allHomes]

    if (filters.filterBy && filters.filterBy !== LISTING_STATUS.ALL) {
      filtered = filtered.filter(home => home.listingStatus === filters.filterBy)
    }

    if (normalizedSearchTerm) {
      filtered = filtered.filter(home => 
        home.address.toLowerCase().includes(normalizedSearchTerm)
      )
    }

    if (filters.sortBy) {
      filtered.sort((a, b) => {
        switch (filters.sortBy) {
          case SORT_OPTIONS.NEWEST:
            return a.daysOnMarket - b.daysOnMarket
          case SORT_OPTIONS.OLDEST:
            return b.daysOnMarket - a.daysOnMarket
          default:
            return 0
        }
      })
    }

    return filtered
  }
)

export const selectTotalCount = createSelector(
  [selectFilteredHomes],
  (filteredHomes) => filteredHomes.length
)


export default homesSlice.reducer