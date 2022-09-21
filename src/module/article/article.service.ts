/*
 * @Date: 2022-09-21 00:46:50
 * @LastEditTime: 2022-09-22 00:17:32
 */
/*
https://docs.nestjs.com/providers#services
*/

import { Injectable } from '@nestjs/common';
import { InjectModel, MongooseModel } from '@/database';
import { Article } from './article.model';
import { ArticleDTO } from './article.dto';
import { MongooseID, MongooseDoc } from '@/common/interface/mongoose.interface';

@Injectable()
export class ArticleService {
  constructor(@InjectModel(Article) private readonly articleModel: MongooseModel<Article>) {}

  public async createArticle(newArticle: ArticleDTO): Promise<MongooseDoc<Article>> {
    return await this.articleModel.create(newArticle);
  }

  public async findAllArticle(): Promise<MongooseDoc<Article>[]> {
    return await this.articleModel.find({});
  }

  public async findArticle(id: MongooseID): Promise<MongooseDoc<Article>> {
    return await this.articleModel
      .findById(id, {
        __v: 0
      })
      .exec();
  }

  public async updateArticle(
    id: MongooseID,
    newArticle: ArticleDTO
  ): Promise<MongooseDoc<Article>> {
    return await this.articleModel
      .findByIdAndUpdate(
        id,
        {
          ...newArticle,
          update_time: Date.now()
        },
        { new: true }
      )
      .exec();
  }

  public async deleteArticle(id: MongooseID) {
    await this.articleModel.deleteMany({ id }).exec();
    return '';
  }
}
