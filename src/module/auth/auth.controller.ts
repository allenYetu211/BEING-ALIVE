
import { Controller, Post, Put } from '@nestjs/common';
import { AuthService } from './auth.service'

@Controller('auth')
export class AuthController {
  constructor (private readonly authService: AuthService) { }

  /**
   * 注册账号
   */
  @Post('login')
  public async LoginUserAuth() {
    await this.authService.LoginUserAuth()
  }

  /**
   * 创建用户
   */
  @Put('create_user')
  public async CreateUser() {
    await this.authService.CreateUser()
  }
}
