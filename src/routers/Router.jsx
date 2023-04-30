import { createBrowserRouter, RouterProvider } from 'react-router-dom'
// NOTE: Place all routers here

// START
import App from '../App' // mode 2 router
//END
import MainLayout from '../layouts/MainLayout'
import ServiceFinder from '../pages/ServiceFinder'
import ServiceDetail from '../pages/ServiceDetail'

import LoginPage from '../pages/LoginPage'
const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
  },
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
])

export default function Router() {
  return <RouterProvider router={router} />
}
