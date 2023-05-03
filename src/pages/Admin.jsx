import React from 'react'
import { useEffect, useState } from 'react'
import {
  addFakeData,
  getServiceProviderByApproved,
  deleteServiceProviderById,
  updateServiceProviderById,
  getServiceProviderById,
} from '../utils/FirebaseAPI'
import { Row, Col, List, Skeleton, Avatar, Modal, Input, Image } from 'antd'
import { Link } from 'react-router-dom'
import '../css/Admin.scss'
const Admin = () => {
  const [viewData, setViewData] = useState({})
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const [activeProviders, setActiveProviders] = useState([])
  const [inactiveProviders, setInactiveProviders] = useState([])
  const showProvider = id => {
    console.log('show modal', id)
    getServiceProviderById(id).then(res => {
      console.log('success get', id, res)
      setViewData(res)
    })
    setIsModalOpen(true)
  }

  const handleOk = id => {
    console.log('handle ok', id)
    setIsModalOpen(false)
  }

  const handleCancel = id => {
    console.log('handle cancel', id)
    updateServiceProviderById(id, { needupdate: true }).then(res => {
      console.log('success updated', id, res)
    })
    setIsModalOpen(false)
  }

  const deleteProvider = id => {
    deleteServiceProviderById(id)
      .then(res => {
        console.log('success deleted', id, res)
      })
      .then(
        getServiceProviderByApproved(false).then(res => {
          setInactiveProviders(res)
        }),
        getServiceProviderByApproved(true).then(res => {
          setActiveProviders(res)
        })
      )
  }

  const approveProvider = id => {
    updateServiceProviderById(id, { approved: true })
      .then(res => {
        console.log('success updated', id, res)
      })
      .then(res => {
        getServiceProviderByApproved(false).then(res => {
          setInactiveProviders(res)
        })
        getServiceProviderByApproved(true).then(res => {
          setActiveProviders(res)
        })
      })
  }

  useEffect(() => {
    // addFakeData(2)
    setLoading(true)
    getServiceProviderByApproved(true).then(res => {
      setActiveProviders(res)
    })
    getServiceProviderByApproved(false).then(res => {
      setInactiveProviders(res)
    })
    setLoading(false)
  }, [])
  return (
    <div className='admin-page'>
      <h1>Admin Panel</h1>
      <div>
        <Row>
          <Col span={8}>
            <div className='list-container'>
              <h2> approved provider</h2>
              <List
                className='demo-loadmore-list'
                // loading={initLoading}
                itemLayout='horizontal'
                // loadMore={loadMore}
                dataSource={activeProviders}
                renderItem={item => (
                  <List.Item
                    actions={[
                      <a key={item.prv_id} onClick={() => showProvider(item.prv_id)}>
                        view
                      </a>,
                      <a key={item.prv_id} onClick={() => deleteProvider(item.prv_id)}>
                        remove
                      </a>,
                    ]}>
                    <Skeleton avatar title={false} loading={loading} active>
                      <List.Item.Meta
                        avatar={<Avatar src={item.imgs[0]} />}
                        title={<a href='https://ant.design'>{item.prv_name}</a>}
                        description={item.description}
                      />
                      {/* <div>content</div> */}
                    </Skeleton>
                  </List.Item>
                )}
              />
            </div>
          </Col>
          <Col span={8}>
            <div className='list-container'>
              <h2> pending provider</h2>
              <List
                className='demo-loadmore-list'
                // loading={initLoading}
                itemLayout='horizontal'
                // loadMore={loadMore}
                dataSource={inactiveProviders}
                renderItem={item => (
                  <List.Item
                    actions={[
                      <a key={item.prv_id} onClick={() => showProvider(item.prv_id)}>
                        view
                      </a>,
                      <a key={item.prv_id} onClick={() => approveProvider(item.prv_id)}>
                        approve
                      </a>,
                      <a key={item.prv_id} onClick={() => deleteProvider(item.prv_id)}>
                        reject
                      </a>,
                    ]}>
                    <Skeleton avatar title={false} loading={loading} active>
                      <List.Item.Meta
                        avatar={<Avatar src={item.avatar} />}
                        title={<a href='https://ant.design'>{item.prv_name}</a>}
                        description={item.description}
                      />
                      {/* <div>content</div> */}
                    </Skeleton>
                  </List.Item>
                )}
              />
            </div>
          </Col>
          <Col span={8}>
            <div className='list-container'>
              <h2> reviews</h2>
              <List
                className='demo-loadmore-list'
                // loading={initLoading}
                itemLayout='horizontal'
                // loadMore={loadMore}
                dataSource={activeProviders}
                renderItem={item => (
                  <List.Item actions={[<a key='list-loadmore-edit'>edit</a>, <a key='list-loadmore-more'>more</a>]}>
                    <Skeleton avatar title={false} loading={loading} active>
                      <List.Item.Meta
                        avatar={<Avatar src={item.imgs[0]} />}
                        title={<a href='https://ant.design'>{item.prv_name}</a>}
                        description={item.description}
                      />
                      {/* <div>content</div> */}
                    </Skeleton>
                  </List.Item>
                )}
              />
            </div>
          </Col>
        </Row>
      </div>
      <Modal
        title={'Info of ' + viewData.prv_id}
        open={isModalOpen}
        onOk={handleOk}
        onCancel={() => handleCancel(viewData.prv_id)}
        cancelText='Need more info'>
        <div className='account-container'>
          <Row className='center-row'>
            <Avatar src={viewData && viewData.avatar} size={64} />
          </Row>

          <Row>
            Name : <Input value={viewData && viewData.prv_name} />
          </Row>

          <Row>
            pwd: <Input value={viewData && viewData.password} />
          </Row>

          <Row>
            Description:
            <Input value={viewData && viewData.description} />
          </Row>

          <Row>
            Address:
            <Input value={viewData && viewData.location && viewData.location.txt} />
          </Row>
          {viewData &&
            viewData.imgs &&
            viewData.imgs.map((img, index) => {
              return (
                <Row key={index}>
                  <Image src={img} />
                </Row>
              )
            })}
        </div>
      </Modal>
    </div>
  )
}

export default Admin
