import { Row } from 'antd'
import mapboxgl from '../utils/MapboxConfig.js'
import { useEffect, useState } from 'react'

export default function MapTest() {
  // TEST
  // START
  // console.log('1 Geo obj:', navigator.geolocation)

  // navigator.geolocation.getCurrentPosition(success => {
  //   console.log('2 Success: ', success)
  // })

  // console.log(GeolocationCoordinates)
  // console.log(GeolocationPosition)
  //END

  const [map, setMap] = useState(null)

  useEffect(() => {
    const _map = new mapboxgl.Map({
      container: 'map', // container ID
      // Choose from Mapbox's core styles, or make your own style with Mapbox Studio
      style: 'mapbox://styles/mapbox/streets-v12', // style URL
      center: [-1.4001991, 50.9434623], // starting center in [lng, lat]
      zoom: 20, // starting zoom
    })

    // Add geolocate control to the map.
    const geolocate = new mapboxgl.GeolocateControl({
      positionOptions: {
        enableHighAccuracy: true,
      },
      // When active the map will receive updates to the device's location as it changes.
      trackUserLocation: true,
      // Draw an arrow next to the location dot to indicate which direction the device is heading.
      showUserHeading: true,
    })

    _map.addControl(geolocate)
    _map.on('load', () => {
      geolocate.trigger()
    })

    setMap(_map)
  }, [])

  return (
    <Row className='map-container'>
      <button
        width='200'
        height='200'
        onClick={() => {
          console.log(map.getCenter())
        }}>
        show current center
      </button>
      <div id='map' style={{ position: 'absolute', top: 20, bottom: 0, width: '100%' }}></div>
    </Row>
  )
}
