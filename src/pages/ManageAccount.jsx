/*
 * @Author: kokoro
 * @Date: 2023-04-07 00:16:26
 * @LastEditors: kokoro
 * @LastEditTime: 2023-04-19 23:55:05
 * @Description: 请填写简介
 */
import React from 'react'
import { Button, Checkbox, Form, Input } from 'antd'
import openNotification from '../components/Notification'
import { addServiceProvider } from '../utils/FirebaseAPI'
const onFinish = values => {
  const docRef = addServiceProvider(values)
  if (docRef) {
    console.log('Success:', values)
    openNotification('Notification', 'Account created!')
  } else {
    console.log('Failed:', values)
    openNotification('Notification', 'Failed')
  }
}
const onFinishFailed = errorInfo => {
  console.log('Failed:', errorInfo)
}
const ManageAccount = () => (
  <Form
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
    initialValues={{
      discription: '',
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
      <Input />
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
      <Input.Password />
    </Form.Item>

    <Form.Item
      label='Discription'
      name='Discription'
      rules={[
        {
          required: false,
          message: 'Please input your discription!',
        },
      ]}>
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
        Submit
      </Button>
    </Form.Item>
  </Form>
)
export default ManageAccount
