import { Row } from 'antd'
import '../css/Map.scss'
import mapboxgl from '../utils/MapboxConfig.js'
import { useEffect, useState } from 'react'

export default function Map({ data = null }) {
  const [map, setMap] = useState(null)

  useEffect(() => {
    const _map = new mapboxgl.Map({
      container: 'map', // container ID
      // Choose from Mapbox's core styles, or make your own style with Mapbox Studio
      style: 'mapbox://styles/mapbox/streets-v12', // style URL
      center: [-1.4001991, 50.9434623], // starting center in [lng, lat]
      zoom: 10, // starting zoom
    })

    // FAKE
    //START
    data = [-1.4001991, 50.9434623]
    for (let i = 5; i < 15; i++) {
      data[0] += 0.0001 * i
      data[1] += 0.0001 * i
      new mapboxgl.Marker().setLngLat(data).addTo(_map)
    }
    //END

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
      <div id='map'></div>
    </Row>
  )
}
