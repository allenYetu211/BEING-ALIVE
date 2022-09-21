/*
 * @Date: 2022-09-21 00:46:39
 * @LastEditTime: 2022-09-21 23:45:39
 */
import { Module } from '@nestjs/common';
import { DatabaseModule } from '@/database';
import { ArticleController } from './article.controller';
import { ArticleService } from './article.service';
import { Article } from './article.model';

@Module({
  imports: [DatabaseModule.forFeature([Article])],
  controllers: [ArticleController],
  providers: [ArticleService]
})
export class ArticleModule {}
