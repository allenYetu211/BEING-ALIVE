/*
 * @Date: 2022-09-01 15:53:42
 * @LastEditTime: 2022-09-10 13:48:10
 */

import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserDocument } from '@/module/user/user.model';
import { UserService } from '@/module/user/user.service';
import { decodeMD5 } from '@/common/transform/decode.transform';
import { JWT } from '@/common/config';

@Injectable()
export class AuthService {
  constructor(private jwtService: JwtService, private usesService: UserService) {}

  async validateUser(username: string, pass: string): Promise<any> {
    const user = await this.usesService.findOne(username);
    if (user && user.password === decodeMD5(pass)) {
      return {
        _id: user._id,
        // username: user.username,
        // nickname: user.nickname,
        role: user.role
      };
    }
    return null;
  }

  async findById(_id: string) {
    return await this.usesService.findById(_id);
  }

  async signIn(user: UserDocument) {
    const tokens = await this.getTokens(user);
    // await this.updateRefreshToken(user._id, tokens.refreshToken)
    return {
      accessToken: tokens.accessToken
    };
  }

  async getTokens(user: UserDocument) {
    // const payload = { _id: user._id, username: user.username, nickname: user.nickname };
    const payload = { ...user };

    const accessToken = await this.jwtService.signAsync(payload, {
      secret: JWT.JWT_ACCESS_SECRET,
      expiresIn: JWT.ACCESS_EXPIRES_IN
    });
    return {
      accessToken
    };
  }

  // async getTokens(user: UserDocument) {
  //   const payload = { _id: user._id, username: user.username, nickname: user.nickname };
  //   const [accessToken, refreshToken] = await Promise.all([
  //     this.jwtService.signAsync(payload, {
  //       secret: JWT.JWT_ACCESS_SECRET,
  //       expiresIn: JWT.ACCESS_EXPIRES_IN
  //     }),
  //     this.jwtService.signAsync(payload, {
  //       secret: JWT.JWT_REFRESH_SECRET,
  //       expiresIn: JWT.REFRESH_EXPIRES_IN
  //     }),
  //   ])

  //   return {
  //     accessToken,
  //     refreshToken
  //   }
  // }

  public async updateRefreshToken(userId: string, refreshToken: string) {
    const md5RefreshToken = decodeMD5(refreshToken);
    await this.usesService.update(userId, {
      refreshToken: md5RefreshToken
    });
  }
}
