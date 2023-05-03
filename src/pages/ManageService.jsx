/*
 * @Author: kokoro
 * @Date: 2023-04-07 00:16:39
 * @LastEditors: kokoro
 * @LastEditTime: 2023-04-21 00:12:00
 * @Description: 请填写简介
 */
import { Avatar, Button, List, Skeleton, Image, Row, Col } from 'antd'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Card from '../components/Card'
import {
  deleteService,
  getServicesByServiceProvider,
  getServicesByServiceProviderId,
  getAllServices,
} from '../utils/FirebaseAPI'
import openNotification from '../components/Notification'
import { addFakeData } from '../utils/FirebaseAPI'
import { getLoginUserId } from '../utils/LoginInfo'
import '../css/ManageService.scss'
const ManageService = () => {
  const [loginUserId, setLoginUserId] = useState(getLoginUserId())
  const [services, setServices] = useState([])

  useEffect(() => {
    // addFakeData(3)
    //后期要从登录状态换取当前登录的provider
    getServicesByServiceProviderId(loginUserId).then(data => {
      console.log(data)
      setServices(data)
      // console.log(data)
    })
  }, [])

  return (
    <div className='service-area'>
      <div>
        <Row gutter={[16, 16]}>
          {services &&
            services.map((service, index) => (
              <Col key={index} xs={24} sm={12} md={8} lg={6}>
                <Link to={'/service-provider/edit-service/' + service.srv_id}>
                  <Card key={`card-${index}`} data={service} />
                </Link>
              </Col>
            ))}
        </Row>
      </div>

      <Button href='/service-provider/add-service'>Add </Button>
    </div>
  )
}
export default ManageService
