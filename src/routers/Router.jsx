import { createBrowserRouter, RouterProvider } from 'react-router-dom'
// NOTE: Place all routers here
import ServiceFinder from '../pages/ServiceFinder'
import ServiceDetail from '../pages/ServiceDetail'
import Addservice from '../pages/Addservice'
import LoginPage from '../pages/LoginPage'
import ServiceProviderIndex from '../pages/ServiceProviderIndex'
const router = createBrowserRouter([
  {
    path: '/service-find',
    element: <ServiceFinder />,
  },
  {
    path: '/service', // TODO: add id
    element: <ServiceDetail />,
    children: [{}],
  },
  {
    path: '/login', // TODO: add id
    element: <LoginPage />,
    children: [{}],
  },
  // {
  //   path: '/add-service',
  //   element: <Addservice />,
  //   children: [{}],
  // },
  {
    path: '/service-provider',
    element: <ServiceProviderIndex />,
    children: [
      {
        path: 'add-service',
        element: <Addservice />,
        children: [{}],
      },
    ],
  },
])

export default function Router() {
  return <RouterProvider router={router} />
}
