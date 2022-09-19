/*
 * @Date: 2022-09-01 14:49:42
 * @LastEditTime: 2022-09-19 16:13:20
 */

import { prop } from '@typegoose/typegoose';
import { IsString, IsNotEmpty } from 'class-validator';
import { Document } from 'mongoose';
import { Role } from '@/common/enums/enums';

export type UserDocument = User & Document;

export class User {
  @IsString()
  @prop({ required: true })
  username: string;

  @IsNotEmpty()
  @prop({ required: true })
  password: string;

  @IsNotEmpty()
  @prop({ required: true })
  nickname: string;

  @prop({ default: Role.MEMBER })
  role: number;

  @prop()
  refreshToken: string;

  // 头像
}
