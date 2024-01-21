import { NestFactory } from '@nestjs/core'
import { NestExpressApplication } from '@nestjs/platform-express'
import { AppModule } from './app.module'
import { variblesConfig } from './config'

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule)

  app.enableCors({
    origin: true,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    allowedHeaders: 'Content-Type, Accept, Authorization',
    credentials: true
  })

  await app.listen(variblesConfig.SERVER_PORT)
}
bootstrap()
