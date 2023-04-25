import { createBrowserRouter, RouterProvider } from 'react-router-dom'
// NOTE: Place all routers here

// START
import App from '../App' // mode 2 router
//END
import MainLayout from '../layouts/MainLayout'
import ServiceFinder from '../pages/ServiceFinder'
import ServiceDetail from '../pages/ServiceDetail'

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
])

export default function Router() {
  // TODO: remove mode 2
  const mode = 2 // change to 2 to use Zetain's Router
  switch (mode) {
    case 1:
      return <RouterProvider router={router} />
    case 2:
      return <App />
    default:
      return <RouterProvider router={router} />
  }
}
