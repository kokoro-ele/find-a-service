import { db, storage } from './FirebaseSetup'
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage'
import { doc } from 'firebase/firestore'
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
