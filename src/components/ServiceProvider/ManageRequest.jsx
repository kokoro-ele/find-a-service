import React, { useState, useEffect } from 'react'
import { List } from 'antd'
import RequestCard from '../RequestCard'
import { getRequestsByServiceProvider } from '../../utils/FirebaseAPI'

const ManageRequest = () => {
  const [requests, setRequests] = useState([])

  useEffect(() => {
    getRequestsByServiceProvider('testprovider').then(data => {
      setRequests(data)
    })
  }, [])

  return (
    <List
      // grid={{
      //   gutter: 16,
      //   xs: 1,
      //   sm: 2,
      //   md: 4,
      //   lg: 4,
      //   xl: 6,
      //   xxl: 3,
      // }}
      dataSource={requests}
      renderItem={item => (
        <div>
          <List.Item>
            <RequestCard props={item} />
          </List.Item>
        </div>
      )}
    />
  )
}
export default ManageRequest
