/*
 * @Date: 2022-08-30 00:41:15
 * @LastEditTime: 2022-09-01 18:42:05
 */
import { NestFactory, HttpAdapterHost } from '@nestjs/core';

import { ValidationPipe } from '@BA/pipe/validation.pipe';
import { HttpExceptionFilter } from '@BA/filter/http-exception.filter';
import { PORT } from '@BA/config/global';
import { TransformInterceptor } from '@BA/interceptor/transform.interceptor';

import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalFilters(new HttpExceptionFilter(app.get(HttpAdapterHost)));
  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalInterceptors(new TransformInterceptor());

  await app.listen(PORT);

  console.log(`open: http://localhost:${PORT}`);
}
bootstrap();
