import React from 'react'
import { VerticalTimeline, VerticalTimelineElement } from 'react-vertical-timeline-component'
import { motion } from 'framer-motion'
import { CheckCircleOutlined } from '@ant-design/icons'
import 'react-vertical-timeline-component/style.min.css'
import { Button, Row, Col } from 'antd'
import RequestInfo from '../components/RequestInfo'
import constructStepData from '../utils/ConstructStepData'
import { textVariant } from '../utils/motion'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import '../css/RequestDetail.scss'
import { getRecommendServices, getRequestById } from '../utils/FirebaseAPI'
import { updateRequestById } from '../utils/FirebaseAPI'
import { format } from 'crypto-js'
const Statusline = ({ params, step }) => {
  const changeStatus = async selection => {
    console.log('change status', params, params.id)
    if (selection === 'accept') {
      await updateRequestById(params.id, { status: 'accepted' })
    } else if (selection === 'reject') {
      await updateRequestById(params.id, { status: 'rejected' })
    } else if (selection === 'detail') {
      await updateRequestById(params.id, { status: 'needDetail' })
    }
    window.location.reload()
  }

  return (
    <VerticalTimelineElement
      contentStyle={{
        background: '#1d1836',
        color: '#fff',
      }}
      contentArrowStyle={{ borderRight: '7px solid  #232631' }}
      // date={status.date}
      // iconStyle={{ background: status.iconBg }}
      icon={<CheckCircleOutlined style={{ width: '100%', height: '100%' }} />}>
      <div>
        <h3 className='text-xl font-bold'>{step.title}</h3>
        <h4> {step.description}</h4>
      </div>
      {step.title === 'Pending' && step.cur && (
        <div>
          <Button onClick={() => changeStatus('accept')}>Accept</Button>
          <Button onClick={() => changeStatus('reject')}>Reject</Button>
          <Button onClick={() => changeStatus('detail')}>Need more detail</Button>
        </div>
      )}
    </VerticalTimelineElement>
  )
}

const RequestDetail = () => {
  const [request, setRequest] = useState(null)
  const [steps, setSteps] = useState(constructStepData('pending'))
  const params = useParams()
  // console.log('in request detail', params, params.id)
  useEffect(() => {
    getRequestById(params.id).then(res => {
      const data = res.data()
      console.log('in reqeust detail getrequestbyid', data)
      console.log(data)
      setRequest(data)
      setSteps(constructStepData(data.status))
      // console.log(constructStepData('pending')[0].description)
    })
  }, [])
  return (
    <div className='requestdetail-container'>
      <Row className='requestdetail-card-container'>
        <Col span={8}>
          <RequestInfo className='requestdetail-card' data={request} />
        </Col>
      </Row>
      <Row>
        <Col span={24}>
          <div className='mt-20 flex flex-col'>
            <VerticalTimeline>
              {steps.map((s, index) => (
                <Statusline key={`status-${index}`} params={params} step={s} />
              ))}
            </VerticalTimeline>
          </div>
        </Col>
      </Row>
    </div>
  )
}

export default RequestDetail
