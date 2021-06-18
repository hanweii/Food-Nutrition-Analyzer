import * as firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'

// firebase init
const firebaseConfig = {
  apiKey: 'AIzaSyCP-uOZYnUDAWE0a7gvtJGGdbiR8H6e9qg',
  authDomain: 'food-nutrition-analyzer-93e2d.firebaseapp.com',
  databaseURL: 'https://food-nutrition-analyzer-93e2d-default-rtdb.firebaseio.com',
  projectId: 'food-nutrition-analyzer-93e2d',
  storageBucket: 'food-nutrition-analyzer-93e2d.appspot.com',
  messagingSenderId: '773727711897',
  appId: '1:773727711897:web:f8695ee312d4ec290bbe08'
}
firebase.initializeApp(firebaseConfig)

// utils
const db = firebase.firestore()
const auth = firebase.auth()

// collection references
const usersCollection = db.collection('users')
const postsCollection = db.collection('posts')
const commentsCollection = db.collection('comments')
const likesCollection = db.collection('likes')

// export utils/refs
export {
  db,
  auth,
  usersCollection,
  postsCollection,
  commentsCollection,
  likesCollection
}
