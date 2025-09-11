import {
  useDispatch,
  useSelector,
  type TypedUseSelectorHook
} from 'react-redux'
import type { AppDispatch, RootState } from '@store/index'

export const useAppDispatch = () => useDispatch<AppDispatch>()
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
