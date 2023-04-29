import React, { useEffect, useRef, useState } from 'react'
import mapboxgl from '../utils/MapboxConfig.js'
import * as turf from '@turf/turf'
import { getRecommendServices } from '../utils/FirebaseAPI.js'

const drawCircle = (map, longitude, latitude, radius = 1) => {
  // const radius = 1 // 单位为千米
  const options = {
    steps: 64, // 圆形边缘的分段数
    units: 'kilometers',
  }
  const circle = turf.circle([longitude, latitude], radius, options)

  map.addSource('circle', {
    type: 'geojson',
    data: circle,
  })

  map.addLayer({
    id: 'circle',
    type: 'line',
    source: 'circle',
    layout: {
      'line-join': 'round',
      'line-cap': 'round',
    },
    paint: {
      'line-color': '#3388FF',
      'line-opacity': 0.8,
      'line-width': 2,
      'line-dasharray': [2, 2], // 值为一个长度为2的数组，其中第一个值表示实线的长度，第二个值表示空白的长度
    },
  })
}

function Map() {
  const mapContainerRef = useRef(null)
  const map = useRef(null)
  let radius = 1

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        position => {
          const lng = position.coords.longitude
          const lat = position.coords.latitude
          map.current = new mapboxgl.Map({
            container: mapContainerRef.current,
            style: 'mapbox://styles/mapbox/streets-v12',
            // center: [-1.4001991, 50.9434623], // Glen Eyre
            center: [lng, lat], // Glen Eyre
            zoom: 12,
          })

          // Add geolocate control to the map.
          const geolocateCtrl = new mapboxgl.GeolocateControl({
            positionOptions: {
              enableHighAccuracy: true,
            },
            // When active the map will receive updates to the device's location as it changes.
            trackUserLocation: true,
            // Draw an arrow next to the location dot to indicate which direction the device is heading.
            showUserHeading: true,
          })

          map.current.addControl(geolocateCtrl)

          map.current.on('load', () => {
            // trgger loate
            geolocateCtrl.trigger()

            geolocateCtrl.on('geolocate', position => {
              const { longitude, latitude } = position.coords

              drawCircle(map.current, longitude, latitude, radius)
              map.current.setZoom(13)
            })
          })
        },
        err => {
          console.error('Please enable location service! Err: ', err)
        },
        {
          enableHighAccuracy: true,
        }
      )
    }

    return () => {
      if (map.current) {
        map.current.remove()
      }
    }
  }, [])

  useEffect(() => {
    if (map.current) {
      getRecommendServices(6).then(data => {
        console.log(data)
        data.forEach(item => {
          new mapboxgl.Marker().setLngLat(item.location.gps).addTo(map.current)
        })
      })
    }
  }, [])

  return <div ref={mapContainerRef} style={{ width: '100%', height: '600px' }} />
}

export default Map
