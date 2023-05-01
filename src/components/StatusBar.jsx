import { Avatar, Col, Drawer, Row } from 'antd'
import '../css/StatusBar.scss'
import { UserOutlined } from '@ant-design/icons'
import { useEffect, useRef, useState } from 'react'

export default function StatusBar() {
  // const [, forceUpdate] = useState()
  const loginID = localStorage.getItem('loginID')
  // console.log(loginID)

  const user_id = useRef(null)

  if (loginID) {
    user_id.current = loginID
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
        <Col span={22}>Find A Service</Col>
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
      <Drawer title='Basic Drawer' placement='right' onClose={onClose} open={open}>
        <p>Some contents...</p>
        <p>Some contents...</p>
        <div className='logout'>
          <a
            onClick={() => {
              // localStorage.setItem('loginID', false)
              localStorage.removeItem('loginID')
              localStorage.removeItem(user_id.current)
              setOpen(false)
              // forceUpdate()
            }}>
            Log out
          </a>
        </div>
      </Drawer>
    </div>
  )
}
