import { Carousel, Col, Image, Row } from 'antd'
import '../css/ServiceFinder.scss'
import Search from 'antd/es/input/Search'
import { useEffect, useRef, useState } from 'react'
// import { useImmer } from 'use-immer'
// TODO: remove test data
import testData from '../json/ServiceDataTest.json'
import Card from '../components/Card'
import { getCarouselImgs } from '../utils/FirebaseAPI'
import { useImmer } from 'use-immer'
import CarouselDateTest from '../json/CarouselDataTest.json'

function CardsArea({ isSearched, data }) {
  const cardList = data.map((item, index) => {
    // TODO:add card structure here
    // return <div key={`card-${index}`}>TODO: add card structure here</div>
    return <Card key={`card-${index}`} />
  })
  return (
    <div className='cards-area'>
      <Row className='title' justify='center'>
        <Col className='head' span={8}>
          {isSearched ? 'Search results' : 'Recommended Services'}
        </Col>
      </Row>
      <Row className='cards' justify='space-between' gutter={[10, 30]}>
        {cardList}
      </Row>
      <div className='pagination-container'>{cardList.length > 9 ? <div className='pagination'></div> : ''}</div>
    </div>
  )
}

function RecommendCarousel() {
  // BUG: 会一直导致 Firebase 读取
  // 我猜测，可能和 Carousel 导致 DOM 变化有关
  // START
  // const [imgs, setImgs] = useImmer(null)

  // getCarouselImgs(1).then(res => {
  //   setImgs(
  //     res.map((item, index) => {
  //       return (
  //         <Row justify='center' className={`img-pair-${index}`} key={`img-pair-${index}`}>
  //           <Col span={8}>
  //             <Image
  //               className={`img-1-${index}`}
  //               key={`img-1-${index}`}
  //               preview={false}
  //               src={item.imgUrl}
  //               alt={item.srv_id}
  //             />
  //           </Col>
  //           <Col span={8}>
  //             <Image
  //               className={`img-2-${index}`}
  //               key={`img-2-${index}`}
  //               preview={false}
  //               src={item.imgUrl}
  //               alt={item.srv_id}
  //             />
  //           </Col>
  //         </Row>
  //       )
  //     })
  //   )
  // })
  //END

  const imgs = CarouselDateTest.map((item, index) => {
    return <img src={item.imgUrl} alt={item.srv_id} width='300px' />
  })

  return (
    <Col className='carousel' span={24}>
      <Carousel>{imgs}</Carousel>
    </Col>
  )
}

export default function ServiceFinder() {
  const iptSearch = useRef(null)

  let [isSearched, setIsSearched] = useState(false)
  let [serviceData, setServiceData] = useState(null)

  function handleSearch() {
    setIsSearched(true)
    const ipt = iptSearch.current
    console.log(ipt.input.value)
    ipt.input.blur()

    // TODO: fetch data
    try {
      setServiceData([...testData])
      console.log(serviceData)
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className='service-finder'>
      <Row justify='center'>
        <RecommendCarousel />
      </Row>
      <Row>
        <Col span={8} offset={8}>
          <div className='head'>Find Your Favorite Services!</div>
        </Col>
      </Row>

      <Row className='search-row' justify='center'>
        <Col span={8}>
          <Search
            ref={iptSearch}
            placeholder='Enter your service...'
            enterButton='Find'
            size='large'
            onSearch={handleSearch}
          />
        </Col>
      </Row>

      {/* <CardsArea isSearched={isSearched} data={testData} /> */}
    </div>
  )
}
