<!--
 * @Date: 2022-08-31 09:15:20
 * @LastEditTime: 2022-08-31 09:29:12
-->
# 项目格式
社区中有很多优秀的代码规范要求。
很多都是对于编写js代码层面的要求。
优秀的代码库开发编写都有着自己的统一规则。

### 文件引用
就我个人而言，如引用文件我大致会按照这样划分。

分为两层，四个模块：
- 两层：
  - 三方引用
  - 项目内代码
- 四个模块：
  - 核心依赖库
  - 三方依赖库
  - 项目内非同目录引用
  - 项目内同目录引用
有着自己的规则，则便于与人合作是便于查看代码，以及了解一个项目的使用方式。

```typescript
// example file: ~/src/database/database.modules.ts
// 三方引用
import { Module, Global, DynamicModule } from '@nestjs/common';// 核心依赖库
import * as mongoose from 'mongoose';// 三方依赖库
import { getModelForClass } from '@typegoose/typegoose';// 三方依赖库

// 中间存在空格
// 项目内代码
import { DB_CONNECTION_TOKEN } from '@BA/config/global';// 项目内非同目录引用
import { DatabaseConnectionOptions, DatabaseClass } from './database.interface';// 项目内同目录引用
import { getModelToken } from './database.transform';// 项目内同目录引用
```

### 代码目录的规划
- nestjs 中已经规划好相关的目录结构是优秀的示例。


