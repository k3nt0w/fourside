import { Injectable, CanActivate, ExecutionContext, ForbiddenException } from '@nestjs/common'
import { InjectFirebaseAdmin, FirebaseAdmin } from '@fourside/nestjs-firebase'

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(@InjectFirebaseAdmin() private readonly firebase: FirebaseAdmin) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req = context.switchToHttp().getRequest()
    if (process.env.NODE_ENV === 'development') {
      // NOTE(@k3nt0w): 開発環境ではAuthorization Headerの値をUIDとして扱う
      req.decodedIdToken = { uid: 'normal-user', role: 'NORMAL' }
      return true
    }
    const { authorization } = req.headers
    if (!authorization || !authorization.startsWith('Bearer ')) {
      return false
    }
    const idToken = authorization.slice(7, authorization.length)

    const decodedIdToken = await this.firebase.auth.verifyIdToken(idToken).catch(err => {
      console.error(err)
      throw new ForbiddenException(`${err.message}`)
    })

    req.decodedIdToken = { ...decodedIdToken }

    if (
      decodedIdToken.role === 'ADMIN' || // NOTE(@k3nt0w): 現状の権限設計には存在しないが、以前使っていた権限のためある程度時間が経つまで許可する
      decodedIdToken.role === 'NORMAL' ||
      decodedIdToken.role === 'SHOP_MANAGER' ||
      decodedIdToken.role === 'COMPANY_MANAGER' ||
      decodedIdToken.role === 'ROOT'
    ) {
      return true
    }

    return false
  }
}

@Injectable()
export class ShopManagerAuthGuard implements CanActivate {
  constructor(@InjectFirebaseAdmin() private readonly firebase: FirebaseAdmin) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req = context.switchToHttp().getRequest()
    if (process.env.NODE_ENV === 'development') {
      // NOTE(@k3nt0w): 開発環境ではAuthorization Headerの値をUIDとして扱う
      req.decodedIdToken = { uid: 'shop-manager-user', role: 'SHOP_MANAGER' }
      return true
    }
    const { authorization } = req.headers
    if (!authorization || !authorization.startsWith('Bearer ')) {
      return false
    }
    const idToken = authorization.slice(7, authorization.length)

    const decodedIdToken = await this.firebase.auth.verifyIdToken(idToken).catch(err => {
      console.error(err)
      throw new ForbiddenException(`${err.message}`)
    })

    req.decodedIdToken = { ...decodedIdToken }

    if (
      decodedIdToken.role === 'SHOP_MANAGER' ||
      decodedIdToken.role === 'COMPANY_MANAGER' ||
      decodedIdToken.role === 'ROOT'
    ) {
      return true
    }

    return false
  }
}

@Injectable()
export class CompanyManagerAuthGuard implements CanActivate {
  constructor(@InjectFirebaseAdmin() private readonly firebase: FirebaseAdmin) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req = context.switchToHttp().getRequest()
    if (process.env.NODE_ENV === 'development') {
      // NOTE(@k3nt0w): 開発環境ではAuthorization Headerの値をUIDとして扱う
      req.decodedIdToken = { uid: 'company-manager-user', role: 'COMPANY_MANAGER' }
      return true
    }
    const { authorization } = req.headers
    if (!authorization || !authorization.startsWith('Bearer ')) {
      return false
    }
    const idToken = authorization.slice(7, authorization.length)

    const decodedIdToken = await this.firebase.auth.verifyIdToken(idToken).catch(err => {
      console.error(err)
      throw new ForbiddenException(`${err.message}`)
    })

    req.decodedIdToken = { ...decodedIdToken }

    if (decodedIdToken.role === 'COMPANY_MANAGER' || decodedIdToken.role === 'ROOT') {
      return true
    }

    return false
  }
}

@Injectable()
export class RootAuthGuard implements CanActivate {
  constructor(@InjectFirebaseAdmin() private readonly firebase: FirebaseAdmin) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req = context.switchToHttp().getRequest()
    if (process.env.NODE_ENV === 'development') {
      // NOTE(@k3nt0w): 開発環境ではAuthorization Headerの値をUIDとして扱う
      req.decodedIdToken = { uid: 'root-user', role: 'ROOT' }
      return true
    }
    const { authorization } = req.headers
    if (!authorization || !authorization.startsWith('Bearer ')) {
      return false
    }
    const idToken = authorization.slice(7, authorization.length)

    const decodedIdToken = await this.firebase.auth.verifyIdToken(idToken).catch(err => {
      console.error(err)
      throw new ForbiddenException(`${err.message}`)
    })

    req.decodedIdToken = { ...decodedIdToken }

    if (decodedIdToken.role === 'ROOT') {
      return true
    }

    return false
  }
}
