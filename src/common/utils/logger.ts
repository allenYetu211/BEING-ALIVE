/*
 * @Date: 2022-08-31 17:25:02
 * @LastEditTime: 2022-08-31 19:11:51
 */

import * as winston from 'winston';
import * as DailyRotateFile from 'winston-daily-rotate-file';

import { LOG_FILE_PATH } from '@BA/common/config/global';

enum LoggerLevel {
  Debug = 'debug',
  Info = 'info',
  Warn = 'warn',
  Error = 'error'
}

/**
 * 封装logger请求，日志中添加IP，报错时候添加错误信息
 */
class CreateLoggers {
  private winstonLogger;
  constructor() {
    this.winstonLogger = winston.createLogger({
      format: winston.format.combine(
        winston.format.colorize(),
        winston.format.timestamp({
          format: 'YYYY/MM/DD HH:mm:ss'
        }),
        winston.format.simple(),
        winston.format.printf(({ level, label, message, timestamp }) => {
          return `${timestamp} [${label}] ${level}: ${message}`;
        })
      ),
      transports: [
        new DailyRotateFile({
          filename: 'application-%DATE%.log',
          datePattern: 'YYYY-MM-DD-HH',
          zippedArchive: true,
          maxSize: '20m',
          maxFiles: '14d',
          dirname: LOG_FILE_PATH
        }),
        new winston.transports.Console({
          level: 'info'
        })
      ]
    });
  }

  public renderLog(method: LoggerLevel) {
    return (...args: any) => {
      const [first, ...other] = args;
      const isLabel = typeof first === 'object' && first.label;
      const message = isLabel ? other : args;

      const opt = {
        level: LoggerLevel[method],
        label: isLabel ? first.label : 'LOG',
        message: this.renderMessage(message).join(' ')
      };

      return this.winstonLogger[method](opt);
    };
  }

  private renderMessage(message: any[]) {
    return message.map((msg) => (typeof msg === 'string' ? msg : JSON.stringify(msg)));
  }
}

const createLogger = new CreateLoggers();

export const loggers = {
  debug: createLogger.renderLog(LoggerLevel.Debug),
  error: createLogger.renderLog(LoggerLevel.Error),
  info: createLogger.renderLog(LoggerLevel.Info),
  warn: createLogger.renderLog(LoggerLevel.Warn)
};
