/*
 * @Date: 2022-09-01 19:06:58
 * @LastEditTime: 2022-09-02 00:56:02
 */
import { Module } from '@nestjs/common';

import { TagsController } from './tags.controller';
import { TagsService } from './tags.service';

import { AccessTokenStrategy } from '@BA/strategy/access-token.strategy';
// import { RefreshTokenStrategy } from '@BA/strategy/refresh-Token.strategy'

@Module({
  imports: [],
  controllers: [TagsController],
  providers: [TagsService, AccessTokenStrategy]
})
export class TagsModule {}
