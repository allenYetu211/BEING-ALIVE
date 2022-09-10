/*
 * @Date: 2022-09-01 19:06:58
 * @LastEditTime: 2022-09-10 13:40:01
 */
import { Module } from '@nestjs/common';

import { TagsController } from './tags.controller';
import { TagsService } from './tags.service';

@Module({
  imports: [],
  controllers: [TagsController],
  providers: [TagsService]
})
export class TagsModule {}
