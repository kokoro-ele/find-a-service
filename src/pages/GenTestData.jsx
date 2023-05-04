import { useEffect } from 'react'
import { addFakeData } from '../utils/FirebaseAPI.js'

const req_dataTest = {
  // req_id: 'unique', // str, customer request id
  user_id: '#usr-test-', // str, customer id
  srv_id: '#srv-test', // str, 发起请求的时候，根据 srv_name + prv_id 找到 srv_id
  desc: '', // str, description of customers' requirements when they request a service
  req_time: 'timestamp of (DD MM YYYY hh:mm:ss)', // 用时间戳, 用 moment.js [我装到 main 分支，记得拉取一下]
  status: 'pending', // ['pending', 'accepted', 'rejected', 'needDetail', 'completed']
}

export default function GenTestData() {
  // FAKE data start
  // HINT: 只跑一次就好，跑完马上注释掉
  // let isFakeAdded = false

  // useEffect(() => {
  //   console.log(`In effect:${isFakeAdded}`)
  //   if (!isFakeAdded) {
  //     addFakeData(6)
  //   }
  //   return () => {
  //     isFakeAdded = true
  //   }
  // }, [])
  // console.log(`In ServiceRequest: ${isFakeAdded}`)
  // FAKE data end

  req_dataTest.user_id += '1'
  req_dataTest.srv_id += '1'
  req_dataTest.req_time = Date.now()

  return null
}
