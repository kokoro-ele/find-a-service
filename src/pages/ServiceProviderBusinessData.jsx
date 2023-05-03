import react from 'react'
import { getLoginUserId } from '../utils/LoginInfo'
const ServiceProviderBusinessData = () => {
  const loginUserId = getLoginUserId()
  return <div>{loginUserId}</div>
}

export default ServiceProviderBusinessData
