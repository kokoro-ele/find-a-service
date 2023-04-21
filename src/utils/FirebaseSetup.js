/*
 * @Author: kokoro
 * @Date: 2023-04-06 23:47:24
 * @LastEditors: kokoro
 * @LastEditTime: 2023-04-21 01:37:42
 * @Description: 请填写简介
 */

// Import the functions you need from the SDKs you need
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage'
import { initializeApp } from 'firebase/app'
import { doc, getFirestore } from 'firebase/firestore'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyArC2oFHyAeSCPIK6AAMbghWW5fL2jExqY',
  authDomain: 'localservice-381523.firebaseapp.com',
  projectId: 'localservice-381523',
  storageBucket: 'localservice-381523.appspot.com',
  messagingSenderId: '14918885764',
  appId: '1:14918885764:web:6e745429f0da6f2947fdd1',
  measurementId: 'G-R1D2V9VWR8',
}

// Initialize Firebase
export const app = initializeApp(firebaseConfig)
export const db = getFirestore(app)
export const storage = getStorage(app)
