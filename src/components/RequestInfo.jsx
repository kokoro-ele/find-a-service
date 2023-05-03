import React from 'react'
import '../css/RequestInfo.scss'
export const RequestCard = ({ data }) => {
  // const formattedTime = new Date(req_time).toLocaleString()
  // console.log('in request card', data)
  return (
    <div className='request-card-container'>
      <div className='request-card-header'>
        <h2 className='request-card-title'>{'From:  ' + (data && data.user_id)}</h2>
        <h2 className='request-card-subtitle'>{'Service:' + (data && data.srv_name)}</h2>
      </div>
      <div className='request-card-body'>
        <p className='request-card-description'>{'Description: ' + (data && data.desc)}</p>
      </div>
      <div className='request-card-footer'>
        <p className='request-card-status request-card-pending'>{'Status:' + (data && data.status)}</p>
        <p className='request-card-time'>{'Created Time:' + (data && data.req_time)}</p>
      </div>
    </div>
  )
}

export default RequestCard
