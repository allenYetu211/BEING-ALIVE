/*
 * @Date: 2022-08-30 23:35:53
 * @LastEditTime: 2022-09-01 16:51:07
 */
import { Module } from '@nestjs/common';

import { DatabaseModule } from '@BA/database';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { User } from './user.model';

@Module({
  imports: [DatabaseModule.forFeature([User])],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService]
})
export class UserModule {}
