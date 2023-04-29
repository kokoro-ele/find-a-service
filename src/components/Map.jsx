import { Row } from 'antd'
import '../css/Map.scss'
import mapboxgl from '../utils/MapboxConfig.js'
import { useEffect, useState } from 'react'

function generateCircle(center, radiusInKm) {
  const points = 64

  const coords = {
    latitude: center[1],
    longitude: center[0],
  }

  const km = radiusInKm

  const ret = []
  const distanceX = km / (111.32 * Math.cos((coords.latitude * Math.PI) / 180))
  const distanceY = km / 110.574

  let theta, x, y
  for (let i = 0; i < points; i++) {
    theta = (i / points) * (2 * Math.PI)
    x = distanceX * Math.cos(theta)
    y = distanceY * Math.sin(theta)
    ret.push([coords.longitude + x, coords.latitude + y])
  }
  ret.push(ret[0])

  return [ret]
}

const genCircleSrc = (longitude, latitude) => {
  return {
    type: 'geojson',
    data: {
      type: 'FeatureCollection',
      features: [
        {
          type: 'Feature',
          properties: {},
          geometry: {
            type: 'Point',
            coordinates: [longitude, latitude],
          },
        },
        {
          type: 'Feature',
          properties: {},
          geometry: {
            type: 'Polygon',
            coordinates: [generateCircle([longitude, latitude], 1)],
          },
        },
      ],
    },
  }
}

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
    // data = [-1.4001991, 50.9434623]
    // for (let i = 5; i < 15; i++) {
    //   data[0] += 0.0001 * i
    //   data[1] += 0.0001 * i
    //   new mapboxgl.Marker().setLngLat(data).addTo(_map)
    // }
    //END

    data.forEach(item => {
      new mapboxgl.Marker().setLngLat(item.location.gps).addTo(_map)
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
    // Add zoom and rotation controls to the map.
    _map.addControl(new mapboxgl.NavigationControl())
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
