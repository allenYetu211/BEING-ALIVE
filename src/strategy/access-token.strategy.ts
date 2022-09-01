/*
 * @Date: 2022-09-01 18:56:30
 * @LastEditTime: 2022-09-01 23:39:47
 */
import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { JWT } from '@BA/config';

@Injectable()
export class AccessTokenStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: JWT.JWT_ACCESS_SECRET
    });
  }

  async validate(payload: any) {
    return { username: payload.username, _id: payload._id, nickname: payload.nickname };
  }
}
