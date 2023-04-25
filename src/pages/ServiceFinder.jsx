import { Col, Layout, Menu, Row } from 'antd'
import '../css/ServiceFinder.scss'
import Search from 'antd/es/input/Search'
import { useRef, useState } from 'react'
// import { useImmer } from 'use-immer'
// TODO: remove test data
import testData from '../json/ServiceDataTest.json'
import Card from '../components/Card'

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
    <Col className='service-finder'>
      <Row justify='center'>
        <Col className='carousel' span={24}>
          轮播图
        </Col>
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

      <CardsArea isSearched={isSearched} data={testData} />
    </Col>
  )
}
