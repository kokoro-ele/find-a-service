/*
 * @Author: kokoro
 * @Date: 2023-04-09 21:42:50
 * @LastEditors: kokoro
 * @LastEditTime: 2023-04-21 17:14:46
 * @Description: 请填写简介
 */
import React, { useState, useEffect, useRef } from 'react'
import { updateServiceById, getServicesById } from '../../utils/FirebaseAPI'
import { Button, Form, Input, Select, Upload, Modal, Image } from 'antd'
import { useParams } from 'react-router-dom'

function EditService(props) {
  const [service, setService] = useState({
    title: 'default title',
    area: 'default',
    availability: 'default',
    discription: 'default dis',
    price: '45',
  })
  const params = useParams()
  const [isModalOpen, setIsModalOpen] = useState(false)
  const showModal = () => {
    setIsModalOpen(true)
  }
  const handleOk = () => {
    setIsModalOpen(false)
  }
  const handleCancel = () => {
    setIsModalOpen(false)
    window.location.href = '/service'
  }
  useEffect(() => {
    getServicesById(params.id).then(res => {
      const data = res.data()
      setService(data)
    })
  }, [])

  function onFinish() {
    updateServiceById(params.id, service)
    showModal()
  }

  return (
    <div>
      <h1>Edit</h1>
      <Form
        onFinish={onFinish}
        labelCol={{
          span: 8,
        }}
        wrapperCol={{
          span: 16,
        }}
        style={{
          maxWidth: 600,
        }}>
        <Form.Item label='Title'>
          <Form.Item
            noStyle
            rules={[
              {
                required: true,
                message: 'Title is required',
              },
            ]}>
            <Input
              value={service.title}
              style={{
                width: 160,
              }}
              onChange={e => {
                setService({ ...service, title: e.target.value })
              }}
            />
          </Form.Item>
        </Form.Item>

        <Form.Item label='Discription'>
          <Form.Item
            noStyle
            rules={[
              {
                required: true,
                message: 'Discription is required',
              },
            ]}>
            <Input
              value={service.discription}
              style={{
                width: 160,
              }}
              onChange={e => {
                setService({ ...service, discription: e.target.value })
              }}
            />
          </Form.Item>
        </Form.Item>

        <Form.Item label='Price (£ per hour)'>
          <Form.Item
            noStyle
            rules={[
              {
                required: false,
                message: 'Price is required',
              },
            ]}>
            <Input
              value={service.price}
              style={{
                width: '20%',
              }}
              placeholder='50'
              onChange={e => {
                setService({ ...service, price: e.target.value })
              }}
            />
          </Form.Item>
        </Form.Item>

        <Form.Item label='Area'>
          <Form.Item
            noStyle
            rules={[
              {
                required: false,
                message: 'Area is required',
              },
            ]}>
            <Input
              value={service.area}
              style={{
                width: '50%',
              }}
              onChange={e => {
                setService({ ...service, area: e.target.value })
              }}
              placeholder='114514'
            />
          </Form.Item>
        </Form.Item>

        <Form.Item label='Availability'>
          <Form.Item
            noStyle
            rules={[
              {
                required: false,
                message: 'availability is required',
              },
            ]}>
            <Input
              style={{
                width: '50%',
              }}
              value={service.availability}
              placeholder='114514'
              onChange={e => {
                setService({ ...service, availability: e.target.value })
              }}
            />
          </Form.Item>
        </Form.Item>

        <Form.Item label='Uploaded imagas'>
          <Form.Item noStyle>
            {service.image && service.image.map((url, index) => <Image width={100} src={url} key={'image-' + index} />)}
          </Form.Item>
        </Form.Item>

        <Form.Item>
          <Button type='primary' htmlType='submit'>
            Submit
          </Button>
        </Form.Item>
      </Form>

      <Modal
        title='Noficication'
        open={isModalOpen}
        okText='Stay'
        cancelText='Back to list'
        onOk={handleOk}
        onCancel={handleCancel}
        cancelType>
        <p>Saved Successfully! </p>
      </Modal>
    </div>
  )
}

export default EditService
