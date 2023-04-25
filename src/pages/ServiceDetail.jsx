import { useState } from 'react'
import '../css/ServiceDetail.scss'
import { Col, Image, Row } from 'antd'
import ServiceReviews from '../components/ServiceReviews'

export default function ServiceDetail() {
  const [visible, setVisible] = useState(false)
  return (
    <div className='service-detail'>
      <Row>
        <Col className='video-box' span={24}>
          VIDEO HERE or Carousel 走马灯
        </Col>
      </Row>

      <Row className='detail-box' justify='space-around'>
        <Col className='img-container' span={8}>
          <Row className='previewer'>
            <Image
              preview={{ visible: false }}
              width={'100%'}
              src='https://i.imgur.com/aTtVpES.jpg'
              onClick={() => setVisible(true)}
            />
            <div style={{ display: 'none' }}>
              <Image.PreviewGroup
                preview={{
                  visible,
                  onVisibleChange: vis => setVisible(vis),
                }}>
                {/* TODO: change img src */}
                <Image src='https://i.imgur.com/aTtVpES.jpg'></Image>
                <Image src='https://i.imgur.com/Mx7dA2Y.jpg'></Image>
                <Image src='https://i.imgur.com/ZF6s192m.jpg'></Image>
              </Image.PreviewGroup>
            </div>
          </Row>
          <Row className='thumbnails' justify='space-between'>
            <Image className='nail' src='https://i.imgur.com/aTtVpES.jpg'></Image>
            <Image className='nail' src='https://i.imgur.com/Mx7dA2Y.jpg'></Image>
            <Image className='nail' src='https://i.imgur.com/ZF6s192m.jpg'></Image>
          </Row>
        </Col>
        <Col className='description-box' span={8}></Col>
      </Row>

      <div className='review-area'>
        <Row>
          <Col className='review-head' span={24}>
            Top Reviews From Previous Customers
          </Col>
        </Row>
        <ServiceReviews />
      </div>
    </div>
  )
}
