import { Carousel, Col, Image, List, Row, Select } from 'antd'
import '../css/ServiceFinder.scss'
import Search from 'antd/es/input/Search'
import { useEffect, useRef, useState } from 'react'
// import { useImmer } from 'use-immer'
// TODO: remove test data
import testData from '../json/ServiceDataTest.json'
import Card from '../components/Card'
import { getCarouselImgs, getSearchedServices } from '../utils/FirebaseAPI'
import { useImmer } from 'use-immer'
import CarouselDateTest from '../json/CarouselDataTest.json'

// function CardsArea({ isSearched, data }) {
//   const cardList = data.map((item, index) => {
//     // TODO:add card structure here
//     // return <div key={`card-${index}`}>TODO: add card structure here</div>
//     return <Card key={`card-${index}`} />
//   })
//   return (
//     <div className='cards-area'>
//       <Row className='title' justify='center'>
//         <Col className='head' span={8}>
//           {isSearched ? 'Search results' : 'Recommended Services'}
//         </Col>
//       </Row>
//       <Row className='cards' justify='space-between' gutter={[10, 30]}>
//         {cardList}
//       </Row>
//       <div className='pagination-container'>{cardList.length > 9 ? <div className='pagination'></div> : ''}</div>
//     </div>
//   )
// }

function CardsArea({ isSearched, searchTxt = null }) {
  // let data = testData
  const [data, setData] = useImmer(testData)
  // if (!isSearched) {
  //   // data = testData
  //   setData(draft => {
  //     return testData
  //   })
  // } else {
  //   searchTxt = 'Cleaning'
  //   // TODO: 增强算法，剔除特殊符号
  //   let possibleCats = searchTxt.split(' ')
  //   console.log('possibleCats: ', possibleCats)
  //   getSearchedServices(possibleCats).then(res => {
  //     data = res
  //     console.log(data)
  //   })
  // }

  useEffect(() => {
    if (isSearched) {
      searchTxt = 'Cleaning'
      // TODO: 增强算法，剔除特殊符号
      let possibleCats = searchTxt.split(' ')
      console.log('possibleCats: ', possibleCats)
      getSearchedServices(possibleCats).then(res => {
        setData(res)
        console.log(data)
      })
    }
    return () => {
      isSearched = false
    }
  }, [isSearched])

  // pagesize change with viewport
  const [pagesize, setPagesize] = useState(10)
  const [pageCol, setPageCol] = useState(5)

  window.onload = () => {
    let viewportW = window.innerWidth
    console.log(viewportW)

    if (viewportW > 1200) {
      setPagesize(8)
      setPageCol(4)
    } else if (viewportW > 1000 && viewportW < 1200) {
      setPagesize(6)
      setPageCol(3)
    } else if (viewportW > 700 && viewportW < 1000) {
      setPagesize(4)
      setPageCol(2)
    } else {
      setPagesize(1)
      setPageCol(1)
    }
  }

  window.onresize = () => {
    let viewportW = window.innerWidth
    console.log(viewportW)

    if (viewportW > 1200) {
      setPagesize(8)
      setPageCol(4)
    } else if (viewportW > 1000 && viewportW < 1200) {
      setPagesize(6)
      setPageCol(3)
    } else if (viewportW > 700 && viewportW < 1000) {
      setPagesize(4)
      setPageCol(2)
    } else {
      setPagesize(1)
      setPageCol(1)
    }
  }

  return (
    <div className='cards-area'>
      <Row className='title' justify='center'>
        <Col className='head' span={8}>
          {isSearched ? 'Search results' : 'Recommended Services'}
        </Col>
      </Row>
      <List
        pagination={{
          onChange: page => {
            console.log(page)
          },
          pageSize: pagesize,
          position: 'bottom',
          align: 'center',
        }}
        grid={{
          gutter: 20,
          column: pageCol,
        }}
        dataSource={data}
        renderItem={(item, index) => (
          <List.Item>
            <Card key={`card-${index}`} data={item} />
          </List.Item>
        )}
      />
    </div>
  )
}

function RecommendCarousel() {
  // fetch carousel img data and create dom
  // let ignore = false
  // const [imgs, setImgs] = useState(null)
  // useEffect(() => {
  //   if (!ignore) {
  //     getCarouselImgs(3).then(res => {
  //       setImgs(
  //         res.map((item, index) => {
  //           return (
  //             <div className={`img-pair ${'pair-' + index}`} key={`img-${index}`} onClick={handleCarouselClick}>
  //               <img src={item.imgUrl} alt={item.srv_id} />
  //               <img src={item.imgUrl} alt={item.srv_id} />
  //             </div>
  //           )
  //         })
  //       )
  //     })
  //   }
  //   return () => {
  //     ignore = true
  //   }
  // }, [])

  const handleCarouselClick = e => {
    console.log(e.target)
    // TODO: 添加跳转详细页
  }

  // click on a img , then navigate to its service page
  // HINT: React 直接可以再 div 上用 onClick 事件，不需要向下面这样添加事件
  // useEffect(() => {
  //   if (imgs) {
  //     const test = document.querySelector('.service-finder .pair-1')
  //     console.log(test)
  //     test.addEventListener('click', () => {
  //       console.log('clicked')
  //     })
  //   }
  // }, [])

  // TEST use, to reduce the firebase reading
  const imgs = CarouselDateTest.map((item, index) => {
    return (
      <div className={`img-pair ${'pair-' + index}`} key={`img-${index}`}>
        <img src={item.imgUrl} alt={item.srv_id} />
        <img src={item.imgUrl} alt={item.srv_id} />
      </div>
    )
  })

  return (
    <Col className='carousel' span={24}>
      <Carousel autoplay>{imgs}</Carousel>
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
      {/* Carousel */}
      <Row justify='center'>
        <RecommendCarousel />
      </Row>
      {/* Head: Find Your Favorite Service! */}
      <Row justify='center'>
        <Col>
          <div className='head'>Find Your Favorite Service!</div>
        </Col>
      </Row>
      {/* Search  */}
      <Row className='search-row' justify='center'>
        {/* Search */}
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
      {/* Card list  */}
      <CardsArea isSearched={isSearched} />
    </div>
  )
}
