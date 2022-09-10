/*
 * @Date: 2022-09-01 16:11:46
 * @LastEditTime: 2022-09-10 13:32:26
 */
import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';

import { LocalStrategy } from '@BA/common/strategy/local.strategy';
import { AccessTokenStrategy } from '@BA/common/strategy/access-token.strategy';
import { UserModule } from '@BA/module/user/user.module';

import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';

@Module({
  imports: [UserModule, PassportModule, JwtModule.register({})],
  controllers: [AuthController],
  providers: [AuthService, LocalStrategy, AccessTokenStrategy]
})
export class AuthModule {}
