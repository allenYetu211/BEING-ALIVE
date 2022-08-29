/*
 * @Date: 2022-08-28 14:44:57
 * @LastEditTime: 2022-08-29 23:42:59
 */
import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}
