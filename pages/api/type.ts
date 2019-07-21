import { App, DecodedIdToken } from '../../lib/firebase/type'
import { NextApiRequest, NextApiResponse } from 'next'

export interface Request extends NextApiRequest {
  firebaseServer?: App
  decodedToken?: DecodedIdToken
}

export interface Response extends NextApiResponse {}
