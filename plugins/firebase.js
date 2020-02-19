import firebase from 'firebase/app'
import 'firebase/firestore'
if (!firebase.apps.length) {
  const config = {
    apiKey: 'AIzaSyAFXW9LO5nA4MN2pooIEnmbDEHWo2rIFgQ',
    authDomain: 'hannes-cool.firebaseapp.com',
    databaseURL: 'https://hannes-cool.firebaseio.com',
    projectId: 'hannes-cool',
    storageBucket: 'hannes-cool.appspot.com',
    messagingSenderId: '462246470138',
    appId: '1:462246470138:web:3dc97d03f86434d662c443'
  }
  firebase.initializeApp(config)
  firebase.firestore().settings({})
}
const fireDb = firebase.firestore()
export { fireDb }
