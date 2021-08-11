import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common'
import { Observable } from 'rxjs'
import { tap } from 'rxjs/operators'
import { Logger } from './logger.service'

@Injectable()
export class LoggerInterceptor implements NestInterceptor {
  constructor(private readonly logger: Logger) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    // this.logger.debug(`${req.method} ${req.url} -> ${resp.statusCode}: ${resp.me}`)

    return next.handle().pipe(
      tap({
        next: () => {
          this.logNext(context)
        },
        error: err => {
          this.logError(err, context)
        }
      })
    )
  }

  private logNext(context: ExecutionContext) {
    const req = context.switchToHttp().getRequest()
    const res = context.switchToHttp().getResponse()

    this.logger.debug(`${req.method} ${req.url} -> ${res.statusCode}:`)
  }

  private logError(error: any, context: ExecutionContext): void {
    const req: Request = context.switchToHttp().getRequest<Request>()

    // const statusCode: number = error.getStatus()
    this.logger.error('', `${req.method} ${req.url} -> ${error}`)

    // if (statusCode < HttpStatus.INTERNAL_SERVER_ERROR) {
    //   this.logger.warn(`${req.method} ${req.url} -> ${statusCode}: ${error.stack || ''}`)
    // } else {
    //   this.logger.error('', `${req.method} ${req.url} -> ${statusCode}: ${error.stack || ''}`)
    // }
  }
}
