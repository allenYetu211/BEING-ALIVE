/*
 * @Date: 2022-09-19 23:28:45
 * @LastEditTime: 2022-09-19 23:34:31
 */
import { IsString, IsOptional, IsNotEmpty } from 'class-validator';

export class TagDTO {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsOptional()
  description: string;
}
