import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';

import { LocalStrategy } from '@BA/strategy/local.strategy';
import { AccessTokenStrategy } from '@BA/strategy/access-token.strategy';
import { UserModule } from '@BA/module/user/user.module';

import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';

@Module({
  imports: [UserModule, PassportModule, JwtModule.register({})],
  controllers: [AuthController],
  providers: [AuthService, LocalStrategy, AccessTokenStrategy]
})
export class AuthModule {}
