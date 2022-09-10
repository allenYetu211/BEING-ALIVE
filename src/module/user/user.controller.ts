/*
 * @Date: 2022-08-30 23:36:11
 * @LastEditTime: 2022-09-01 18:36:16
 */
import { Body, Controller, Post } from '@nestjs/common';

import { User } from './user.model';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  /**
   * 创建用户
   */
  @Post('create_user')
  public async createUser(@Body() user: Omit<User, 'role'>) {
    return await this.userService.createUser(user);
  }
}
