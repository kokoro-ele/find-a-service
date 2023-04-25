import { useEffect, useRef } from 'react'
import '../css/Card.scss'
import VanillaTilt from 'vanilla-tilt'
import { Col } from 'antd'

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
    <Col className='wrap-'>
      <div className='card' ref={cardDOM}>
        <div className='image'>
          {/* TODO: img 404*/}
          <img src='../assets/react.svg' alt='' />
        </div>
        <div className='banner'></div>
        <div className='con'>
          <h3>LEVEL 1</h3>
          <h1>Service Name</h1>
          <p>Brief indo dafsfasfdfsdf adfasfadsffasdfafsadfadsffasdf asdfafsdafdasfsdfasf</p>
        </div>
        <div className='data'>
          <div className='item'>
            <h1>20</h1>
            <p>TEST</p>
          </div>
          <div className='item'>
            <h1>20</h1>
            <p>TEST</p>
          </div>
          <div className='item'>
            <h1>20</h1>
            <p>TEST</p>
          </div>
        </div>
      </div>
    </Col>
  )
}