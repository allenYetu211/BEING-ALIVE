/*
 * @Date: 2022-08-30 23:35:53
 * @LastEditTime: 2022-08-30 23:36:29
 */
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { Module } from '@nestjs/common';

@Module({
  imports: [],
  controllers: [AuthController],
  providers: [AuthService]
})
export class AuthModule {}
