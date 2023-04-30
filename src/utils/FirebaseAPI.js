import 'moment'
import { db, storage } from './FirebaseSetup'
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage'
import { doc, limit, orderBy } from 'firebase/firestore'
import { collection, addDoc, getDocs, setDoc, where, query, updateDoc, getDoc, deleteDoc } from 'firebase/firestore'

export async function addData(path, data) {
  try {
    const docRef = await addDoc(collection(db, path), data)
    return docRef
  } catch (e) {
    console.log('Error adding document: ', e)
  }
}

export async function setData(path, id, data) {
  try {
    const docRef = await setDoc(doc(db, path, id), data)
    return docRef
  } catch (e) {
    console.log('Error adding document: ', e)
  }
}

export async function updateData(path, id, data) {
  try {
    const ref = doc(db, path, id)
    const docRef = await updateDoc(doc(db, path, id), data)
    return docRef
  } catch (e) {
    console.log('Error adding document: ', e)
  }
}

export async function readData(path) {
  const querySnapshot = await getDocs(collection(db, path))
  return querySnapshot
}
//account相关
export async function addAccount(data) {
  const docRef = await addDoc(collection(db, 'Account'), data)
  return docRef
}

//serviceprovider相关

export async function addServiceProvider(data) {
  const docRef = await addDoc(collection(db, 'ServiceProvider'), data)
  // console.log(docRef)
  return docRef
}

//service相关
export async function getServicesById(id) {
  const serviceRef = doc(db, 'Service', id)
  const service = await getDoc(serviceRef)
  return service
}

export async function updateServiceById(id, data) {
  const serviceRef = doc(db, 'Service', id)
  const service = await setDoc(serviceRef, data)
  return service
}

export async function addService(data) {
  const docRef = await addDoc(collection(db, 'Service'), data)
  // console.log(docRef)
  return docRef
}

export async function deleteService(id) {
  const docRef = await deleteDoc(doc(db, 'Service', id))
  return docRef
}

export async function getServicesByServiceProvider(name) {
  const servicesRef = collection(db, 'Service')
  const q = query(servicesRef, where('serviceprovider', '==', name))
  const snapshot = await getDocs(q)

  const services = snapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data(),
  }))
  return services
}

//上传图片到storage

export async function uploadImage(image) {
  // 生成唯一的文件名
  const imageName = `${Date.now()}-${image.name}`
  const imageRef = ref(storage, 'images/' + imageName)
  const snapshot = await uploadBytes(imageRef, image).then(snapshot => {
    console.log('Uploaded an Image!')
  })
  const url = getDownloadURL(imageRef)
  return url
}

//上传视频
export async function uploadVideo(video) {
  // 生成唯一的文件名
  const videoName = `${Date.now()}-${video.name}`
  const videoRef = ref(storage, 'videos/' + videoName)
  const snapshot = await uploadBytes(videoRef, video).then(snapshot => {
    console.log('Uploaded a video!')
  })
  const url = getDownloadURL(videoRef)
  return url
}

//request相关
export async function getRequestsByServiceProvider(id) {
  const requestsRef = collection(db, 'Request')
  const q = query(requestsRef, where('serviceprovider', '==', 'testprovider'))
  const snapshot = await getDocs(q)

  const requests = snapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data(),
  }))
  return requests
}

export async function getRequestById(id) {
  const requestRef = doc(db, 'Request', id)
  const request = await getDoc(requestRef)
  return request
}

export async function updateRequestById(id, data) {
  const requestRef = doc(db, 'Request', id)
  const request = await setDoc(requestRef, data)
  return request
}

// 检查服务是否还可被request
/*
 * request time 只填写开始时间
 */
export async function checkSrvAvailability(srv_id, time) {
  const duration = getServicesById(srv_id).duration
  const Request = collection(db, 'Request')
  const q = query(Request, where('srv_id', '==', srv_id), where('req_time', '==', time))
}

// add request
export async function addRequest({ user_id, srv_id, desc, req_time = null }) {
  const req_id = '#req001' // TODO: 设计成自增
  // let flag = checkSrvAvailability(srv_id, req_time)

  req_time = new Date().getTime()
  let data = { req_id, user_id, srv_id, desc, req_time, status: 'pending' }
  console.log(data)
  const docRef = await addDoc(collection(db, 'Request'), data)
  return docRef
}

