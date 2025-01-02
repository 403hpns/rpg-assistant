import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import cookieParser = require('cookie-parser');

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix('api/v1');
  app.use(cookieParser());

  // app.enableCors({
  //   origin: 'http://localhost:3000',
  //   credentials: true,
  // });

  await app.listen(4000);
}

bootstrap();
