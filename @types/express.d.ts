import admin from 'firebase-admin'

declare global {
  namespace Express {
    export interface Request {
      firebaseServer?: any
      session?: {
        decodedToken: admin.auth.DecodedIdToken
      }
    }
  }
}
