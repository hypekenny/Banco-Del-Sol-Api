import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

// eslint-disable-next-line @typescript-eslint/no-var-requires
require('dotenv').config();

const { PORT_TWO } = process.env;
console.log(process.env.PORT_TWO, 'aas');
console.log(PORT_TWO, 'bbbbb');

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });
  app.setGlobalPrefix('api2');
  app.enableCors({ origin: '*' });
  await app.listen(`3000`);
}
bootstrap();
