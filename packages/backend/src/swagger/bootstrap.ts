import { writeFileSync } from 'fs'
import { NestFactory } from '@nestjs/core'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'
import { AppModule } from '../app/app.module'

async function bootstrap(): Promise<void> {
  const app = await NestFactory.create(AppModule)
  const options = new DocumentBuilder()
    .setTitle('Fourside')
    .setDescription('Fourside API description')
    .setVersion('1.0')
    .build()
  const document = SwaggerModule.createDocument(app, options)
  writeFileSync('./swagger.json', JSON.stringify(document))
  SwaggerModule.setup('/', app, document)
  await app.listen(3002)
}

bootstrap()
