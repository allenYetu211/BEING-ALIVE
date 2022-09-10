/*
 * @Date: 2022-09-01 18:56:30
 * @LastEditTime: 2022-09-10 13:56:34
 */
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { JWT } from '@BA/common/config';

import { AuthService } from '@BA/module/auth/auth.service';

@Injectable()
export class AccessTokenStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: JWT.JWT_ACCESS_SECRET
    });
  }

  async validate(payload: any) {
    const user = await this.authService.findById(payload._id);
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
    // return { username: payload.username, _id: payload._id, nickname: payload.nickname };
  }
}