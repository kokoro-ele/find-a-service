/*
 * @Author: kokoro
 * @Date: 2023-04-07 00:16:39
 * @LastEditors: kokoro
 * @LastEditTime: 2023-04-21 00:12:00
 * @Description: 请填写简介
 */
import { Avatar, Button, List, Skeleton, Image } from 'antd'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { deleteService, getServicesByServiceProvider } from '../../utils/FirebaseAPI'
import openNotification from '../Notification'
const ManageService = () => {
  const [loading, setLoading] = useState(true)
  const [data, setData] = useState([])
  const [list, setList] = useState([])

  const getServicesList = () => {
    setLoading(true)
    getServicesByServiceProvider('test').then(res => {
      setLoading(false)
      setList(res)
    })
  }

  useEffect(() => {
    //后期要从登录状态换取当前登录的provider
    getServicesList()
  }, [])

  return (
    <div>
      <List
        className='demo-loadmore-list'
        loading={loading}
        itemLayout='horizontal'
        dataSource={list}
        renderItem={item => (
          <List.Item
            actions={[
              <Link to={`/editservice/${item.id}`}>view</Link>,
              <a
                key='delete-button'
                onClick={() => {
                  deleteService(item.id)
                    .then(res => openNotification('notification', 'Deleted successfully'))
                    .then(_ => getServicesList())
                }}>
                delete
              </a>,
            ]}>
            <Skeleton title={false} loading={loading} active>
              <List.Item.Meta title={<a href='https://ant.design'>{item.title}</a>} description={item.discription} />

              {item.image.length ? (
                item.image.map((url, index) => <Image width={100} src={url} key={'image-' + index} />)
              ) : (
                <Image width={100} src='https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png' />
              )}
            </Skeleton>
          </List.Item>
        )}
      />
      <Link to='/addservice'>
        <Button>Add </Button>
      </Link>
    </div>
  )
}
export default ManageService
