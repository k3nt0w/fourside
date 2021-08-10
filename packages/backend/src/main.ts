import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { ValidationPipe } from './pipes/validation'
import { Logger } from '@nestjs/common'
require('dotenv').config()

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { logger: ['debug', 'log', 'verbose', 'warn', 'error'] })

  const logger = new Logger()
  app.useLogger(logger)

  app.useGlobalPipes(new ValidationPipe())
  app.enableCors()
  await app.listen(3001)
}
bootstrap()
