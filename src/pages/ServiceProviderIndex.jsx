import React, { useState } from 'react'
import { Layout, Menu, Avatar } from 'antd'
import { Outlet, useLocation, Link } from 'react-router-dom'
import '../css/ServiceProviderIndex.scss'
import { useEffect } from 'react'
import ParticlesBg from '../components/ParticlesBg'
const { Header, Content, Sider } = Layout
import { getLoginUserId } from '../utils/LoginInfo'
import { getServiceProviderById } from '../utils/FirebaseAPI'
import ManageAccount from './ManageAccount'
const ServiceProviderIndex = () => {
  const loginId = getLoginUserId()
  const [canLogin, setCanLogin] = useState(false)
  const [update, setUpdate] = useState(false)
  const [name, setName] = useState('')
  const [avatarSrc, setAvatarSrc] = useState('')
  const [selectedMenuItem, setSelectedMenuItem] = useState('overview')
  const location = useLocation().pathname.split('/')[2]
  useEffect(() => {
    console.log('im', loginId)
    getServiceProviderById(loginId).then(res => {
      console.log(res)
      setName(res.prv_name)
      setAvatarSrc(res.avatar)
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
    <div className='service-provider-container'>
      <Layout className='navigation'>
        <Sider theme='dark'>
          <div className='info'>
            <Avatar
              style={{ zIndex: 15 }}
              size={64}
              src={avatarSrc}
              onClick={() => {
                console.log('click', avatarSrc)
              }}
            />
            <span> {name} </span>
          </div>

          <Menu
            theme='dark'
            mode='inline'
            selectedKeys={[selectedMenuItem]}
            onClick={handleMenuItemClick}
            className='index-menu'>
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
            <Menu.Item key='logout'>
              <Link
                to='/login'
                onClick={() => {
                  localStorage.removeItem('loginID')
                  localStorage.removeItem(loginId)
                }}>
                Log out
              </Link>
            </Menu.Item>
          </Menu>
        </Sider>
        <Layout>
          <Content className='index-content'>
            <ParticlesBg />
            <Outlet />
          </Content>
        </Layout>
      </Layout>
    </div>
  )
}

export default ServiceProviderIndex
