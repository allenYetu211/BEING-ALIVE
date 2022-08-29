/*
 * @Date: 2022-08-28 14:44:57
 * @LastEditTime: 2022-08-29 23:41:25
 */
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
