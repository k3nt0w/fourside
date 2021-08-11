import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { TypeOrmModule } from '@nestjs/typeorm'
// import { APP_INTERCEPTOR } from '@nestjs/core'
import { FirebaseModule } from '@fourside/nestjs-firebase'
import { environment } from '../environment'
// import { LoggerModule } from './logger/logger.module'
// import { QueryLogger } from './logger/logger.typeorm'
// import { LoggerInterceptor } from './logger/logger.interceptor'
import { StaffModule } from '../staff/staff.module'
// import { SendGridModule } from '@anchan828/nest-sendgrid'
import typeOrmOptions from '../type-orm.option'

@Module({
  // providers: [
  //   {
  //     provide: APP_INTERCEPTOR,
  //     useClass: LoggerInterceptor
  //   }
  // ],
  imports: [
    ConfigModule,
    TypeOrmModule.forRoot(typeOrmOptions),
    FirebaseModule.forRoot({
      googleApplicationCredential: environment.GOOGLE_APPLICATION_CREDENTIALS,
      storageBucket: environment.GCS_BUCKET_NAME
    }),
    // SendGridModule.forRoot({
    //   apikey: environment.SENDGRID_API_KEY
    // }),
    // LoggerModule,
    StaffModule
  ]
})
export class AppModule implements NestModule {
  configure(_: MiddlewareConsumer) {
    // consumer.apply(LoggerMiddleware).forRoutes({ path: '*', method: RequestMethod.ALL })
  }
}
