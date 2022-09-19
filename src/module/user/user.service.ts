/*
 * @Date: 2022-08-30 23:36:03
 * @LastEditTime: 2022-09-10 12:56:46
 */
import { Injectable, HttpException, HttpStatus } from '@nestjs/common';

import { ResponseState } from '@/common/interface/rest.interface';
import { decodeMD5 } from '@/common/transform/decode.transform';
import { InjectModel, MongooseModel } from '@/database';
import { User } from './user.model';

@Injectable()
export class UserService {
  constructor(@InjectModel(User) private readonly userModel: MongooseModel<User>) {}
  public async login() {}

  public async createUser(createInfo: Omit<User, 'role'>): Promise<string> {
    const { username, password, nickname } = createInfo;
    const result = await this.findOne(username);
    if (!result) {
      await this.userModel.create({
        nickname,
        username,
        password: decodeMD5(password)
      });
      return ResponseState.Success;
    } else {
      throw new HttpException('用户名已存在', HttpStatus.FORBIDDEN);
    }
  }

  public async findOne(username: string) {
    return await this.userModel.findOne(
      { username },
      {
        _v: 0
      }
    );
  }

  public async findById(_id: string) {
    return await this.userModel.findOne({ _id });
  }

  public async update(id: string, user: Partial<User>) {
    return await this.userModel.findByIdAndUpdate(id, user, { new: true });
  }
}
