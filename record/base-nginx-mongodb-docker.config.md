<!--
 * @Date: 2022-08-30 19:15:51
 * @LastEditTime: 2022-08-30 23:20:16
-->

# 使用 docker 搭建本地化环境

- 通过 docker-compose 创建本地环境
- 配置 nginx、mongodb
- 连接 mongodb

---

## 说明

- 本地开发环境基于 docker 进行搭建，通过 docker-compose 进行容器编排，便于启动。
- 在本地开发环境会启动 nginx 以及 mongodb。
- 部署 nginx 的作用？
  - 用于转发请求至服务端。
- 本地服务启动了，为什么不直接访问，反而需要通过 nginx 进行转发。
  - service 需要获取 IP 等信息，需要通过 nginx 进行配置处理，最大程度的模拟线上环境。

---

## docker-compose 容器化编排文件配置

```yml
# ~/docker-compose.yml
version: '3.4'

services:
  dev_mongodb:
    image: mongo:latest
    container_name: mongodb # 容器名称
    command: [--auth]
    restart: always
    volumes:
      - ./db:/data/db # 数据存储位置
    ports:
      - 27017:27017
    healthcheck:
      test: echo 'db.runCommand("ping").ok' | mongo localhost:27017/test --quiet
      interval: 30s
      timeout: 10s
      retries: 3

  dev_nginx:
    image: nginx:latest
    container_name: nginx
    volumes:
      - ./nginx/default.local.conf:/etc/nginx/conf.d/default.conf:ro # nginx配置文件替换镜像内的配置文件
    ports:
      - 8080:80 # 本地环境通过8080进行访问
    restart: always
```

- 在`docker-compose.yml` 文件同路径下运行 `docker-compose up -d dev_nginx dev_mongodb`就可以正常启动项目了

---

## 本地 nginx 配置

```conf
# ~/nginx/default.local.conf
# 在开发环境中docker中涉及到容器内部与寄主机器服务的交互
# windows下应该是直接通过eth0中的ip网段（windows没有进行测试过）
# mac下的docker有加一层虚拟机，所以无法直接访问，需要使用docker.for.mac.host.internal，也就是说，
# 如果想要通过mac下的docker访问宿主机的ip需要使用docker.for.mac.host.internal

upstream local {
        server docker.for.mac.host.internal:3000;   # 本地环境需要注意
}

server {
    listen       80;
    server_name localhost
    location / {
        proxy_set_header            Host $host;
        proxy_set_header            X-real-ip $remote_addr;   # 获取IP信息，后续会使用到
        proxy_set_header            X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_pass http://local;
    }
}
```

---

## 连接 mongodb

- nestjs 中推荐使用@nestjs/mongoose 去连接数据库，实际情况下由于官网长时间未更新，使用 typescript 版本后会出现类型绑定出错的那个问题，导致无法编译通过，所以这里自己重写了相关模块，使用方法与@nestjs/mongoose 一致。

> 基于 nestjs 中的动态模块进行处理。
> forRoot 用于在初始阶段连接数据库逻辑
> forFeature 部分用于在其余 module 模块中注入不同的文档供其他的 service 模块使用。

### 核心部分

```typescript
// ~/src/database/database.module.ts
import { Module, Global, DynamicModule } from '@nestjs/common';
import * as mongoose from 'mongoose';
import { getModelForClass } from '@typegoose/typegoose';
import { DB_CONNECTION_TOKEN } from '@BA/config/global';
import { DatabaseConnectionOptions, DatabaseClass } from './database.interface';
import { getModelToken } from './database.transform';
@Global()
@Module({})
export class DatabaseModule {
  static forRoot(uri: string, options: DatabaseConnectionOptions = {}): DynamicModule {
    const connectionProvider = {
      provide: DB_CONNECTION_TOKEN,
      useFactory: async () => {
        const mc = mongoose.connection;
        mc.on('connecting', () => {
          console.info('[MongoDB]', 'connecting...');
        });
        mc.on('open', () => {
          console.info('[MongoDB]', 'readied!');
        });
        mc.on('connected', (error) => {
          if (error) {
            console.log('[MongoDB] connecting rejected! ' + error);
            return;
          }
          console.log('[MongoDB] connecting succeed! ');
        });

        return await mongoose.connect(uri, { ...options });
      }
    };

    return {
      module: DatabaseModule,
      providers: [connectionProvider],
      exports: [connectionProvider]
    };
  }

  static forFeature(modules: DatabaseClass[]): DynamicModule {
    const providers = modules.map((typegooseClass) => {
      return {
        provide: getModelToken(typegooseClass.name),
        useFactory: (connection: mongoose.Connection) =>
          getModelForClass(typegooseClass, { existingConnection: connection }),
        inject: [DB_CONNECTION_TOKEN]
      };
    });

    return {
      module: DatabaseModule,
      providers,
      exports: providers
    };
  }
}
```
