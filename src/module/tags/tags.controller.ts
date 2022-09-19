/*
 * @Date: 2022-09-01 19:08:03
 * @LastEditTime: 2022-09-19 17:15:23
 */
/*
https://docs.nestjs.com/controllers#controllers
*/

import { Controller, Get, UseGuards, Request } from '@nestjs/common';
import { JwtAccessAuthGuard } from '@/common/guard/jwt-access.guard';
import { RBACGuard } from '@/common/guard/rbac.guard';
import { Role } from '@/common/enums/enums';

@Controller()
export class TagsController {
  @Get('tags')
  @UseGuards(new RBACGuard(Role.ADMIN))
  @UseGuards(JwtAccessAuthGuard)
  public async test(@Request() req) {
    return 'succeed ! ';
  }
}
