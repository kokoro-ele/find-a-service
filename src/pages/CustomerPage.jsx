import { Col, Row, Tabs, Form, Input, Button, Modal, Table, notification } from 'antd'
import { useEffect, useRef, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import '../css/CustomerPage.scss'
import StatusBar from '../components/StatusBar'
import { useForm } from 'antd/es/form/Form'
import { checkEmailFormat, checkPasswordFormat, checkUKPhoneFormat } from '../utils/FormatChecker'
import { changeCustomerEmail, changeCustomerNamePhone, getCustomer, getRequestHistory } from '../utils/FirebaseAPI'
import { getAuth, updateEmail, updatePassword } from 'firebase/auth'
import { SmileOutlined } from '@ant-design/icons'

function Profile({ user_id }) {
  const navigate = useNavigate()
  const [form] = useForm()
  const [userInfo, setUserInfo] = useState(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const auth = getAuth()

  // Pwd Format check
  const pwdFormatRules = [
    {
      required: true,
      message: 'Please input your password!',
    },
    {
      min: 6,
      message: 'Must be at least 6 characters',
    },
    {
      // pattern: /^(?=.*\d)(?=.*[^a-zA-Z0-9]).{6,}$/,
      pattern: checkPasswordFormat(true),
      message: 'Must contain at least 1 letter, 1 number and 1 special character',
    },
  ]

  let ignore = false
  useEffect(() => {
    if (!ignore) {
      getCustomer(user_id).then(res => {
        console.log('UserInfo: ', res)
        setUserInfo(res)
      })
    }

    return () => {
      ignore = true
    }
  }, [])

  // popup Modal controls
  // START
  const showModal = () => {
    setIsModalOpen(true)
  }

  const handleModalOk = () => {
    setIsModalOpen(false)
    const loginID = localStorage.getItem('loginID')
    localStorage.removeItem(loginID)
    localStorage.removeItem('loginID')
    navigate('/')
  }
  const handleModalCancel = () => {
    setIsModalOpen(false)
    const loginID = localStorage.getItem('loginID')
    localStorage.removeItem(loginID)
    localStorage.removeItem('loginID')
    navigate('/')
  }
  // END

  const onUpdateFinish = values => {
    const userAuth = auth.currentUser

    changeCustomerNamePhone(user_id, values.username, values.phone)

    if (values.email != userAuth.email) {
      console.log(auth.currentUser)
      updateEmail(userAuth, values.email).then(res => {
        console.log('Successfully change email into: ', values.email)
        changeCustomerEmail(user_id, values.email)
        showModal()
      })
    }
  }
  const onUpdateFinishFailed = errorInfo => {
    console.log('Failed:', errorInfo)
  }

  const onChangePwdFinish = values => {
    console.log('Success <changing pwd>:', values)
    const userAuth = auth.currentUser
    updatePassword(userAuth, values.password).then(res => {
      console.log('Successfully change password: ', values.email)
      showModal()
    })
  }
  const onChangePwdFinishFailed = errorInfo => {
    console.log('Failed:', errorInfo)
  }

  const offsets = [8, 8]

  return (
    <div className='profile-box'>
      {/* Popup Modal */}
      <Modal title='Note' style={{ top: 200 }} open={isModalOpen} onOk={handleModalOk} onCancel={handleModalCancel}>
        Account information changed, please log in again!
      </Modal>
      <div className='basic-info'>
        {userInfo ? (
          <Form
            // form={form}
            name='basicInfo'
            labelCol={{
              span: offsets[0],
            }}
            wrapperCol={{
              span: offsets[1],
            }}
            // style={{
            //   maxWidth: 600,
            // }}
            initialValues={{
              username: userInfo.user_name,
              phone: userInfo.phone,
              email: userInfo.email,
              // password:
            }}
            onFinish={onUpdateFinish}
            onFinishFailed={onUpdateFinishFailed}
            autoComplete='off'>
            {/* Update info */}
            <Form.Item
              wrapperCol={{
                offset: offsets[0],
                span: offsets[1],
              }}>
              <div className='hint-head'>Update Information</div>
            </Form.Item>

            {/* upload avatar */}

            {/* Username */}
            <Form.Item
              label='Username'
              name='username'
              rules={[
                {
                  required: true,
                  message: 'Please input your username!',
                },
              ]}>
              <Input className='signup-input' />
            </Form.Item>

            {/* Phone */}
            <Form.Item
              label='Phone'
              name='phone'
              rules={[
                {
                  required: false,
                },
                {
                  pattern: checkUKPhoneFormat(true),
                  message: 'Invalid UK phone number!',
                },
              ]}>
              <Input className='signup-input' />
            </Form.Item>

            {/* Email */}
            <Form.Item
              label='Email'
              name='email'
              rules={[
                {
                  required: true,
                  message: 'Please input your email!',
                },
                {
                  pattern: checkEmailFormat(true),
                  message: 'Please enter the correct email format',
                },
              ]}>
              <Input className='signup-input' />
            </Form.Item>

            {/* update btn */}
            <Form.Item
              wrapperCol={{
                offset: offsets[0],
                span: offsets[1],
              }}>
              <Button className='update-btn' type='primary' htmlType='submit'>
                Update
              </Button>
            </Form.Item>
          </Form>
        ) : (
          ''
        )}
      </div>

      <div className='change-pwd'>
        {userInfo ? (
          <Form
            form={form}
            name='changePwd'
            labelCol={{
              span: offsets[0],
            }}
            wrapperCol={{
              span: offsets[1],
            }}
            // style={{
            //   maxWidth: 600,
            // }}
            initialValues={{
              username: userInfo.user_name,
              phone: userInfo.phone,
              email: userInfo.email,
              // password:
            }}
            onFinish={onChangePwdFinish}
            onFinishFailed={onChangePwdFinishFailed}
            autoComplete='off'>
            {/* Change pwd */}
            <Form.Item
              wrapperCol={{
                offset: offsets[0],
                span: offsets[1],
              }}>
              <div className='hint-head'>Change Password</div>
            </Form.Item>
            {/* Password */}
            <Form.Item label='Password' name='password' rules={pwdFormatRules} hasFeedback>
              <Input.Password className='signup-input' placeholder='Password' />
            </Form.Item>

            {/* Confirm password */}
            <Form.Item
              label='Confirm Password'
              name='confirmPwd'
              dependencies={['password']}
              rules={[
                {
                  required: true,
                  message: 'Please confirm your password again!',
                },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue('password') === value) {
                      return Promise.resolve()
                    }
                    return Promise.reject(new Error('The two entered passwords do not match'))
                  },
                }),
              ]}
              hasFeedback>
              <Input.Password className='signup-input' placeholder='Password' />
            </Form.Item>

            {/* change btn */}
            <Form.Item
              wrapperCol={{
                offset: offsets[0],
                span: offsets[1],
              }}>
              <Button className='update-btn' type='primary' htmlType='submit'>
                Change
              </Button>
            </Form.Item>
          </Form>
        ) : (
          ''
        )}
      </div>
    </div>
  )
}

