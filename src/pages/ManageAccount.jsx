/*
 * @Author: kokoro
 * @Date: 2023-04-07 00:16:26
 * @LastEditors: kokoro
 * @LastEditTime: 2023-04-19 23:55:05
 * @Description: 请填写简介
 */
import React from 'react'
import { Button, Avatar, Form, Input, Row, Col } from 'antd'
import openNotification from '../components/Notification'
import { addServiceProvider } from '../utils/FirebaseAPI'
import { useEffect, useRef, useState } from 'react'
import { getServiceProviderById, updateServiceProviderById } from '../utils/FirebaseAPI'
import { getLoginUserId } from '../utils/LoginInfo'
import '../css/ManageAccount.scss'

const ManageAccount = () => {
  const loginUserId = getLoginUserId()
  const [avatarSrc, setAvatarSrc] = useState('')
  const formRef = useRef(null)
  const onFinish = values => {
    const docRef = updateServiceProviderById(loginUserId, values)
    if (docRef) {
      console.log('Success:', values)
      openNotification('Notification', 'Change saved!')
    } else {
      console.log('Failed:', values)
      openNotification('Notification', 'Failed')
    }
  }
  const onFinishFailed = errorInfo => {
    console.log('Failed:', errorInfo)
  }

  useEffect(() => {
    getServiceProviderById(loginUserId).then(doc => {
      console.log('get login user info', doc)
      formRef.current.setFieldsValue({
        prv_name: doc.prv_name,
        password: doc.password,
        description: doc.description,
        Address: doc.location.txt,
        Email: doc.email,
      })
      console.log(doc.avatar[0])
      setAvatarSrc(doc.avatar[0])
    })
  }, [])

  console.log('get login user info', loginUserId)
  return (
    <div className='account-container'>
      <Form
        ref={formRef}
        name='basic'
        labelCol={{
          span: 8,
        }}
        wrapperCol={{
          span: 16,
        }}
        style={{
          maxWidth: 600,
        }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete='off'>
        <Row className='center-row'>
          <Avatar src={avatarSrc} size={64} />
        </Row>

        <Row>
          <Form.Item
            label='Username'
            name='prv_name'
            rules={[
              {
                required: true,
                message: 'Please input your username!',
              },
            ]}>
            <Input />
          </Form.Item>
        </Row>

        <Form.Item
          label='Password'
          name='password'
          rules={[
            {
              required: true,
              message: 'Please input your password!',
            },
          ]}>
          <Input.Password />
        </Form.Item>

        <Form.Item label='Description' name='description'>
          <Input />
        </Form.Item>

        <Form.Item
          label='Address'
          name='Address'
          rules={[
            {
              required: true,
              message: 'Please input your address!',
            },
          ]}>
          <Input />
        </Form.Item>
        <Form.Item
          label='Email'
          name='Email'
          rules={[
            {
              required: true,
              message: 'Please input your username!',
            },
          ]}>
          <Input />
        </Form.Item>

        <Form.Item
          wrapperCol={{
            offset: 8,
            span: 16,
          }}>
          <Button type='primary' htmlType='submit'>
            Save
          </Button>
        </Form.Item>
      </Form>
    </div>
  )
}
export default ManageAccount
