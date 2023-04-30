import { InboxOutlined, UploadOutlined } from '@ant-design/icons'
import { useState, useRef } from 'react'
import GoogleMapReact from 'google-map-react'
import {
  Button,
  Checkbox,
  Col,
  Form,
  InputNumber,
  Radio,
  Rate,
  Row,
  Select,
  Slider,
  Space,
  Divider,
  Switch,
  Upload,
  Calendar,
  theme,
  Input,
} from 'antd'

import { uploadImage, addService, uploadVideo, addFakeRequestData } from '../utils/FirebaseAPI'
const { Option } = Select
const formItemLayout = {
  labelCol: {
    span: 6,
  },
  wrapperCol: {
    span: 20,
  },
}
const normFile = e => {
  console.log('Upload event:', e)
  if (Array.isArray(e)) {
    return e
  }
  return e?.fileList
}

const Marker = ({ text }) => (
  <div>
    <i
      style={{
        width: '5px',
        height: '5px',
        radius: '50%',
        background: 'black',
        display: 'block',
      }}></i>
    {text}
  </div>
)
const onPanelChange = newValue => {
  console.log(newValue)
}
const AddService = () => {
  const onFinish = values => {
    addFakeRequestData(3)
    console.log('Received values of form: ', values)
    addService({
      ...values,
      srv_id: 'tobegenerated',
      prv_id: 'imid',
      prv_name: 'imname',
      location: { txt: values.location, gps: [gps.lng, gps.lat] },
      imgs: imagesList,
      videos: videosList,
    })
    console.log({
      ...values,
      srv_id: 'tobegenerated',
      prv_id: 'imid',
      prv_name: 'imname',
      location: { txt: values.location, gps: gps },
      imgs: imagesList,
      videos: videosList,
    })
  }
  const [imagesList, setImagesList] = useState([])
  const [videosList, setVideosList] = useState([])
  const [gps, setGPS] = useState({ lat: 50.911, lng: -1.4 })
  const [marker, setMarker] = useState(false)
  const serviceCategories = ['Cleaning', ' Babysitting', 'Pest control', 'Plumbing', 'Electrical repairs', 'Beauty']
  // get the mapref
  const mapRef = useRef(null)

  const plainOptions = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
  const defaultCheckedList = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri']

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

  const onMapClicked = value => {
    console.log()
    setGPS({ lat: value.lat, lng: value.lng })
    setMarker(true)
  }

  const onMarkerClick = () => {
    console.log('Marker clicked')
  }

  return (
    <Form
      name='validate_other'
      {...formItemLayout}
      onFinish={onFinish}
      style={{
        width: '80%',
      }}
      layout='horizontal'>
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
          <Form.Item name='category' label='Category'>
            <Select placeholder='Please select a category'>
              {serviceCategories.map((category, index) => (
                <Option key={index} value={category}>
                  {category}
                </Option>
              ))}
            </Select>
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item name='total' label='Capicity'>
            <InputNumber control='true' min={1} />
          </Form.Item>
        </Col>
      </Row>
      {/* use calendar to set available_time ,which is an array*/}
      <Row>
        <Col span={12} style={{ padding: '5px', border: '1px solid #d9d9d9', borderRadius: 4 }}>
          <Calendar fullscreen={false} onPanelChange={onPanelChange} />
        </Col>
        <Col span={12}>
          <Form.Item name='available_time' label='Available Time'>
            <Checkbox.Group options={plainOptions} defaultValue={defaultCheckedList} layout='vertical' />
          </Form.Item>
        </Col>
      </Row>
      {/* use googlemapreact to get location, location:{txt:"",gps:[x,y]} */}

      <Row>
        <Col span={12} style={{ height: '300px' }}>
          <GoogleMapReact
            ref={mapRef}
            bootstrapURLKeys={{ key: 'AIzaSyArC2oFHyAeSCPIK6AAMbghWW5fL2jExqY' }}
            defaultCenter={{ lat: 50.911, lng: -1.4 }}
            defaultZoom={15}
            onClick={onMapClicked}>
            {marker && <Marker lat={gps.lat} lng={gps.lng} text="I'm here" />}
          </GoogleMapReact>
        </Col>
        <Col span={12}>
          {/* Show the selected location */}
          <Form.Item name='location' label='Location'>
            <Input placeholder='Please enter the location the service covers' />
          </Form.Item>
          {/* show the current gps */}
          <div>
            Selected GPS: lag:<span>{gps.lat}</span>
            <br />
            lng:{gps.lng}
          </div>
        </Col>
      </Row>

      <Row>
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
      </Row>

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
  )
}
export default AddService
