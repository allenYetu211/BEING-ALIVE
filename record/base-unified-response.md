<!--
 * @Date: 2022-08-31 23:48:27
 * @LastEditTime: 2022-08-31 23:56:07
-->
# 异常捕获统一返回格式
在服务端抛出异常时，需要进行统一的错误处理。
基于nestjs中提供的 `ExceptionFilter` 进行扩展， `ExceptionFilter` 是基于 `HttpException` 进行封装的内置类。


```typescript
// file: ~/src/filter/http-exception.filter.ts

import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { HttpAdapterHost } from '@nestjs/core';
import * as _ from 'lodash'

import { loggers } from '@BA/utils/logger'; //这里是之前封装的loggers， 在服务端抛出异常时，我们需要进行记录。

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  constructor (private readonly httpAdapterHost: HttpAdapterHost) { }

  catch(exception: unknown, host: ArgumentsHost): void {
    const { httpAdapter } = this.httpAdapterHost;
    const ctx = host.switchToHttp();

    const request = ctx.getRequest()
    const { headers } = request;

    // 获取相关的错误信息内容
    const message = _.isString(exception) ?
      exception : exception instanceof HttpException ?
        exception.message : JSON.stringify(exception);

    const httpStatus = exception instanceof HttpException ?
      exception.getStatus() : HttpStatus.INTERNAL_SERVER_ERROR;

    // 针对错误信息统一格式
    const responseBody = {
      statusCode: httpStatus,
      timestamp: new Date().toISOString(),
      path: httpAdapter.getRequestUrl(ctx.getRequest()),
      message
    };

    // 查找Header中的ip信息。这里是在nginx中进行配置添加到headers中。
    const address = headers['x-real-ip'] || headers['x-forwarded-for'] || ''

    // 统一的错误处理，添加自定义的label，便于后续检索
    loggers.error({ label: '<<RESPONSE ERROR>>' },
      `${address} |`,
      `${responseBody.statusCode} |`,
      message)

    httpAdapter.reply(ctx.getResponse(), responseBody, httpStatus);
  }
}


```
