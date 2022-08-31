import { Controller, Get, Post, Put } from '@nestjs/common';

import { loggers } from '@BA/utils/logger';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  /**
   * 注册账号
   */
  @Post('login')
  public async LoginUserAuth() {
    loggers.info('LoginUserAuth: login');
    loggers.error({ label: '[REQUEST]' }, 'LoginUserAuth: login');
    await this.authService.LoginUserAuth();
  }

  /**
   * 创建用户
   */
  @Put('create_user')
  public async CreateUser() {
    await this.authService.CreateUser();
  }

  @Get('us')
  public async Testus() {
    throw {
      error: 21212,
      code: 21212
    };
  }
}
