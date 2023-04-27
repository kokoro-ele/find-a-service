import { useEffect, useRef } from 'react'
import '../css/Card.scss'
import VanillaTilt from 'vanilla-tilt'
import { Col, Rate } from 'antd'

export default function Card({ data }) {
  const cardDOM = useRef(null)
  useEffect(() => {
    // const cardElem = document.querySelector('.card')
    VanillaTilt.init(cardDOM.current, {
      max: 30,
      speed: 3000,
    })
  }, [])
  return (
    <div className='card'>
      <Col className='wrap'>
        <div className='card' ref={cardDOM}>
          <div className='image'>
            {/* TODO: img 404*/}
            <img src='../assets/react.svg' alt='' />
          </div>
          <div className='banner'></div>
          <div className='con'>
            <h1>Service Name</h1>
            <h3>Provider name</h3>
            <p>Brief indo dafsfasfdfsdf adfasfadsffasdfafsadfadsffasdf asdfafsdafdasfsdfasf</p>
          </div>
          <div className='data'>
            <Rate disabled allowHalf value={4.5} />
          </div>
        </div>
      </Col>
    </div>
  )
}
