import { Carousel, Row, Col, Rate } from 'antd'
import react, { useState, useEffect } from 'react'
import { getLoginUserId } from '../utils/LoginInfo'
import {
  getServiceProviderById,
  getRequestCountByProviderId,
  getStatusRequestCountByProviderId,
  getServiceCountByProviderId,
} from '../utils/FirebaseAPI'
import '../css/ServiceProviderBusinessData.scss'
import { PieChart } from 'react-minimal-pie-chart'
const ServiceProviderBusinessData = () => {
  const loginUserId = getLoginUserId()
  const [user, setUser] = useState({})
  const [requestCount, setRequestCount] = useState(0)
  const [statusRequestCount, setStatusRequestCount] = useState([30, 30, 30])
  const [serviceCount, setServiceCount] = useState(0)
  const dataEntry = [
    { title: 'Pending', value: statusRequestCount[0], color: '#E38627' },
    { title: 'Working', value: statusRequestCount[1], color: '#C13C37' },
    { title: 'Completed', value: statusRequestCount[2], color: '#6A2135' },
  ]
  useEffect(() => {
    getServiceProviderById(loginUserId).then(res => {
      setUser(res)
    })
    getRequestCountByProviderId(loginUserId).then(res => {
      setRequestCount(res)
    })
    getServiceCountByProviderId(loginUserId).then(res => {
      setServiceCount(res)
    })
    getStatusRequestCountByProviderId(loginUserId).then(res => {
      setStatusRequestCount(res)
    })
  }, [])

  return (
    <div>
      <Row>
        <Col span={12}>
          <Carousel autoplay>
            {user.imgs?.map((item, index) => {
              return (
                <img
                  style={{ width: '100%', height: '100px', objectFit: 'cover' }}
                  key={'img ' + 'index'}
                  src={item}
                  alt='img'
                />
              )
            })}
          </Carousel>
        </Col>
        <Col span={12}>
          <div className='service-data'>
            <h3 className='line-h3'>My services</h3>
            <h3 className='line-h3'>Total:</h3>
            <h3 className='line-h3'>{serviceCount}</h3>
            <h3 className='line-h3'>Average rating:</h3>
            <Rate allowHalf value={4.3} />
          </div>
        </Col>
      </Row>
      <Row>
        <Col span={24}>
          <div className='request-data'>
            <h3>My requests</h3>
            <Row>
              <Col span={12}>
                <div className='request-numeric-data'>
                  <h3 className='line-h3'>Total:</h3>
                  <h3 className='line-h3'>{requestCount}</h3>
                  <h3 className='line-h3'>Pending: {statusRequestCount[0]}</h3>
                  <h3 className='line-h3'>Working:{statusRequestCount[1]}</h3>
                  <h3 className='line-h3'>Completed:{statusRequestCount[2]}</h3>
                </div>
              </Col>
              <Col span={12}>
                <div className='request-pie-data'>
                  <PieChart
                    labelPosition={80}
                    animate={true}
                    style={{ height: '200px' }}
                    totalValue={requestCount}
                    lineWidth={70}
                    data={dataEntry}
                    label={({ dataEntry }) => dataEntry.title}
                  />
                  ;
                </div>
              </Col>
            </Row>
          </div>
        </Col>
      </Row>
    </div>
  )
}

export default ServiceProviderBusinessData
