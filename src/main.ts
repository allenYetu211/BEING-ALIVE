/*
 * @Date: 2022-08-30 00:41:15
 * @LastEditTime: 2022-08-30 15:56:14
 */
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { PORT } from '@BA/config/global';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(PORT);
  console.log(`open: http://localhost:${PORT}`)
}
bootstrap();
