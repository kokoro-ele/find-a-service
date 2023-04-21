/*
 * @Author: kokoro
 * @Date: 2023-04-09 21:42:50
 * @LastEditors: kokoro
 * @LastEditTime: 2023-04-21 00:17:41
 * @Description: 请填写简介
 */
import React, { useState, useEffect, useRef } from 'react'
import { uploadImage, addService, getServicesById } from '../../utils/FirebaseAPI'
import { UploadOutlined } from '@ant-design/icons'
import { Button, Form, Input, Select, Upload, Modal, Image } from 'antd'
import { useParams, useLocation } from 'react-router-dom'

function AddService(props) {
  const [service, setService] = useState({
    title: 'default title',
    area: 'default',
    availability: 'default',
    discription: 'default dis',
    price: '45',
  })
  const [imagesList, setImagesList] = useState([])
  const isEdit = useRef(false)
  const location = useLocation()
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
  function onFinish(values) {
    addService({ ...values, serviceprovider: 'test', image: imagesList })
    showModal()
  }

  async function addToImageList(option) {
    try {
      const url = await uploadImage(option.file)
      console.log(url)
      setImagesList(preState => [...preState, url])
      option.onSuccess(url)
    } catch {
      //message("Failed uploading " + image.name);
    }
  }

  return (
    <div>
      <h1>Add</h1>
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
            name={'title'}
            noStyle
            rules={[
              {
                required: true,
                message: 'Title is required',
              },
            ]}>
            <Input
              style={{
                width: 160,
              }}
            />
          </Form.Item>
        </Form.Item>

        <Form.Item label='Discription'>
          <Form.Item
            name={'discription'}
            noStyle
            rules={[
              {
                required: true,
                message: 'Discription is required',
              },
            ]}>
            <Input
              style={{
                width: 160,
              }}
            />
          </Form.Item>
        </Form.Item>

        <Form.Item label='Price (£ per hour)'>
          <Form.Item
            name={'price'}
            noStyle
            rules={[
              {
                required: false,
                message: 'Price is required',
              },
            ]}>
            <Input
              style={{
                width: '20%',
              }}
              placeholder='50'
            />
          </Form.Item>
        </Form.Item>

        <Form.Item label='Area'>
          <Form.Item
            name={'area'}
            noStyle
            rules={[
              {
                required: false,
                message: 'Area is required',
              },
            ]}>
            <Input
              style={{
                width: '50%',
              }}
              placeholder='114514'
            />
          </Form.Item>
        </Form.Item>

        <Form.Item label='Availability'>
          <Form.Item
            noStyle
            name={'availability'}
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

        <Form.Item label='Image'>
          <Form.Item valuePropName='fileList' getValueFromEvent={e => (Array.isArray(e) ? e : e && e.fileList)} noStyle>
            <Upload
              name='image'
              listType='picture'
              customRequest={addToImageList}
              beforeUpload={(file, fileList) => {
                return new Promise((resolve, reject) => {
                  console.log(fileList.length)
                  if (fileList.length > 3) {
                    console.log(1231231)
                    reject('You can upload atmost 3 images')
                  } else {
                    resolve('Success')
                  }
                })
              }}>
              <Button icon={<UploadOutlined />}>Click to upload</Button>
            </Upload>
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
        <p>Added Successfully! </p>
      </Modal>
    </div>
  )
}

export default AddService
