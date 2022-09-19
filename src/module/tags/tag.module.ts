/*
 * @Date: 2022-09-01 19:06:58
 * @LastEditTime: 2022-09-20 01:02:34
 */
import { Module } from '@nestjs/common';
import { TagsController } from './tag.controller';
import { TagService } from './tag.service';

import { DatabaseModule } from '@/database';
import { Tag } from './tag.model';

@Module({
  imports: [DatabaseModule.forFeature([Tag])],
  controllers: [TagsController],
  providers: [TagService]
})
export class TagModule {}
