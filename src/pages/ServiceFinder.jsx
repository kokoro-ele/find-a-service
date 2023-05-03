import { Carousel, Col, Image, List, Row, Select } from 'antd'
import '../css/ServiceFinder.scss'
import Search from 'antd/es/input/Search'
import { useEffect, useRef, useState } from 'react'
// import { useImmer } from 'use-immer'
// TODO: remove test data
import testData from '../json/ServiceDataTest.json'
import Card from '../components/Card'
import { getRecommendServices, getSearchedServices } from '../utils/FirebaseAPI'
import { useImmer } from 'use-immer'
import CarouselDateTest from '../json/CarouselDataTest.json'
import Map from '../components/Map'

function CardsArea({ isSearched, setIsSearched, searchTxt = null, defaultData = null }) {
  const [data, setData] = useImmer(defaultData)

  useEffect(() => {
    if (isSearched && searchTxt != '') {
      // searchTxt = 'Cleaning'
      // TODO: 增强算法，剔除特殊符号
      setIsSearched(false)
      let possibleCats = searchTxt.split(' ')
      // console.log('possibleCats: ', possibleCats)
      getSearchedServices(possibleCats).then(res => {
        setData(res)
        // console.log(data)
      })
    } else {
      setData(defaultData)
      setIsSearched(false)
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
          {searchTxt !== '' ? 'Search results' : 'Recommended Services'}
        </Col>
      </Row>
      <div className='card-list-container'>
        {data ? (
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
        ) : (
          ''
        )}
      </div>
    </div>
  )
}

function RecommendCarousel({ data }) {
  // FAKE DATA
  //START
  // TEST use, to reduce the firebase reading
  // const imgs = CarouselDateTest.map((item, index) => {
  //   return (
  //     <div className={`img-pair ${'pair-' + index}`} key={`img-${index}`}>
  //       <img src={item.imgUrl} alt={item.srv_id} />
  //       <img src={item.imgUrl} alt={item.srv_id} />
  //     </div>
  //   )
  // })
  // END

  // fetch carousel img data and create dom
  // let ignore = false
  // const [imgs, setImgs] = useState(null)
  // useEffect(() => {
  //   if (!ignore) {
  //     getRecommendServices(5).then(res => {
  //       setImgs(
  //         res.map((item, index) => {
  //           return (
  //             <div className={`img-pair ${'pair-' + index}`} key={`img-${index}`} onClick={handleCarouselClick}>
  //               <img src={item.imgs[0]} alt={item.srv_id} />
  //               <img src={item.imgs[1]} alt={item.srv_id} />
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

  // click on a img , then navigate to its service page
  const handleCarouselClick = e => {
    // 这个由于是变量定义的函数不会自动提升，所以必须放在下面的调用之前
    console.log(e.target)
    // TODO: 添加跳转详细页
  }

  const imgs = data.map((item, index) => {
    return (
      <div className={`img-pair ${'pair-' + index}`} key={`img-${index}`} onClick={handleCarouselClick}>
        <img src={item.image[0]} alt={item.srv_id} />
        <img src={item.image[1]} alt={item.srv_id} />
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
  const [searchTxt, setSearchTxt] = useState('')

  const [recommendData, setRecommendData] = useState(null)

  let ignore = false
  useEffect(() => {
    if (!ignore) {
      console.log('fetching recommend data...')
      // TODO: change the recommend amount
      getRecommendServices(3).then(res => {
        console.log(res)
        setRecommendData(res)
      })
    }
    return () => {
      ignore = true
    }
  }, [])

  function handleSearch() {
    const ipt = iptSearch.current
    console.log(ipt.input.value)
    ipt.input.blur()

    setIsSearched(true)
    setSearchTxt(ipt.input.value)

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
      {recommendData ? (
        <div className='page-loader'>
          {/* Carousel */}
          <Row justify='center'>
            <RecommendCarousel data={recommendData} />
          </Row>
          {/* Head: Find Your Favorite Service! */}
          <Row justify='center'>
            <Col>
              <div className='head'>Find Your Favorite Service!</div>
            </Col>
          </Row>
          {/* Map box */}
          <Map data={recommendData} />
          {/* Search  */}
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
          {/* Card list  */}
          <CardsArea
            isSearched={isSearched}
            setIsSearched={setIsSearched}
            searchTxt={searchTxt}
            defaultData={recommendData}
          />
        </div>
      ) : (
        'Fetching recommend data...'
      )}
    </div>
  )
}
