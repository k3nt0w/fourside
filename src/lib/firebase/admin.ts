import admin from 'firebase-admin'

const firebaseAdmin = admin.initializeApp({
  credential: admin.credential.cert(require('../../credentials/server'))
})

const auth = firebaseAdmin.auth()

export { firebaseAdmin, auth }
