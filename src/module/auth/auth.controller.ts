import { Controller, Post, UseGuards, Request } from '@nestjs/common';

import { LocalAuthGuard } from '@/common/guard/local.guard';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signin')
  @UseGuards(LocalAuthGuard)
  public async signIn(@Request() req) {
    return await this.authService.signIn(req.user);
  }
}
