import admin from 'firebase-admin'

declare global {
  namespace Express {
    export interface Request {
      firebaseServer?: admin.app.App
      session?: {
        decodedToken: admin.auth.DecodedIdToken
      }
    }
  }
}
