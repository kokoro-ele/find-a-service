import { Col, Modal, Row, message } from 'antd'
import { Button, Form, Input, Radio } from 'antd'
import { useState } from 'react'
import '../css/Signup.scss'
import { getAuth, createUserWithEmailAndPassword, sendEmailVerification } from 'firebase/auth'
import { redirect, useNavigate } from 'react-router-dom'
import { addCustomer } from '../utils/FirebaseAPI'
import { checkPasswordFormat } from '../utils/FormatChecker'

function SignupForm() {
  const navigate = useNavigate()
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [popupMsg, setPopupMsg] = useState('Successfully create your account! Now login!')

  const [form] = Form.useForm()

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

  // Format checks
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

  const onFinish = values => {
    console.log('Success:', values)

    const userData = {
      user_id: '', // use firebase-auth.uid later
      user_name: values.username,
      email: values.email,
      phone: values.phone,
      location: {
        // handle later
        txt: 'Unselected yet',
        gps: [null, null],
      },
      avatar: null, // handle later
    }

    createUserWithEmailAndPassword(auth, values.email, values.password)
      .then(userCredential => {
        // Signed in
        const user = userCredential.user
        userData.user_id = user.uid

        console.log('Successfully created user: ', user)

        console.log('Sending verifying email...')
        sendEmailVerification(user)

        // add user into Customer collection
        addCustomer(userData).then(res => console.log('Add done'))

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
        form={form}
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
          <Input className='signup-input' placeholder='Ross' />
        </Form.Item>

        {/* Phone */}
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

        {/* Email */}
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

        {/* Password */}
        <Form.Item
          label='Password'
          name='password'
          rules={pwdFormatRules}
          // rules={[{ validator: handlePwdCheck }]}
          // validateTrigger={['onBlur', 'onChange']}
          // hasFeedback
          // validateStatus={pwdStatus}
          // help={pwdStatus === 'err' ? 'PWD ERRRRR!' : ''} // TODO: change hint
        >
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

        {/* Already have one */}
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
        {/* Create btn */}
        <Form.Item
          wrapperCol={{
            offset: 8,
            span: 24,
          }}>
          <Button className='create-btn' type='primary' htmlType='submit'>
            Create!
          </Button>
        </Form.Item>
      </Form>

      {/* Popup Modal */}
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
