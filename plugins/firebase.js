import firebase from 'firebase/app'
import 'firebase/firestore'
if (!firebase.apps.length) {
  firebase.initializeApp()
  firebase.firestore().settings({})
}
const fireDb = firebase.firestore()
export { fireDb }