function Requests({ user_id }) {
  const [reqHistory, setReqHistory] = useState(null)
  const [selectedRowKeys, setSelectedRowKeys] = useState([])
  const data = useRef(null)

  const isNotified = useRef(false)
  const [api, contextHolder] = notification.useNotification()

  const notifyReview = item => {
    if (item.status == 'completed' && !item.isReviewed && !isNotified.current) {
      console.log('Your request has been completed, now make a review!')
      openNotification()
      isNotified.current = true
    }
  }

  const openNotification = () => {
    api.open({
      message: 'Notification Title',
      description:
        'This is the content of the notification. This is the content of the notification. This is the content of the notification.',
      duration: 0,
      className: 'custom-class',
      icon: <SmileOutlined style={{ color: '#108ee9' }} />,
      style: {
        top: 20,
        width: 300,
      },
    })
  }

  // const [_, forceUpdate] = useState()

  let ignore = false
  useEffect(() => {
    if (!ignore) {
      getRequestHistory(user_id).then(res => {
        // console.log('req history', res)
        data.current = res.map((item, index) => {
          notifyReview(item)

          return {
            key: index,
            req_id: item.req_id,
            req_time: item.req_time,
            status: item.status,
            price: item.price,
            desc: item.desc,
            srv_name: item.srv_name,
            prv_name: item.prv_name,
            isReviewed: item.isReviewed, // TODO: review flag
          }
        })

        // console.log(data.current)
        setReqHistory(res)
      })
    }

    return () => {
      ignore = true
    }
  }, [])

  // refresh
  useEffect(() => {
    const k = 10 * 1000 // 10s refresh
    const refresher = setInterval(() => {
      // console.log(Date.now())
      // console.log('refreshing...')
      // window.location.reload()
      // forceUpdate()

      getRequestHistory(user_id).then(res => {
        data.current = res.map((item, index) => {
          notifyReview(item)

          return {
            key: index,
            req_id: item.req_id,
            req_time: item.req_time,
            status: item.status,
            price: item.price,
            desc: item.desc,
            srv_name: item.srv_name,
            prv_name: item.prv_name,
            isReviewed: item.isReviewed, // TODO: review flag
          }
        })

        // console.log(data.current)
        setReqHistory(res)
      })
    }, k)

    return () => {
      clearInterval(refresher)
    }
  }, [])

  const columns = [
    {
      title: 'ID',
      dataIndex: 'req_id',
    },
    {
      title: 'Time',
      dataIndex: 'req_time',
    },
    {
      title: 'Status',
      dataIndex: 'status',
    },
    {
      title: 'Price',
      dataIndex: 'price',
    },
    {
      title: 'Description',
      dataIndex: 'desc',
    },
    {
      title: 'Service',
      dataIndex: 'srv_name',
    },
    {
      title: 'Provider',
      dataIndex: 'prv_name',
    },
  ]

  const onSelectChange = newSelectedRowKeys => {
    console.log('selectedRowKeys changed: ', newSelectedRowKeys)
    setSelectedRowKeys(newSelectedRowKeys)
  }
  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  }

  return (
    <div className='req-history'>
      {contextHolder}
      {reqHistory ? <Table rowSelection={rowSelection} columns={columns} dataSource={data.current} /> : ''}
    </div>
  )
}

export default function CustomerPage() {
  const { user_id, activeTab } = useParams()

  console.log(user_id)

  const tabItems = [
    {
      key: 'profile',
      label: 'My Profile',
      children: <Profile user_id={user_id} />,
    },
    {
      key: 'requests',
      label: 'My Requests',
      children: <Requests user_id={user_id} />,
    },
    {
      key: 'notifications',
      label: 'Notafications',
      children: <div>Notafications</div>,
    },
  ]

  const navigate = useNavigate()
  const [activeKey, setActiveKey] = useState(activeTab)

  const handleTabChange = key => {
    setActiveKey(key)
    navigate(`/mypage/${user_id}/${key}`)
  }

  return (
    <div className='customer-page'>
      <StatusBar />
      <Row justify='center'>
        <Col span={20} className='tabs'>
          <Tabs activeKey={activeKey} onChange={handleTabChange} items={tabItems} />
        </Col>
      </Row>
    </div>
  )
}
