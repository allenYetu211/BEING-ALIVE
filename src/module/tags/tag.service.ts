/*
 * @Date: 2022-09-01 19:07:32
 * @LastEditTime: 2022-09-20 01:06:50
 */

import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { TagDTO } from './tag.dto';
import { InjectModel, MongooseModel } from '@/database';
import { Tag } from './tag.model';
import { MongooseID, MongooseDoc } from '@/common/interface/mongoose.interface';

@Injectable()
export class TagService {
  constructor(@InjectModel(Tag) private readonly tagModel: MongooseModel<Tag>) {}

  public async createTag(newTag: TagDTO): Promise<MongooseDoc<Tag>> {
    const result = await this.checkTag(newTag.name);
    if (result) {
      throw new HttpException(`tag name [${newTag.name}] is existed`, HttpStatus.FORBIDDEN);
    }
    return await this.tagModel.create(newTag);
  }

  public async findAllTags(): Promise<Tag[] | null> {
    return await this.tagModel.find({}, { __v: 0 }).exec();
  }

  public async findTag(tagID: MongooseID): Promise<MongooseDoc<Tag>> {
    return await this.tagModel.findById(tagID);
  }

  public async checkTag(name: string): Promise<MongooseDoc<Tag> | null> {
    return await this.tagModel.findOne({ name }).exec();
  }

  public async updateTag(tagID: MongooseID, newTag: TagDTO): Promise<MongooseDoc<Tag>> {
    return this.tagModel.findByIdAndUpdate(
      tagID,
      {
        ...newTag,
        update_time: Date.now()
      },
      { new: true }
    );
  }

  public async deleteTag(tagID: MongooseID) {
    await this.tagModel.deleteMany({ _id: { $in: tagID } }).exec();
    return;
  }
}
