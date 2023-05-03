import { createBrowserRouter, RouterProvider } from 'react-router-dom'
// NOTE: Place all routers here
import ServiceFinder from '../pages/ServiceFinder'
import ServiceProviderSignUp from '../pages/ServiceProvideSignUp'
import ServiceDetail from '../pages/ServiceDetail'
import Addservice from '../pages/Addservice'
import LoginPage from '../pages/LoginPage'
import ServiceProviderIndex from '../pages/ServiceProviderIndex'
import MapTest from '../pages/MapTest'
import CustomerSignUp from '../pages/CustomerSignUp'
import RequestDetail from '../pages/RequestDetail'
import ManageAccount from '../pages/ManageAccount'
import ManageRequest from '../pages/ManageRequest'
import ManageService from '../pages/ManageService'
import EditService from '../pages/EditService'
import Admin from '../pages/Admin'
import ServiceProviderBusinessData from '../pages/ServiceProviderBusinessData'
const router = createBrowserRouter([
  // 开发用
  {
    path: '/',
    element: <ServiceProviderIndex />,
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

  {
    path: '/service-provider',
    element: <ServiceProviderIndex />,
    children: [
      {
        path: '',
        element: <ServiceProviderBusinessData />,
      },
      {
        path: 'manage-service',
        element: <ManageService />,
      },
      {
        path: 'manage-account',
        element: <ManageAccount />,
      },
      {
        path: 'manage-request',
        element: <ManageRequest />,
      },
      {
        path: 'add-service',
        element: <Addservice />,
      },
      {
        path: 'request-detail/:id',
        element: <RequestDetail />,
      },
      {
        path: 'edit-service/:id',
        element: <EditService />,
      },
      {
        path: 'business-data',
        element: <ServiceProviderBusinessData />,
      },
    ],
  },
  { path: '/customer-signup', element: <CustomerSignUp /> },
  { path: '/request-detail', element: <RequestDetail /> },
  { path: '/provider-signup', element: <ServiceProviderSignUp /> },
  { path: '/admin', element: <Admin /> },
  {
    path: '/map',
    element: <MapTest />,
  },
])

export default function Router() {
  return <RouterProvider router={router} />
}
