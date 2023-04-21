import { Layout, Menu, theme } from 'antd'
import React, { useState } from 'react'
import Nav from '../components/Nav'
import ManageAccount from '../components/ServiceProvider/ManageAccount'
import ManageRequest from '../components/ServiceProvider/ManageRequest'
import ManageService from '../components/ServiceProvider/ManageService'
import RequestInfo from '../components/RequestInfo'
import EditService from '../components/ServiceProvider/EditService'
import AddService from '../components/ServiceProvider/AddService'

import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons'
const { Header, Sider, Content } = Layout

const MainRouter = () => {
  const [collapsed, setCollapsed] = useState(false)
  const {
    token: { colorBgContainer },
  } = theme.useToken()
  return (
    <BrowserRouter>
      <Layout>
        <Sider trigger={null} collapsible collapsed={collapsed}>
          <div className='logo' />
          <Nav />
        </Sider>
        <Layout className='site-layout'>
          {/* <Header
          style={{
            padding: 0,
            background: colorBgContainer,
          }}
        > */}
          {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
            className: 'trigger',
            onClick: () => setCollapsed(!collapsed),
          })}
          {/* </Header> */}
          <Content
            style={{
              overflow: 'hidden',
              margin: '24px 16px',
              padding: 24,
              minHeight: 280,
              background: colorBgContainer,
            }}>
            <Routes>
              <Route index path='/' element={<ManageAccount />} />
              <Route path='/account' element={<ManageAccount />} />
              <Route path='/service' element={<ManageService />} />
              <Route path='/detail/:id' element={<RequestInfo />} />
              <Route path='/editservice/:id' element={<EditService />} />
              <Route path='/addservice' element={<AddService />} />
              <Route path='/request' element={<ManageRequest />} />
            </Routes>
          </Content>
        </Layout>
      </Layout>
    </BrowserRouter>
  )
}
export default MainRouter
