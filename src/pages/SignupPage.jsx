import { Col, Modal, Row, message } from 'antd'
import { Button, Form, Input, Radio } from 'antd'
import { useState } from 'react'
import '../css/Signup.scss'
import { getAuth, createUserWithEmailAndPassword, sendEmailVerification } from 'firebase/auth'
import { redirect, useNavigate } from 'react-router-dom'

function SignupForm() {
  const navigate = useNavigate()
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [popupMsg, setPopupMsg] = useState('Successfully create your account! Now login!')

  const auth = getAuth()

  const showModal = () => {
    setIsModalOpen(true)
  }

  const handleOk = () => {
    setIsModalOpen(false)
    // redirect('/login')
    navigate('/login')
  }
  const handleCancel = () => {
    setIsModalOpen(false)
  }

  const onFinish = values => {
    console.log('Success:', values)
    const email = values.email
    const password = values.password

    createUserWithEmailAndPassword(auth, email, password)
      .then(userCredential => {
        // Signed in
        const user = userCredential.user
        // ...
        console.log('Successfully created user: ', user)
        sendEmailVerification(user)
        console.log('Sending verifying email...')
        // open modal
        showModal()
      })
      .catch(error => {
        const errorCode = error.code
        const errorMessage = error.message
        console.log('Err on creating user:', error.code, error.message)
        setPopupMsg('Oops, it seems you have already signed up. Just login!')
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
          span: 8,
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
          label='Username'
          name='username'
          rules={[
            {
              required: true,
              message: 'Please input your username!',
            },
          ]}>
          <Input className='signup-input' placeholder='Ross' />
        </Form.Item>
        <Form.Item
          label='Phone'
          name='phone'
          rules={[
            {
              required: false,
            },
          ]}>
          <Input className='signup-input' placeholder='07579969581' />
        </Form.Item>
        <Form.Item
          label='Email'
          name='email'
          rules={[
            {
              required: true,
              message: 'Please input your email!',
            },
          ]}>
          <Input className='signup-input' placeholder='email@mail.com' />
        </Form.Item>
        <Form.Item
          label='Password'
          name='password'
          rules={[
            {
              required: true,
              message: 'Please input your password!',
            },
          ]}>
          <Input.Password className='signup-input' placeholder='Password' />
        </Form.Item>
        <Form.Item
          label='Confirm Password'
          name='confirm-pwd'
          rules={[
            {
              required: true,
              message: 'Please input your password!',
            },
          ]}>
          <Input.Password className='signup-input' placeholder='Password' />
        </Form.Item>
        <Form.Item
          wrapperCol={{
            offset: 8,
            span: 24,
          }}>
          Already have one?
          <a className='create-one' href='/login'>
            {' '}
            Just login!
          </a>
        </Form.Item>
        <Form.Item
          wrapperCol={{
            offset: 8,
            span: 24,
          }}>
          <Button className='create-btn' type='primary' htmlType='submit'>
            Create!
          </Button>
        </Form.Item>{' '}
      </Form>
      <Modal title='Note' open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
        {popupMsg}
      </Modal>
    </>
  )
}

export default function SignupPage() {
  return (
    <div className='sign-up'>
      <Row justify='center'>
        <Col span={8} className='form-container'>
          <div className='form-container'>
            <Row justify='center'>
              <Col>
                <div className='signup-title'>Customer Sign up</div>
              </Col>
            </Row>
            <SignupForm />
          </div>
        </Col>
      </Row>
    </div>
  )
}
