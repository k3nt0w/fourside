import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'
import clientCredential from '../../../credentials/client'

const app = !firebase.apps.length
  ? firebase.initializeApp(clientCredential)
  : firebase.app()

const auth = app.auth()
const googleAuthProvider = new firebase.auth.GoogleAuthProvider()

const db = app.firestore()

export { auth, db, googleAuthProvider }
