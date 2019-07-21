import admin from 'firebase-admin'

console.log(admin.apps.length)

const firebaseAdmin = !admin.apps.length
  ? admin.initializeApp(
      {
        credential: admin.credential.cert(
          require('../../../credentials/server.json')
        )
      },
      'server'
    )
  : admin.app('server')

const auth = firebaseAdmin.auth()

export { firebaseAdmin, auth }
