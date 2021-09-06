// import dotenv from 'dotenv';

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import axios from 'axios';

// eslint-disable-next-line @typescript-eslint/no-var-requires
require('dotenv').config();

const { PORT, PORT_TWO } = process.env;
console.log(process.env.PORT_TWO, 'aas');
console.log(PORT_TWO, 'bbbbb');
axios.defaults.baseURL = process.env.REACT_APP_API || 'http://localhost:3000';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });
  app.setGlobalPrefix('api');
  app.enableCors({ origin: '*' });
  await app.listen(PORT);
}
bootstrap();
