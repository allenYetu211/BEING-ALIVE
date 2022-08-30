import { AuthModule } from './module/auth/auth.module';
/*
 * @Date: 2022-08-28 14:44:57
 * @LastEditTime: 2022-08-30 17:32:50
 */
import { Module } from '@nestjs/common';

/**
 * mongoose 配置
 **/
import {
  MONGO_URI,
  MONGO_USERNAME,
  MONGO_PWD,
  MONGO_DB_NAME,
} from '@BA/config/global';
import { DatabaseModule } from '@BA/database';

@Module({
  imports: [
    AuthModule,
    DatabaseModule.forRoot(MONGO_URI, {
      user: MONGO_USERNAME,
      pass: MONGO_PWD,
      dbName: MONGO_DB_NAME,
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
