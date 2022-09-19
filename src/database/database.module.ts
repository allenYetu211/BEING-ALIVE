/*
 * @Date: 2022-08-30 15:08:51
 * @LastEditTime: 2022-08-30 18:04:39
 */
import { Module, Global, DynamicModule } from '@nestjs/common';
import * as mongoose from 'mongoose';
import { getModelForClass } from '@typegoose/typegoose';

import { DB_CONNECTION_TOKEN } from '@/common/config/global';
import { DatabaseConnectionOptions, DatabaseClass } from './database.interface';
import { getModelToken } from './database.transform';

/**
 * 创建动态模块
 * 在初始时调用forRoot ，建立数据库连接
 * 在module中调用forFeature，导入各个子模块module中，解决引用问题。
 * 在module中的service模块在使用InjectModel注入模型便于模块使用。
 */
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

        // @ts-ignore  , 暂时无法确认此问题原因
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
