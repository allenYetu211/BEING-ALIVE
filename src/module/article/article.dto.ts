/*
 * @Date: 2022-09-21 17:32:32
 * @LastEditTime: 2022-10-23 19:50:28
 */
// import type { Descendant } from 'slate';
import { IsArray, IsString, IsOptional, Min, IsNotEmpty, IsInt } from 'class-validator';
import { Transform } from 'class-transformer';
import { unknownToNumber } from '@/common/transform/value.transform';

export class ArticleDTO {
  @IsString()
  container: string;

  @IsString()
  title: string;

  @IsString()
  @IsOptional()
  author: string;

  @IsString()
  description: string;
}

export class ArticlePageDTO {
  @Min(1)
  @IsInt()
  @IsNotEmpty()
  @IsOptional()
  @Transform(({ value }) => unknownToNumber(value))
  page: number;
}
