/*
 * @Date: 2022-09-01 19:08:03
 * @LastEditTime: 2022-09-02 00:56:32
 */
/*
https://docs.nestjs.com/controllers#controllers
*/

import { Controller, Get, UseGuards, Request } from '@nestjs/common';
import { JwtAccessAuthGuard } from '@BA/guard/jwt-access.guard';

@Controller()
export class TagsController {
  @Get('tags')
  @UseGuards(JwtAccessAuthGuard)
  public async test(@Request() req) {
    return 'succeed ! ';
  }
}
