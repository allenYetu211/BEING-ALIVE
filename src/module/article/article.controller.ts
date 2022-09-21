/*
 * @Date: 2022-09-21 00:46:56
 * @LastEditTime: 2022-09-22 00:22:39
 */
/*
https://docs.nestjs.com/controllers#controllers
*/

import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { MongooseID, MongooseDoc } from '@/common/interface/mongoose.interface';
import { ArticleService } from './article.service';
import { ArticleDTO } from './article.dto';
import { Article } from './article.model';

@Controller('article')
export class ArticleController {
  constructor(private readonly articleService: ArticleService) {}

  @Post('create')
  public async createArticle(@Body() article: ArticleDTO): Promise<MongooseDoc<Article>> {
    return await this.articleService.createArticle(article);
  }

  @Get('all')
  public async findAllArticle(): Promise<MongooseDoc<Article>[]> {
    return await this.articleService.findAllArticle();
  }

  @Get(':id')
  public async findArticle(@Param() { id }: { id: MongooseID }): Promise<MongooseDoc<Article>> {
    return await this.articleService.findArticle(id);
  }

  @Put(':id')
  public async updateArticle(@Param() { id }: { id: MongooseID }): Promise<MongooseDoc<Article>> {
    return await this.articleService.findArticle(id);
  }

  @Delete(':id')
  public async deleteArticle(@Param() { id }: { id: MongooseID }) {
    return await this.articleService.deleteArticle(id);
  }
}
