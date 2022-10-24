/*
 * @Date: 2022-09-21 00:48:29
 * @LastEditTime: 2022-10-23 19:52:08
 */

import { Prop, Ref } from '@typegoose/typegoose';
import {
  //  IsMongoId,
  IsString,
  IsArray,
  IsDate,
  IsNumber,
  IsBoolean
} from 'class-validator';
// import { MongooseID } from '@/common/interface/mongoose.interface';
import { Tag } from '@/module/tags/tag.model';
// import type { Descendant } from 'slate';

export class Article {
  @IsString()
  @Prop()
  container: string;

  @IsString()
  @Prop()
  title: string;

  @IsString()
  @Prop()
  author: string;

  @IsDate()
  @Prop({ default: Date.now() })
  create_time: Date;

  @IsDate()
  @Prop({ default: Date.now() })
  update_time: Date;

  @IsString()
  @Prop({ default: '' })
  description: string;

  @IsNumber()
  @Prop({ default: 0 })
  like: number;

  @IsNumber()
  @Prop({ default: 0 })
  view: number;

  @IsBoolean()
  @Prop({ default: false })
  state: boolean;

  @IsBoolean()
  @Prop({ default: false })
  public: boolean;

  @IsBoolean()
  @Prop({ default: true })
  origin: boolean;

  @Prop({ ref: () => Tag, index: true })
  tags: Ref<Tag>[];
}
