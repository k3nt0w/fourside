import admin from 'firebase-admin'

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
