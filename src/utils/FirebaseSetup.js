// Import the functions you need from the SDKs you need
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage'
import { initializeApp } from 'firebase/app'
import { doc, getFirestore } from 'firebase/firestore'
import { getAuth } from 'firebase/auth'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional

// NOTE: Zetian
const firebaseConfig0 = {
  apiKey: 'AIzaSyArC2oFHyAeSCPIK6AAMbghWW5fL2jExqY',
  authDomain: 'localservice-381523.firebaseapp.com',
  projectId: 'localservice-381523',
  storageBucket: 'localservice-381523.appspot.com',
  messagingSenderId: '14918885764',
  appId: '1:14918885764:web:6e745429f0da6f2947fdd1',
  measurementId: 'G-R1D2V9VWR8',
}

// NOTE: Honghui
const firebaseConfig1 = {
  apiKey: 'AIzaSyBeQJ5rTDJABQUsJAD1YdUE1OBjFrc3zJc',
  authDomain: 'find-a-service-test.firebaseapp.com',
  projectId: 'find-a-service-test',
  storageBucket: 'find-a-service-test.appspot.com',
  messagingSenderId: '8536938445',
  appId: '1:8536938445:web:2eefc0de5f355ca8cc5684',
  measurementId: 'G-CYEQVL5SY8',
}

// Test
const firebaseConfig2 = {
  apiKey: 'AIzaSyDW_my4UYQabntxpIuPIJaMfmdf64XVuIU',
  authDomain: 'test-36dcf.firebaseapp.com',
  projectId: 'test-36dcf',
  storageBucket: 'test-36dcf.appspot.com',
  messagingSenderId: '442848617497',
  appId: '1:442848617497:web:19c2b70ea34f104eb3f688',
}

// Initialize Firebase
export const app = initializeApp(firebaseConfig2)
export const db = getFirestore(app)
export const storage = getStorage(app)

// Initialize Firebase Authentication and get a reference to the service
const auth = getAuth(app)
