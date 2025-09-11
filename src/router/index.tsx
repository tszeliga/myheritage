import Listing from '@features/homes/pages/Listing'
import { createHashRouter } from 'react-router-dom'

export const router = createHashRouter([
  {
    path: '/',
    element: <Listing />
  }
])
