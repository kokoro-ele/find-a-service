import '../css/Login.scss'
import { Carousel, Col, Row } from 'antd'
import { Button, Form, Input, Radio } from 'antd'
import { useState } from 'react'
import { getAuth, onAuthStateChanged, signInWithEmailAndPassword } from 'firebase/auth'
import { useNavigate } from 'react-router-dom'
import { encrypt, decrypt } from '../utils/RGEncrypt'

function LoginForm() {
  const navigate = useNavigate()
  const [radioValue, setRadioValue] = useState(1)
  const auth = getAuth()

  const handleRadioChange = e => {
    console.log('radio checked', e.target.value)
    setRadioValue(e.target.value)
  }

  const onFinish = values => {
    console.log('Success:', values)
    const email = values.username
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
            // TODO: 加密后再存储
            localStorage.setItem('f-a-s:' + user.uid, encrypt(user))
          } else {
            console.warn(user)
            localStorage.removeItem(user.uid)
          }
        })

        // TODO: 登陆后跳转
        if (radioValue === 2) navigate('/service-provider')
        if (radioValue === 3) navigate('/admin')
      })
      .catch(error => {
        const errorCode = error.code
        const errorMessage = error.message
        console.log('Login failed: ', errorCode, errorMessage)
      })
  }
  const onFinishFailed = errorInfo => {
    console.log('Failed:', errorInfo)
  }

  return (
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
      <Form.Item
        // label='Username'
        name='username'
        rules={[
          {
            required: true,
            message: 'Please input your username!',
          },
        ]}>
        <Input className='login-input' placeholder='email@mail.com' />
      </Form.Item>

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

      <Form.Item>
        No Account?
        <a className='create-one' href='/sign-up'>
          {' '}
          Create one!
        </a>
      </Form.Item>

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
