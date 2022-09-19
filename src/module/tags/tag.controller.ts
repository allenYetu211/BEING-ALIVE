/*
 * @Date: 2022-09-01 19:08:03
 * @LastEditTime: 2022-09-20 01:03:46
 */

import {
  Controller,
  Get,
  UseGuards,
  Request,
  Post,
  Body,
  Put,
  Param,
  Delete
} from '@nestjs/common';
import { JwtAccessAuthGuard } from '@/common/guard/jwt-access.guard';
import { RBACGuard } from '@/common/guard/rbac.guard';
import { Role } from '@/common/enums/enums';
import { TagDTO } from './tag.dto';
import { TagService } from './tag.service';

import { MongooseID } from '@/common/interface/mongoose.interface';

@Controller('tag')
export class TagsController {
  constructor(private tagService: TagService) {}

  @Get('test')
  @UseGuards(new RBACGuard(Role.ADMIN))
  @UseGuards(JwtAccessAuthGuard)
  public async test(@Request() req) {
    return 'succeed ! ';
  }

  @Post('create')
  // @UseGuards(new RBACGuard(Role.ADMIN))
  // @UseGuards(JwtAccessAuthGuard)
  public async createTag(@Body() newTag: TagDTO) {
    return await this.tagService.createTag(newTag);
  }

  @Get('all')
  public async findAllTags() {
    return await this.tagService.findAllTags();
  }

  @Get(':id')
  public async findTag(@Param() { id }: { id: MongooseID }) {
    return await this.tagService.findTag(id);
  }

  @Put(':id')
  public async updateTag(@Param() { id }: { id: MongooseID }, @Body() newTag: TagDTO) {
    return await this.tagService.updateTag(id, newTag);
  }

  @Delete(':id')
  public async deleteTag(@Param() { id }: { id: MongooseID }) {
    return await this.tagService.deleteTag(id);
  }
}
