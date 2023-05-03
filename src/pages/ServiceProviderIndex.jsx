import React, { useState } from 'react'
import { Layout, Menu } from 'antd'
import { Outlet, useLocation, Link } from 'react-router-dom'
import '../css/ServiceProviderIndex.scss'
import { useEffect } from 'react'
const { Header, Content, Sider } = Layout
import { getLoginUserId } from '../utils/LoginInfo'
import { getServiceProviderById } from '../utils/FirebaseAPI'
import ManageAccount from './ManageAccount'
const ServiceProviderIndex = () => {
  const loginId = getLoginUserId()
  const [canLogin, setCanLogin] = useState(false)
  const [update, setUpdate] = useState(false)
  const [selectedMenuItem, setSelectedMenuItem] = useState('overview')
  const location = useLocation().pathname.split('/')[2]
  useEffect(() => {
    console.log('im', loginId)
    getServiceProviderById(loginId).then(res => {
      console.log(res)
      setCanLogin(res.approved)
      setUpdate(res.needupdate)
    })
    if (location === 'manage-service' || location === 'add-service') {
      setSelectedMenuItem('service')
    } else if (location === 'manage-request') {
      setSelectedMenuItem('request')
    } else if (location === 'manage-account') {
      setSelectedMenuItem('account')
    } else {
      setSelectedMenuItem('overview')
    }
  }, [])
  // console.log(location)
  const handleMenuItemClick = e => {
    setSelectedMenuItem(e.key)
  }
  if (!canLogin) {
    if (update)
      return (
        <div>
          <h1> Please update your info </h1>
          <ManageAccount />
        </div>
      )
    else return <h1>Your account is not approved or you are banned.</h1>
  }
  return (
    <Layout className='navigation'>
      <Sider theme='dark'>
        <Menu theme='dark' mode='inline' selectedKeys={[selectedMenuItem]} onClick={handleMenuItemClick}>
          <Menu.Item key='overview'>
            <Link to='/service-provider/business-data'>My Info</Link>
          </Menu.Item>
          <Menu.Item key='account'>
            <Link to='/service-provider/manage-account'>Account</Link>
          </Menu.Item>
          <Menu.Item key='service'>
            <Link to='/service-provider/manage-service'>Service</Link>
          </Menu.Item>
          <Menu.Item key='request'>
            <Link to='/service-provider/manage-request'>Request</Link>
          </Menu.Item>
        </Menu>
      </Sider>
      <Layout>
        <Content className='content' style={{ overflow: 'auto' }}>
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  )
}

export default ServiceProviderIndex
