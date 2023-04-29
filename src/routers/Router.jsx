import { createBrowserRouter, RouterProvider } from 'react-router-dom'
// NOTE: Place all routers here

// START
import App from '../App' // mode 2 router
//END
import MainLayout from '../layouts/MainLayout'
import ServiceFinder from '../pages/ServiceFinder'
import ServiceDetail from '../pages/ServiceDetail'

//serviceprovider
import ManageAccount from '../pages/ManageAccount'
import ManageRequest from '../pages/ManageRequest'
import ManageService from '../pages/ManageService'
import RequestInfo from '../pages/RequestInfo'
import EditService from '../pages/EditService'
import AddService from '../pages/AddService'

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
    path: '/add-service',
    element: <AddService />,
    children: [{}],
  },
  {
    path: '/edit-service', // TODO: add id
    element: <EditService />,
    children: [{}],
  },
  {
    path: '/view-requests', // TODO: add id
    element: <ManageRequest />,
    children: [{}],
  },
  {
    path: '/handle-requests', // TODO: add id
    element: <RequestInfo />,
    children: [{}],
  },
  {
    path: '/manage-service', // TODO: add id
    element: <ManageService />,
    children: [{}],
  },
])

export default function Router() {
  return <RouterProvider router={router} />
}
