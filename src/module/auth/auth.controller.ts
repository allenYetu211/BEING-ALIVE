import { Controller, Post, UseGuards, Request } from '@nestjs/common';

import { LocalAuthGuard } from '@BA/guard/local.guard';
import { AuthService } from './auth.service';

@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/auth/signin')
  @UseGuards(LocalAuthGuard)
  public async signIn(@Request() req) {
    return await this.authService.signIn(req.user);
  }
}
