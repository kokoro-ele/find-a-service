import { Avatar, Col, Drawer, Row } from 'antd'
import '../css/StatusBar.scss'
import { UserOutlined } from '@ant-design/icons'
import { useEffect, useRef, useState } from 'react'
import { decrypt } from '../utils/RGEncrypt'
import { useNavigate } from 'react-router-dom'

export default function StatusBar() {
  // const [, forceUpdate] = useState()
  const navigate = useNavigate()
  const loginID = localStorage.getItem('loginID')
  let userInfo = localStorage.getItem(loginID)
  // console.log(loginID)

  const user_id = useRef(null)
  const user_name = useRef(null)

  if (loginID) {
    user_id.current = loginID
    userInfo = JSON.parse(decrypt(userInfo))
    // console.log(userInfo)
  }

  const [open, setOpen] = useState(false)

  const showDrawer = () => {
    setOpen(true)
  }
  const onClose = () => {
    setOpen(false)
  }

  return (
    <div className='status-bar'>
      <Row>
        <Col span={2}>
          <a href='/'>Find A Service</a>
        </Col>
        <Col span={2}>
          <a href='/'>Home</a>
        </Col>
        <Col span={18} className='slogan'>
          Find the best service only for you!
        </Col>
        <Col span={2}>
          {loginID ? (
            <Avatar
              icon={<UserOutlined />}
              style={{
                // backgroundColor: '#87d068',
                borderColor: 'aliceblue',
              }}
              onClick={() => {
                showDrawer()
                console.log('avatar clicked!')
              }}
            />
          ) : (
            <a href='/login'>Login</a>
          )}
        </Col>
      </Row>
      <Drawer title={userInfo ? userInfo.email : ''} placement='right' onClose={onClose} open={open}>
        <div className='link-box'>
          <a href={`/mypage/${loginID}/profile`} className='profile'>
            My Profile
          </a>
        </div>
        <div className='link-box'>
          <a href={`/mypage/${loginID}/requests`} className='request-log'>
            My Requests
          </a>
        </div>
        <div className='link-box logout'>
          <a
            onClick={() => {
              // localStorage.setItem('loginID', false)
              localStorage.removeItem('loginID')
              localStorage.removeItem(user_id.current)
              const currentURL = window.location.pathname
              if (currentURL.split('/')[1] == 'maypage') {
                navigate('/')
              } else {
                setOpen(false)
              }
              // forceUpdate()
            }}>
            Log out
          </a>
        </div>
      </Drawer>
    </div>
  )
}
