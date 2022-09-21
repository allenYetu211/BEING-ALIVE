import { IsArray, IsString, IsDate, IsOptional } from 'class-validator';
import type { Descendant } from 'slate';

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
