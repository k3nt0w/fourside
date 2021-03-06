import { Injectable } from '@nestjs/common'
import { auth } from '../firebase'
import { Claims } from '@fourside/interface'

@Injectable()
export class AuthService {
  async createCustomToken(uid: string, claims: Claims) {
    return auth.createCustomToken(uid, claims)
  }
}
