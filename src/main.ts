import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { json, urlencoded } from 'body-parser';
import * as fileUpload from 'express-fileupload';
import { AppModule } from './app.module';
async function bootstrap() {
  console.log('CORS: ', process.env.CORS_ORIGIN);
  const app = await NestFactory.create(AppModule, {
    cors: true,
  });
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
      transformOptions: {
        enableImplicitConversion: true,
      },
    }),
  );
  app.use(json({ limit: '12mb' }));
  app.use(urlencoded({ limit: '12mb', extended: true }));
  app.use(
    fileUpload({
      limits: { fileSize: 12 * 1024 * 1024 },
    }),
  );
  await app.listen(3000);
}
bootstrap();
