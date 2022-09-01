<!--
 * @Date: 2022-08-31 22:30:58
 * @LastEditTime: 2022-08-31 23:57:10
-->

# 日志模块

在 nodejs 中有部署后日志记录的库，在 github 中 start 数量较多的有`winston`，`log4js`。而在 2021 年中`log4j`中爆出大量安全漏洞，而`log4js`为`log4j`的`node`版本。大概率应该是没有问题的，但还是在项目中选择`winston`作为日志存储库。

## 核心代码

```typescript
// 在打包后的dist目录下会记录logs文件，在部署环境中就是跟目录了。
export const LOG_FILE_PATH = path.resolve(__dirname, '../logs');

---
import * as winston from 'winston'
import * as DailyRotateFile from 'winston-daily-rotate-file'

import { LOG_FILE_PATH } from '@BA/config/global'

enum LoggerLevel {
  Debug = 'debug',
  Info = 'info',
  Warn = 'warn',
  Error = 'error',
}

/**
 * 封装logger请求，日志中添加IP，报错时候添加错误信息
 */
class CreateLoggers {
  private winstonLogger;
  constructor () {
    this.winstonLogger = winston.createLogger({
      format: winston.format.combine(
        winston.format.colorize(),
        winston.format.timestamp({
          format: 'YYYY/MM/DD HH:mm:ss',
        }),
        winston.format.simple(),
        winston.format.printf(({ level, label, message, timestamp }) => {
          // 最终输入的日志格式
          return `${timestamp} [${label}] ${level}: ${message}`;
        })
      ),
      transports: [
        // 文件存储名称，时间划分
        new DailyRotateFile({
          filename: 'application-%DATE%.log',
          datePattern: 'YYYY-MM-DD-HH',
          zippedArchive: true,
          maxSize: '20m',
          maxFiles: '14d',
          dirname: LOG_FILE_PATH,
        }),
        new winston.transports.Console({
          level: 'info',
        })
      ]
    })
  }

  public renderLog(method: LoggerLevel) {
    return (...args: any) => {
      const [first, ...other] = args
      const isLabel = typeof first === 'object' && first.label
      const message = isLabel ? other : args

      const opt = {
        level: LoggerLevel[method],
        // 允许自定义label，便于后续检索
        label: isLabel ? first.label : 'LOG',
        message: this.renderMessage(message).join(' '),
      }

      return this.winstonLogger[method](opt);
    };
  }

  private renderMessage(message: any[]) {
    return message.map((msg) => (typeof msg === 'string' ? msg : JSON.stringify(msg)));
  }
}

const createLogger = new CreateLoggers()

// winston中有大量内置方法， 这里只是将其中部分在项目中会使用到的抽离出来。
export const loggers = {
  debug: createLogger.renderLog(LoggerLevel.Debug),
  error: createLogger.renderLog(LoggerLevel.Error),
  info: createLogger.renderLog(LoggerLevel.Info),
  warn: createLogger.renderLog(LoggerLevel.Warn),
}
```

## 使用

```typescript
import { loggers } from '@BA/utils/logger';

loggers.info('LoginUserAuth: login');
loggers.error({ label: '[REQUEST]' }, 'LoginUserAuth: login');
```
