import { configureStore } from '@reduxjs/toolkit'
import homesReducer from './slices/homesSlice'

export const store = configureStore({
  reducer: {
    homes: homesReducer
  }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
