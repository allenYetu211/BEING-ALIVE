/*
 * @Date: 2022-09-01 19:08:03
 * @LastEditTime: 2022-09-10 13:48:33
 */
/*
https://docs.nestjs.com/controllers#controllers
*/

import { Controller, Get, UseGuards, Request } from '@nestjs/common';
import { JwtAccessAuthGuard } from '@BA/guard/jwt-access.guard';
import { Roles } from '@BA/decorator/role. decorator';
import { Role } from '@BA/common/enums';

@Controller()
export class TagsController {
  @Get('tags')
  // @Roles(Role.ADMIN)
  @UseGuards(JwtAccessAuthGuard)
  public async test(@Request() req) {
    return 'succeed ! ';
  }
}
