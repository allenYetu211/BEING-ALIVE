/*
 * @Date: 2022-08-30 00:41:15
 * @LastEditTime: 2022-08-30 15:56:14
 */
import { NestFactory, HttpAdapterHost } from '@nestjs/core';

import { HttpExceptionFilter } from '@BA/filter/http-exception.filter';
import { PORT } from '@BA/config/global';

import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalFilters(new HttpExceptionFilter(app.get(HttpAdapterHost)));

  await app.listen(PORT);

  console.log(`open: http://localhost:${PORT}`);
}
bootstrap();
