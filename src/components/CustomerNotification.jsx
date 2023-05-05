import { Col, List, Row, Avatar, Space, Rate, Modal, Input } from 'antd'
import { LikeOutlined, MessageOutlined, StarOutlined } from '@ant-design/icons'
const { TextArea } = Input
// import '../css/ServiceReview.scss'
import React, { useEffect, useRef, useState } from 'react'
import { timestamp2DateStr } from '../utils/TimeParser'
import '../css/ServiceReview.scss'
import { addReview, getNotifications, getReviews } from '../utils/FirebaseAPI'
import { useNavigate } from 'react-router-dom'

function MyList({ data }) {
  const navigate = useNavigate()
  const [isModalOpen, setIsModalOpen] = useState(false)
  const reviewBoxRef = useRef(null)
  const [reviewTxt, setReviewTxt] = useState(null)
  const [rateValue, setRateValue] = useState(null)
  const [reviewHead, setReviewHead] = useState(null)

  const { user_name, user_id, srv_id } = data[0]

  const handleItemClick = (event, itemData) => {
    console.log('List item clicked: ', event.target)
    console.log('Item data: ', itemData)

    // type=review, then write review in popup
    if (itemData.msg_type == 'review') {
      showModal()
    } else {
      // type=update, then redirect to updated service page
      navigate(itemData.jumpLink)
    }
  }

  // START: Modal ctrls
  const showModal = () => {
    setIsModalOpen(true)
  }
  const handleModalOk = () => {
    // setIsModalOpen(false)
    // TODO: publish review( add review into db)
    const rvwData = {
      rvw_id: null, // auto gen by firebase
      srv_id: srv_id,
      author: {
        user_id: user_id,
        user_name: user_name,
        user_avatar: null,
      },
      title: reviewHead,
      content: reviewTxt,
      rate: rateValue,
      likes: 0,
      date: Date.now(),
    }

    console.log('rwvData: ', rvwData)

    addReview(rvwData).then(_ => {
      console.log('Review added: ', _)
      setRateValue(0)
      setReviewTxt(null)
      setReviewHead(null)
    })
  }
  const handleModalCancel = () => {
    setRateValue(0)
    setReviewTxt(null)
    setReviewHead(null)
    setIsModalOpen(false)
  }

  const handleHeadChange = e => {
    const value = e.target.value
    setReviewHead(value)
  }

  const onTextChange = e => {
    const value = e.target.value
    setReviewTxt(value)
  }

  const handleRateChange = value => {
    console.log('Rate value: ', value)
    setRateValue(value)
  }
  //END: Modal ctrls

  return (
    <>
      <Modal title='✍️ Write your review here' open={isModalOpen} onOk={handleModalOk} onCancel={handleModalCancel}>
        <h3 style={{ marginTop: 10, marginBottom: 10 }}>Review Title:</h3>
        <Input placeholder='Your Review Title' value={reviewHead} onChange={handleHeadChange} />
        <h3 style={{ marginTop: 10, marginBottom: 10 }}>Review Content:</h3>
        <TextArea
          // showCount
          // maxLength={100}
          value={reviewTxt}
          ref={reviewBoxRef}
          style={{
            height: 100,
            resize: 'none',
          }}
          onChange={onTextChange}
          placeholder='Had great service? Give your valuable comments!'
        />
        <h3 style={{ marginTop: 10, marginBottom: 10 }}>Rate:</h3>
        <Rate allowHalf value={rateValue} onChange={handleRateChange} />
      </Modal>
      <List
        itemLayout='vertical'
        size='large'
        pagination={{
          onChange: page => {
            console.log(page)
          },
          pageSize: 3,
          align: 'center',
          style: {
            color: 'white',
          },
        }}
        dataSource={data}
        footer={
          <div style={{ color: 'black' }}>
            {/* TODO: add list footer */}
            <b>Find-A-Service</b> footer part
          </div>
        }
        renderItem={item => (
          <List.Item
            // onClick={handleItemClick} // HINT: 通过匿名函数传递参数
            onClick={event => {
              handleItemClick(event, item)
            }}
            style={{ borderColor: 'black', backgroundColor: 'aliceblue', borderRadius: 20 }}
            className='review-list-item'
            key={item.title}
            actions={[
              <div className='review-date' style={{ color: 'black' }}>
                {timestamp2DateStr(item.time)}
              </div>,
            ]}
            extra={''}>
            <List.Item.Meta
              // avatar={<Avatar src={item.author.user_avatar} />}
              title={<span style={{ color: 'black' }}>{item.msg_title}</span>}
              description={
                <div className='rate-area' style={{ color: 'black' }}>
                  {'@' + item.prv_name}
                </div>
              }
            />
            {<span style={{ color: 'black' }}>{item.msg_body}</span>}
          </List.Item>
        )}
      />
    </>
  )
}

export default function CustomerNotification() {
  const [data, setData] = useState(null)

  const user_id = 'xRv9DqSlQRcK7Mpd2Z98wCLYmPs1' // TODO: use localstorage
  // fetch notification data
  let ignore = false
  useEffect(() => {
    if (!ignore) {
      const getData = async () => {
        // TODO: change data source
        const notiData = await getNotifications(user_id)
        console.log('Notification data: ', notiData)
        setData(notiData)
      }

      getData()
    }

    return () => {
      ignore = true
    }
  }, [])

  return (
    <Row className='notification-list' justify='start'>
      <Col span={24}>{data ? <MyList data={data} /> : ''}</Col>
    </Row>
  )
}
