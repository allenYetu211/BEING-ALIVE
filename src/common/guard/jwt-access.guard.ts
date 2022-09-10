/*
 * @Date: 2022-09-01 18:48:17
 */
import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { HttpStatus, HttpException } from '@nestjs/common';

@Injectable()
export class JwtAccessAuthGuard extends AuthGuard('jwt') {
  handleRequest<TUser = any>(err: any, user: any, info: any, context: any, status?: any): TUser {
    if (err || (!user && info.message)) {
      throw new HttpException(info.message, HttpStatus.FORBIDDEN);
    }
    return user;
  }
}
