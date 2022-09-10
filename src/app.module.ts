/*
 * @Date: 2022-08-28 14:44:57
 * @LastEditTime: 2022-09-10 11:49:59
 */
import { APP_GUARD } from '@nestjs/core';
import { Module } from '@nestjs/common';

/**
 * 功能模块
 */
import { UserModule } from './module/user/user.module';
import { AuthModule } from './module/auth/auth.module';
import { TagsModule } from './module/tags/tags.module';

/**
 * mongoose 配置
 **/
import { MONGO_URI, MONGO_USERNAME, MONGO_PWD, MONGO_DB_NAME } from '@BA/common/config/global';
import { DatabaseModule } from '@BA/database';

/**
 * 全局守卫
 */
import { RolesGuard } from '@BA/common/guard/roles.guard';

@Module({
  imports: [
    TagsModule,
    DatabaseModule.forRoot(MONGO_URI, {
      user: MONGO_USERNAME,
      pass: MONGO_PWD,
      dbName: MONGO_DB_NAME
    }),
    UserModule,
    AuthModule
  ],
  controllers: [],
  providers: [
    {
      provide: APP_GUARD,
      useClass: RolesGuard
    }
  ]
})
export class AppModule {}
