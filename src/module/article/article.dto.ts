import type { Descendant } from 'slate';
import { IsArray, IsString, IsOptional, Min, IsNotEmpty, IsEmpty, IsInt } from 'class-validator';
import { Transform } from 'class-transformer';
import { unknownToNumber } from '@/common/transform/value.transform';

export class ArticleDTO {
  @IsArray()
  container: Descendant[];

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
  @IsEmpty()
  @IsOptional()
  @Transform(({ value }) => {
    unknownToNumber(value);
  })
  page: number;
}
