import { Col, List, Row, Avatar, Space, Rate } from 'antd'
import { LikeOutlined, MessageOutlined, StarOutlined } from '@ant-design/icons'
import '../css/ServiceReview.scss'
import React from 'react'

const data = Array.from({
  length: 23,
}).map((_, i) => ({
  reviewUrl: 'https://ant.design',
  title: `Service Review Title - ${i}`,
  avatar: `https://xsgames.co/randomusers/avatar.php?g=pixel&key=${i}`,
  rate: 3,
  likes: 777,
  date: '2023.04.23',
  author: 'Amy',
  content:
    'We supply a series of design principles, practical patterns and high quality design resources (Sketch and Axure), to help people create their product prototypes beautifully and efficiently.',
}))

function IconText({ icon, text }) {
  return (
    <Space>
      {React.createElement(icon)}
      {text}
    </Space>
  )
}

function MyList() {
  return (
    <List
      itemLayout='vertical'
      size='large'
      pagination={{
        onChange: page => {
          console.log(page)
        },
        pageSize: 5,
      }}
      dataSource={data}
      footer={
        <div>
          {/* TODO: add list footer */}
          <b>ant design</b> footer part
        </div>
      }
      renderItem={item => (
        <List.Item
          key={item.title}
          actions={[
            <div className='review-date'>{item.date}</div>,
            <IconText icon={LikeOutlined} text={item.likes} key='list-vertical-like-o' />,
          ]}
          extra={''}>
          <List.Item.Meta
            avatar={<Avatar src={item.avatar} />}
            title={<a href={item.reviewUrl}>{item.title}</a>}
            description={
              <div className='rate-area'>
                {'@' + item.author + ' rated: '}
                <Rate disabled value={item.rate} />
              </div>
            }
          />
          {item.content}
        </List.Item>
      )}
    />
  )
}

export default function ServiceReviews({ srvId }) {
  return (
    <Row className='review-list' justify='start'>
      {/* <Col span={24}>Review list</Col> */}
      <MyList />
    </Row>
  )
}
