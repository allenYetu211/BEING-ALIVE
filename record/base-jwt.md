# JWT 校验
大部分场景使用JWT 进行无状态身份校验，相较于session对服务端压力较小。将用户相关信息存储在token中，每次解析token判断用户身份。
在nestjs中这里依赖`passport` `@nestjs/passport` `@nestjs/jwt` 库来实现， 通过 `guard` 进行身份校验，并解析身份信息。

实际业务中完整的流程：
1. 登陆，验证账号密码信息通过后生成access-token
2. 浏览器端将token存储至 `localStorage` 中，后续的请求在请求拦截器中添加上 `token` 相关信息发送至服务端。
3. 服务端收到信息后，会通过解析`token`获取相关的用户信息。

下面为服务端的相关流程：

### 登陆生成token
```typescript
// file: ~/src/module/auth.module
import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';

import { LocalStrategy } from '@BA/strategy/local.strategy';
import { AccessTokenStrategy } from '@BA/strategy/access-token.strategy';
import { UserModule } from '@BA/module/user/user.module'

import { AuthService } from './auth.service'
import { AuthController } from './auth.controller';


@Module({
  imports: [
    UserModule,
    PassportModule,
    JwtModule.register({})  // 引用JWT模块， 在service中会进行生成token处理
    ],
  controllers: [AuthController],
  providers: [AuthService, LocalStrategy, AccessTokenStrategy] // AccessTokenStrategy 是JWT 的解析部分，解析完成后会进行返回相关value内容
})
export class AuthModule { }

```

```typescript
// file: ~/src/module/auth.controller
@Controller()
export class AuthController {
  @Post('/auth/signin')
  @UseGuards(LocalAuthGuard)
  public async signIn(@Request() req) {
    return await this.authService.signIn(req.user)
  }
 }

```

```typescript
// file: ~/src/module/auth.service
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserDocument } from '@BA/module/user/user.model'
import { UserService } from '@BA/module/user/user.service'
import { decodeMD5 } from '@BA/transform/decode.transform'
import { JWT } from '@BA/config'

export class AuthService {
async signIn(user: UserDocument) {
    const tokens = await this.getTokens(user)
    return {
      accessToken: tokens.accessToken
    }
  }

  async getTokens(user: UserDocument) {
    const payload = { _id: user._id, username: user.username, nickname: user.nickname };
    const accessToken = await this.jwtService.signAsync(payload, {
      secret: JWT.JWT_ACCESS_SECRET,  //  JWT生成使用的秘钥， 在strategy部分配置JWT解析的时候需要为相同的秘钥
      expiresIn: JWT.ACCESS_EXPIRES_IN
    })
    return {
      accessToken
    }
  }
}
```


- 新建 strategy 文件夹，在下方进行创建 `access-token.strategy.ts` , 这里是用来解析

```typescript
// file: ~/src/strategy/access-token.strategy.ts
import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import {JWT} from '@BA/config'

@Injectable()
export class AccessTokenStrategy extends PassportStrategy(Strategy) {   // 如果有多个token，在需要单独声明名称
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: JWT.JWT_ACCESS_SECRET
    });
  }

  async validate(payload: any) {
    return { username: payload.username, _id: payload._id, nickname: payload.nickname };  // 校验通过后会返回相关的内容。
  }
}
```


- 在进行创建 nestjs 中的 `guard`，进行Token的校验处理

```typescript

import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { HttpStatus, HttpException } from '@nestjs/common';

@Injectable()
/**
 * jwt 为默认的内容， 如果有多个， 在需要在strategy部分声明
 *
 * AuthGuard 与 strategy 中的 PassportStrategy是对应的。
 */
export class JwtAccessAuthGuard extends AuthGuard('jwt') {
  	handleRequest<TUser = any>(err: any, user: any, info: any, context: any, status?: any): TUser {
		if (err || (!user && info.message)) {
			throw new HttpException(info.message,
				HttpStatus.FORBIDDEN,
			);
		}
		return user;
	}
}
```

- 使用, 在中需要使用的模块中使用`UseGuards`

```typescript
import { Controller, Get, UseGuards, Request } from '@nestjs/common';
import { JwtAccessAuthGuard } from '@BA/guard/jwt-access.guard'

@Controller()
export class TagsController {

  @Get('tags')
  @UseGuards(JwtAccessAuthGuard)  // 并将我们的要使用的守卫传入， req中就能找直接查到我们使用的相关信息
  public async test(@Request() req) {
      return 'succeed ! '
  }
}

```


---
# 双Token， 前后端配合无感知刷新，多地登陆账号互踢
Todo