// FAKE data start
// Generate and add fake data of: Service, ServiceProvider
export async function addFakeData(n) {
  let fakeServiceList = []
  let fakeProviderList = []
  for (let i = 0; i < n; i++) {
    let gps = [-1.4001991, 50.9434623]
    gps[0] += 0.0001 * (5 + i)
    gps[1] += 0.0001 * (5 + i)

    fakeServiceList.push({
      srv_id: `#srv-test-${i}`,
      category: 'Cleaning',
      srv_name: 'Kitchen Cleaning', // str, service name
      description: 'This is the description of Kitchen Cleaning',
      prv_id: `#prv-test-${i}`, // str, provider id
      prv_name: `Provider Company-${i}`, // str, provider name
      viedos: ['https://www.youtube.com/watch?v=kr0RisHSDwI'], // array, to dispaly service, optional
      imgs: [
        'https://firebasestorage.googleapis.com/v0/b/test-36dcf.appspot.com/o/images%2FClean1.png?alt=media&token=96c9e206-9cbf-4716-9eaa-d5e97768a409',
        'https://firebasestorage.googleapis.com/v0/b/test-36dcf.appspot.com/o/images%2FClean2.png?alt=media&token=a88307aa-c6c8-4301-acaf-b292619d9938',
        'https://firebasestorage.googleapis.com/v0/b/test-36dcf.appspot.com/o/images%2FClean3.png?alt=media&token=35523b64-6fb8-4e02-8cc8-880d3aa53724',
        'https://firebasestorage.googleapis.com/v0/b/test-36dcf.appspot.com/o/images%2FClean4.png?alt=media&token=15035f3e-f818-4ce7-9d0c-68e78f6da207',
        'https://firebasestorage.googleapis.com/v0/b/test-36dcf.appspot.com/o/images%2FClean5.png?alt=media&token=7f2ccd77-8728-4b50-b5c8-0d02a6b719b5',
        'https://firebasestorage.googleapis.com/v0/b/test-36dcf.appspot.com/o/images%2FClean6.png?alt=media&token=8d6de684-c4aa-4d1e-a490-c12e43411323',
        'https://firebasestorage.googleapis.com/v0/b/test-36dcf.appspot.com/o/images%2FClean7.png?alt=media&token=2cd41515-7003-4c6a-8eff-2f5ca461a549',
      ], // array, `mandatory`, at least 1 img
      price: 100, // int, service price
      location: {
        txt: 'Highfeild', // str, e.g., service only available within Highfeild
        gps: gps, // [经度，纬度]，要求根据位置找到服务【到时候我们应该要用GoogleMap的API】
      },
      available_time: ['Mon', 'Tue'], // array, 最好 TimePiker 让商家选
      duration: 30, // int, 30min，指定服务预计时长，这个参数将是 request 的时间选择间隔
      total: 5, // int, 同一服务在同一时间段可以被请求的次数（e.g. 清洁工人数）
      reputation: 3.5, // float, 服务评分
    })
    fakeProviderList.push({
      prv_id: `#prv-test-${i}`, // str, provider id
      prv_name: `Provider Company-${i}`, // str, provider name
      description: `This is the description of Provider Company-${i}`,
      email: 'prefix@suffix.domain', // str
      phone: '07579966529', // str
      pwd: 'testpwd', // password hash, 不明文存储密码，存储加盐的哈希值（我之后写进util，可以先存明文）
      location: {
        txt: 'SO16 3UJ Glen Eyre Hall', // str, provider's address text
        gps: gps, // array, [经度，纬度] 按照 GoogleMap 来
      },
      avatar: `https://xsgames.co/randomusers/avatar.php?g=pixel&key=${i}`, // img url, 商家头像
      imgs: ['url'], // array, 用于呈现商家主页的推销图片（顾客可以点击商家头像，查看商家主页）
    })
    await addDoc(collection(db, 'Service'), fakeServiceList[i])
    await addDoc(collection(db, 'ServiceProvider'), fakeProviderList[i])
  }
  console.log('Generating fake data of: Service, ServiceProvider')
}

export async function addFakeRequestData(n) {
  let fakeRequestList = []
  for (let i = 0; i < n; i++) {
    fakeRequestList.push({
      req_id: `#req-test-${i}`, // str, request id
      user_id: `#usr-test-${i}`, // str, user id
      srv_id: `#srv-test-${i}`, // str, service id
      desc: 'This is the description of request', // str, request description
      req_time: new Date(), // datetime, request time
      req_status: 'pending', // str, request status, pending, accepted, rejected, completed
    })
    await addDoc(collection(db, 'Request'), fakeRequestList[i])
  }
  console.log('Generating fake data of: Request')
}
// FAKE data end

export async function getRecommendServices(amount = 5) {
  const q = query(
    collection(db, 'Service'),
    // TODO: order by reputation(rate)
    orderBy('srv_id'), // orderBy('', 'desc')
    limit(amount)
  )
  const querySnapshot = await getDocs(q)

  // console.log(querySnapshot)

  let ret = []
  querySnapshot.forEach(doc => {
    // console.log(doc.id, '=>', doc.data())
    // ret.push({ srv_id: doc.data().srv_id, imgUrl: doc.data().imgs[0] })
    ret.push(doc.data())
  })
  // console.log(ret)

  return ret
}

export async function getSearchedServices(possibleCats) {
  const q = query(collection(db, 'Service'), where('category', 'in', possibleCats))
  const querySnapshot = await getDocs(q)

  // console.log(querySnapshot)
  let ret = []
  querySnapshot.forEach(doc => {
    // console.log(doc.id, '=>', doc.data())
    ret.push(doc.data())
  })

  console.log('Search results', ret)
  return ret
}

export async function addCustomer(data) {
  const docRef = await addDoc(collection(db, 'Customer'), data)
  console.log('User successfully added')
}
