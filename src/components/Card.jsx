import { useEffect, useRef } from 'react'
import '../css/Card.scss'
import VanillaTilt from 'vanilla-tilt'
import { Col, Rate } from 'antd'

export default function Card({ data }) {
  console.log('In Card data: ', data)

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
          {/* <div className='image'>TODO: img 404</div> */}
          <div className='hide'>Click it to See more!</div>
          <div className='card-img'></div>
          <div className='con'>
            <h1>{data ? data.srv_name : 'Service Name'}</h1>
            <h3>{data ? data.prv_name : 'Provider name'}</h3>
            <p>{data ? data.description : 'Brief description of the service'}</p>
          </div>
          <div className='rate'>
            <Rate disabled allowHalf value={data ? data.rate : 4.5} />
          </div>
        </div>
      </Col>
    </div>
  )
}
