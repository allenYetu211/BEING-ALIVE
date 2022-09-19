/*
 * @Date: 2022-09-19 22:52:51
 * @LastEditTime: 2022-09-19 23:33:26
 */
import { Prop } from '@typegoose/typegoose';
import { IsString, IsDate } from 'class-validator';

export class Tag {
  @IsString()
  @Prop()
  name: string;

  @IsDate()
  @Prop({ default: Date.now() })
  create_time: Date;

  @IsDate()
  @Prop({ default: Date.now() })
  update_time: Date;

  @IsString()
  @Prop({ default: '' })
  description: string;
}
