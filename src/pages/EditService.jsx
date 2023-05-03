/*
 * @Author: kokoro
 * @Date: 2023-04-09 21:42:50
 * @LastEditors: kokoro
 * @LastEditTime: 2023-04-21 17:14:46
 * @Description: 请填写简介
 */
import { InboxOutlined, UploadOutlined, PlusOutlined } from '@ant-design/icons'
import React, { useState, useEffect, useRef } from 'react'
import { updateServiceById, getServicesById } from '../utils/FirebaseAPI'
import GoogleMapReact from 'google-map-react'
import {
  Modal,
  Button,
  Checkbox,
  Col,
  Form,
  InputNumber,
  Radio,
  Rate,
  Divider,
  // Space,
  Row,
  Select,
  Slider,
  Space,
  // Divider,
  Switch,
  Upload,
  Calendar,
  theme,
  Input,
} from 'antd'
import { useParams, useNavigate } from 'react-router-dom'
import { getLoginUserId, getLoginUserName } from '../utils/LoginInfo'
import '../css/AddService.scss'
const { Option } = Select
const formItemLayout = {
  labelCol: {
    span: 6,
  },
  wrapperCol: {
    span: 20,
  },
}

const Marker = ({ text }) => (
  <div style={{ fontSize: '20px' }}>
    <i
      style={{
        width: '10px',
        height: '10px',
        radius: '50%',
        background: 'red',
        display: 'block',
      }}></i>
    {text}
  </div>
)
function EditService() {
  const [service, setService] = useState({})
  const params = useParams()

  const { TextArea } = Input
  const navigate = useNavigate()
  const formRef = useRef()
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [loginUserId, setLoginUserId] = useState(getLoginUserId())
  const [loginUserName, setLoginUserName] = useState('')
  const [geoCoder, setGeoCoder] = useState()
  const [items, setItems] = useState([
    'Cleaning',
    ' Babysitting',
    'Pest control',
    'Plumbing',
    'Electrical repairs',
    'Beauty',
  ])
  const [name, setName] = useState('')
  const [imagesList, setImagesList] = useState([])
  const [videosList, setVideosList] = useState([])
  const [gps, setGPS] = useState({ lat: 50.911, lng: -1.4 })
  const [marker, setMarker] = useState(false)
  const inputRef = useRef(null)

  const plainOptions = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
  const defaultCheckedList = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri']

  useEffect(() => {
    console.log('----', params, params.id)
    getServicesById(params.id).then(res => {
      const data = res.data()
      console.log('++++', data)
      setService(data)
      formRef.current.setFieldsValue({
        srv_name: data.srv_name,
        price: data.price,
        description: data.description,
        location: data.location.txt,
        category: data.category,
        duration: data.duration,
        total: data.total,
        // images: data.images,
        // videos: data.videos,
        // available: data.available,
        available_time: data.available_time,
        desc: data.desc,
        // available_day: data.available_day,
      })
    })
  }, [])

  const onNameChange = event => {
    setName(event.target.value)
  }

  const showModal = () => {
    setIsModalOpen(true)
  }
  const findGeo = async () => {
    const { results } = await geoCoder.geocode({ address: formRef.current.getFieldValue('location') })
    //setGPS({ lat: result[0].geometry.location.lat(), lng: result[0].geometry.location.lng() })
    console.log(results[0].geometry.location.lat(), results[0].geometry.location.lng())
    setGPS({ lat: results[0].geometry.location.lat(), lng: results[0].geometry.location.lng() })
    setMarker(true)
  }
  const addItem = e => {
    e.preventDefault()
    setItems([...items, name || `New item ${index++}`])
    setName('')
    setTimeout(() => {
      inputRef.current?.focus()
    }, 0)
  }
  const handleOk = () => {
    setIsModalOpen(false)
    // redirect('/login')
    navigate('/service-provider/manage-service')
  }
  const handleCancel = () => {
    setIsModalOpen(false)
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

  async function addToVideoList(option) {
    try {
      const url = await uploadVideo(option.file)
      console.log(url)
      setVideosList(preState => [...preState, url])
      option.onSuccess(url)
    } catch {
      //message("Failed uploading " + image.name);
    }
  }

  const onMapClicked = async value => {
    setGPS({ lat: value.lat, lng: value.lng })
    const { results } = await geoCoder.geocode({ location: { lat: value.lat, lng: value.lng } })
    //setGPS({ lat: result[0].geometry.location.lat(), lng: result[0].geometry.location.lng() })
    //console.log(results)
    formRef.current.setFieldsValue({ location: results[0].formatted_address })
    setMarker(true)
  }

  const handleApiLoaded = (map, maps) => {
    setGeoCoder(new maps.Geocoder())
  }

  function onFinish(values) {
    updateServiceById(params.id, {
      ...values,
      location: {
        txt: values.location,
        gps: gps,
      },
    })
    showModal()
  }

  return (
    <div className='add-service-area'>
      <Form
        name='validate_other'
        {...formItemLayout}
        onFinish={onFinish}
        ref={formRef}
        style={{
          width: '80%',
        }}
        layout='horizontal'>
        <div className='add-service-basic'>
          <Row className='add-service-head'>
            {/* <Col span={12}> */}
            <h1>{'Step 1: Basic Infomation'}</h1>
            {/* </Col> */}
          </Row>
          <Row>
            <Col span={12}>
              <Form.Item name='srv_name' label='Title'>
                <Input placeholder='Please enter the name of the service' />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item name='price' label='Price'>
                <InputNumber addonAfter='£' />
              </Form.Item>
            </Col>
          </Row>

          <Row>
            <Col span={12}>
              <Form.Item name='total' label='Capicity'>
                <InputNumber control='true' min={1} />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item name='duration' label='Duration'>
                <InputNumber control='true' min={1} addonAfter='min' />
              </Form.Item>
            </Col>
          </Row>

          <Row>
            <Col span={12}>
              <Form.Item name='category' label='Category'>
                <Select
                  style={{
                    width: 300,
                  }}
                  // placeholder='custom dropdown render'
                  dropdownRender={menu => (
                    <>
                      {menu}
                      <Divider
                        style={{
                          margin: '8px 0',
                        }}
                      />
                      <Space
                        style={{
                          padding: '0 8px 4px',
                        }}>
                        <Input placeholder='Please enter item' ref={inputRef} value={name} onChange={onNameChange} />
                        <Button type='text' icon={<PlusOutlined />} onClick={addItem}>
                          Add item
                        </Button>
                      </Space>
                    </>
                  )}
                  options={items.map(item => ({
                    label: item,
                    value: item,
                  }))}
                />
              </Form.Item>
            </Col>
          </Row>
          <Row>
            <Col span={12}>
              <Form.Item name='available_time' label='Time'>
                <Checkbox.Group options={plainOptions} defaultValue={defaultCheckedList} layout='vertical' />
              </Form.Item>
            </Col>
          </Row>
        </div>
        {/* use googlemapreact to get location, location:{txt:"",gps:[x,y]} */}

        <div className='add-service-location'>
          <Row className='add-service-head'>
            {/* <Col span={12}> */}
            <h1>{'Step 2: Location'}</h1>
            {/* </Col> */}
          </Row>
          <Row className='google-map-container'>
            {/* <Col span={12} style={{ height: '300px' }}> */}
            <GoogleMapReact
              bootstrapURLKeys={{ key: 'AIzaSyArC2oFHyAeSCPIK6AAMbghWW5fL2jExqY' }}
              defaultCenter={{ lat: 50.911, lng: -1.4 }}
              defaultZoom={15}
              center={gps}
              onClick={onMapClicked}
              yesIWantToUseGoogleMapApiInternals
              onGoogleApiLoaded={({ map, maps }) => handleApiLoaded(map, maps)}>
              {marker && <Marker lat={gps.lat} lng={gps.lng} text="I'm here" />}
            </GoogleMapReact>
            {/* </Col> */}
          </Row>
          <Row>
            <Col span={12}>
              {/* Show the selected location */}
              <Form.Item name='location' label='Location'>
                <Input placeholder='Please enter the address/postcode the service covers' />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Button onClick={findGeo}>Find!</Button>
            </Col>
            {/* show the current gps */}
            <Row>
              <div>
                Selected GPS: lag:<span>{gps.lat}</span>
                <span>lng:{gps.lng}</span>
              </div>
            </Row>
          </Row>
        </div>
        <div className='add-service-multimedia'>
          <Row className='add-service-head'>
            {/* <Col span={12}> */}
            <h1>{'Step 3: Describe the service'}</h1>
            {/* </Col> */}
          </Row>
          {/* <Row>
            <Col span={12}>
              <Form.Item label='Image'>
                <Form.Item
                  valuePropName='imageList'
                  getValueFromEvent={e => (Array.isArray(e) ? e : e && e.imageList)}
                  noStyle>
                  <Upload.Dragger name='image' listType='picture' customRequest={addToImageList}>
                    <Button icon={<UploadOutlined />}>Click to upload</Button>
                  </Upload.Dragger>
                </Form.Item>
              </Form.Item>
            </Col>
            <Col span={12}>
              {imagesList.map((file, index) => (
                <img
                  key={'preview-picture' + index}
                  src={file}
                  alt={file.name}
                  style={{ width: '100px', height: '100px', margin: '5px' }}
                />
              ))}
            </Col>
          </Row>

          <Row>
            <Col span={12}>
              <Form.Item label='Video'>
                <Form.Item
                  valuePropName='videoList'
                  getValueFromEvent={e => (Array.isArray(e) ? e : e && e.videoList)}
                  noStyle>
                  <Upload.Dragger name='video' listType='picture' customRequest={addToVideoList}>
                    <Button icon={<UploadOutlined />}>Click to upload</Button>
                  </Upload.Dragger>
                </Form.Item>
              </Form.Item>
            </Col>
            <Col span={12}></Col>
          </Row> */}
          <Row>
            <Col span={18}>
              <Form.Item name='desc' label='Desciption:'>
                <TextArea placeholder='Enter your description.' autoSize />
              </Form.Item>
            </Col>
          </Row>
        </div>
        <Form.Item
          wrapperCol={{
            span: 12,
            offset: 6,
          }}>
          <Space>
            <Button type='primary' htmlType='submit'>
              Submit
            </Button>
            <Button htmlType='reset'>reset</Button>
          </Space>
        </Form.Item>
      </Form>
      <Modal title='Note' open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
        {'Successfully saved your service! You can check it in by clicking OK'}
      </Modal>
    </div>
  )
}

export default EditService
