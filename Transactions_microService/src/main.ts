import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });
  app.setGlobalPrefix('api2');
  app.enableCors({ origin: 'http://localhost:19006' });
  await app.listen(3000);
}
bootstrap();
