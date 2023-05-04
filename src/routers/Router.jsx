import { createBrowserRouter, RouterProvider } from 'react-router-dom'
// NOTE: Place all routers here

// START
import App from '../App' // mode 2 router
//END
import ServiceFinder from '../pages/ServiceFinder'
import ServiceDetail from '../pages/ServiceDetail'
import ServiceRequest from '../pages/ServiceRequest'
import LoginPage from '../pages/LoginPage'
import MapTest from '../TEST/MapTest'
import CustomerSignUp from '../pages/CustomerSignUp'
import CustomerPage from '../pages/CustomerPage'

const router = createBrowserRouter([
  {
    path: '/',
    element: <ServiceFinder />,
  },
  {
    path: '/service-find',
    element: <ServiceFinder />,
  },
  {
    // HINT: userParams() to get srv_id
    path: '/service/:srv_id',
    element: <ServiceDetail />,
  },
  {
    path: '/login',
    element: <LoginPage />,
  },
  {
    path: '/customer-signup',
    element: <CustomerSignUp />,
  },
  {
    path: '/mypage/:user_id/:activeTab',
    element: <CustomerPage />,
  },
  // TEST: below are test comps
  {
    path: '/map',
    element: <MapTest />,
  },
  {
    path: '/req',
    element: <ServiceRequest />,
  },
])

export default function Router() {
  // TODO: remove mode 2
  const mode = 1 // change to 2 to use Zetain's Router
  switch (mode) {
    case 1:
      return <RouterProvider router={router} />
    case 2:
      return <App />
    default:
      return <RouterProvider router={router} />
  }
}
