import { createBrowserRouter } from 'react-router-dom'
import Listing from '../features/homes/pages/Listing'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Listing />
  },
  {
    path: '/listing',
    element: <Listing />
  }
])

export default router
