import { Request, Response } from './type'
import { auth, firebaseAdmin } from '../../src/lib/firebase/admin'
import { cookies } from './config'

export default (req: Request, res: Response) => {
  if (!req.body) return res.status(400)

  const token = req.body.token
  auth
    .verifyIdToken(token)
    .then(decodedToken => {
      req.decodedToken = decodedToken
      req.cookies = cookies
      return decodedToken
    })
    .then(decodedToken => res.json({ status: true, decodedToken }))
    .catch((error: Error) => {
      console.log(error)
      res.json({ error })
    })
}
