import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });
  app.setGlobalPrefix('api');
  app.enableCors({ origin: process.env.CORS_ORIGIN });
  await app.listen(process.env.PORT);
}
bootstrap();
