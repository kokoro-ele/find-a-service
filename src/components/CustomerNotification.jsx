import { Col, List, Row, Avatar, Space, Rate, Modal } from 'antd'
import { LikeOutlined, MessageOutlined, StarOutlined } from '@ant-design/icons'
// import '../css/ServiceReview.scss'
import React, { useEffect, useState } from 'react'
import { timestamp2DateStr } from '../utils/DataParser'
import '../css/ServiceReview.scss'
import { getReviews } from '../utils/FirebaseAPI'

function IconText({ icon, text }) {
  return (
    <Space>
      {React.createElement(icon)}
      {text}
    </Space>
  )
}

function MyList({ data }) {
  const [isModalOpen, setIsModalOpen] = useState(false)

  const handleItemClick = (event, itemData) => {
    console.log('List item clicked: ', event.target)
    console.log('Item data: ', itemData)
  }

  // START: Modal ctrls
  const showModal = () => {
    setIsModalOpen(true)
  }
  const handleModalOk = () => {
    setIsModalOpen(false)
    localStorage.setItem('redirect', window.location.pathname)
    navigate('/login')
  }
  const handleModalCancel = () => {
    setIsModalOpen(false)
  }
  //END: Modal ctrls

  return (
    <>
      <Modal title='Note' open={isModalOpen} onOk={handleModalOk} onCancel={handleModalCancel}>
        Please log in to make a service request
      </Modal>
      <List
        itemLayout='vertical'
        size='large'
        pagination={{
          onChange: page => {
            console.log(page)
          },
          pageSize: 5,
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
                {timestamp2DateStr(item.date)}
              </div>,
            ]}
            extra={''}>
            <List.Item.Meta
              // avatar={<Avatar src={item.author.user_avatar} />}
              title={<span style={{ color: 'black' }}>{item.title}</span>}
              description={
                <div className='rate-area' style={{ color: 'black' }}>
                  {'@' + item.author.user_name}
                </div>
              }
            />
            {<span style={{ color: 'black' }}>{item.content}</span>}
          </List.Item>
        )}
      />
    </>
  )
}

export default function CustomerNotification({ user_id }) {
  const [data, setData] = useState(null)

  user_id = '#srv-test-1'
  // fetch service+review data
  let ignore = false
  useEffect(() => {
    if (!ignore) {
      const getData = async () => {
        // TODO: change data source
        const rvwData = await getReviews(user_id)
        setData(rvwData)
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
