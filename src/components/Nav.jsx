/*
 * @Author: kokoro
 * @Date: 2023-04-07 00:18:26
 * @LastEditors: kokoro
 * @LastEditTime: 2023-04-07 19:12:44
 * @Description: 请填写简介
 */
import { MailOutlined, SettingOutlined } from '@ant-design/icons'
import { Menu } from 'antd'
import { Link } from 'react-router-dom'
function getItem(label, key, icon, children, type) {
  return {
    key,
    icon,
    children,
    label,
    type,
  }
}
const items = [
  getItem('Navigation One', 'sub1', <MailOutlined />, [
    getItem('Item 1', 'g1', null, [getItem('Option 1', '1'), getItem('Option 2', '2')], 'group'),
    getItem('Item 2', 'g2', null, [getItem('Option 3', '3'), getItem('Option 4', '4')], 'group'),
  ]),
  getItem('Navigation Two', 'sub2', null, [
    getItem('Option 5', '5'),
    getItem('Option 6', '6'),
    getItem('Submenu', 'sub3', null, [getItem('Option 7', '7'), getItem('Option 8', '8')]),
  ]),
  {
    type: 'divider',
  },
  getItem('Navigation Three', 'sub4', <SettingOutlined />, [
    getItem('Option 9', '9'),
    getItem('Option 10', '10'),
    getItem('Option 11', '11'),
    getItem('Option 12', '12'),
  ]),
  getItem('Group', 'grp', null, [getItem('Option 13', '13'), getItem('Option 14', '14')], 'group'),
]
const App = () => {
  const onClick = e => {
    console.log('click ', e)
  }
  return (
    <Menu
      theme='dark'
      mode='inline'
      defaultSelectedKeys={['1']}
      items={[
        {
          key: '1',
          label: <Link to='/account'>account</Link>,
        },
        {
          key: '2',
          label: <Link to='/service'>service</Link>,
        },
        {
          key: '3',
          label: <Link to='/request'>request</Link>,
        },
      ]}
    />
  )
}
export default App
