import React, { useState } from 'react'
import { Layout, Menu } from 'antd'
import '../css/ServiceProviderIndex.scss'
import AddService from './Addservice'
const { Header, Content, Sider } = Layout
const ServiceProviderIndex = () => {
  const [selectedMenuItem, setSelectedMenuItem] = useState('myinfo')

  const handleMenuItemClick = e => {
    setSelectedMenuItem(e.key)
  }

  return (
    <Layout className='navigation'>
      <Sider theme='dark'>
        <Menu theme='dark' mode='inline' selectedKeys={[selectedMenuItem]} onClick={handleMenuItemClick}>
          <Menu.Item key='myinfo'>My Info</Menu.Item>
          <Menu.Item key='service'>Service</Menu.Item>
          <Menu.Item key='request'>Request</Menu.Item>
        </Menu>
      </Sider>
      <Layout>
        {/* <Header className='header' /> */}
        <Content className='content' style={{ overflow: 'auto' }}>
          {selectedMenuItem === 'myinfo' && <div className='myinfo'>My Info Content</div>}
          {selectedMenuItem === 'service' && <AddService />}
          {selectedMenuItem === 'request' && <div className='request'>Request Content</div>}
        </Content>
      </Layout>
    </Layout>
  )
}

export default ServiceProviderIndex
