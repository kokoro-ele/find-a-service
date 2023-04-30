import '../css/Login.scss'
import { Carousel, Col, Modal, Row } from 'antd'
import { Button, Form, Input, Radio } from 'antd'
import { useState } from 'react'
import { getAuth, onAuthStateChanged, signInWithEmailAndPassword } from 'firebase/auth'
import { useNavigate } from 'react-router-dom'
import { encrypt } from '../utils/RGEncrypt'
import { checkEmailFormat } from '../utils/FormatChecker'

function LoginForm() {
  const navigate = useNavigate()
  const [radioValue, setRadioValue] = useState(1)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const auth = getAuth()

  // popup Modal controls
  // START
  const showModal = () => {
    setIsModalOpen(true)
  }

  const handleOk = () => {
    setIsModalOpen(false)
    // redirect('/login')
    // navigate('/login')
  }
  const handleCancel = () => {
    setIsModalOpen(false)
  }
  // END

  // TODO: 处理 user type
  const handleRadioChange = e => {
    console.log('radio checked', e.target.value)
    setRadioValue(e.target.value)
  }

  const onFinish = values => {
    console.log('Success:', values)
    const email = values.email
    const password = values.password

    signInWithEmailAndPassword(auth, email, password)
      .then(userCredential => {
        // Signed in
        const user = userCredential.user
        //..
        console.log('Login successed: ', user)
        // TODO: 验证邮箱
        onAuthStateChanged(auth, user => {
          if (user) {
            console.log(user)
            console.log(encrypt(user))
            // HINT: 加密后再存储
            localStorage.setItem(user.uid, encrypt(user))
          } else {
            console.warn(user)
            localStorage.removeItem(user.uid)
          }
        })

        // TODO: 登陆后跳转 [Customer -> customer-signup, Provider -> provider-signup]
        navigate('/service-find')
      })
      .catch(error => {
        const errorCode = error.code
        const errorMessage = error.message
        console.log('Login failed: ', errorCode, errorMessage)
        showModal()
      })
  }
  const onFinishFailed = errorInfo => {
    console.log('Failed:', errorInfo)
  }

  return (
    <>
      <Form
        name='basic'
        labelCol={{
          span: 6,
        }}
        wrapperCol={{
          span: 16,
        }}
        // style={{
        //   maxWidth: 600,
        // }}
        initialValues={{
          remember: true,
        }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete='off'>
        {/* Email */}
        <Form.Item
          // label='Username'
          name='email'
          rules={[
            {
              required: true,
              message: 'Please input your email!!',
            },
            {
              pattern: checkEmailFormat(true),
              message: 'Invalid email format!',
            },
          ]}>
          <Input className='login-input' placeholder='email@mail.com' />
        </Form.Item>

        {/* Password */}
        <Form.Item
          // label='Password'
          name='password'
          rules={[
            {
              required: true,
              message: 'Please input your password!',
            },
          ]}>
          <Input.Password className='login-input' placeholder='Password' />
        </Form.Item>

        {/* User type */}
        <Form.Item
          // label='User type'
          wrapperCol={{
            span: 24,
          }}>
          <Radio.Group onChange={handleRadioChange} value={radioValue}>
            <Radio value={1}>Customer</Radio>
            <Radio value={2}>Provider</Radio>
            <Radio value={3}>Admin</Radio>
          </Radio.Group>
        </Form.Item>

        {/* No Account Create */}
        <Form.Item>
          No Account?
          {/* TODO: 根据身份跳转不同登陆页面, href 通过 handleRadioChange 传值 */}
          <a className='create-one' href='/customer-signup'>
            {' '}
            Create one!
          </a>
        </Form.Item>

        {/* Login btn */}
        <Form.Item
          wrapperCol={{
            // offset: 6,
            span: 24,
          }}>
          <Button className='login-btn' type='primary' htmlType='submit'>
            Login!
          </Button>
        </Form.Item>
      </Form>

      {/* Popup Modal */}
      <Modal title='Note' style={{ top: 200 }} open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
        Incorrect account or password, please try again!
      </Modal>
    </>
  )
}

export default function LoginPage() {
  return (
    <div className='login'>
      <Row align='middle'>
        <Col span={16}>
          <div className='img-box'>
            <Carousel autoplay>
              <img
                src='https://firebasestorage.googleapis.com/v0/b/test-36dcf.appspot.com/o/images%2FClean4.png?alt=media&token=15035f3e-f818-4ce7-9d0c-68e78f6da207'
                alt=''
              />
              <img
                src='https://firebasestorage.googleapis.com/v0/b/test-36dcf.appspot.com/o/images%2FClean3.png?alt=media&token=35523b64-6fb8-4e02-8cc8-880d3aa53724'
                alt=''
              />
              <img
                src='https://firebasestorage.googleapis.com/v0/b/test-36dcf.appspot.com/o/images%2FClean2.png?alt=media&token=a88307aa-c6c8-4301-acaf-b292619d9938'
                alt=''
              />
            </Carousel>
          </div>
        </Col>
        <Col span={8}>
          <div className='login-box'>
            <div className='form'>
              <LoginForm />
            </div>
          </div>
        </Col>
      </Row>
    </div>
  )
}
