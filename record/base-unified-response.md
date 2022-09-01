<!--
 * @Date: 2022-08-31 23:48:27
 * @LastEditTime: 2022-09-01 01:19:59
-->

# 统一返回格式

- 统一数据结构，方便前端在拦截器中统一处理异常

### 异常数据结构处理

基于 nestjs 中的`异常过滤器`提供的 `ExceptionFilter` 进行扩展， `ExceptionFilter` 是基于 `HttpException` 进行封装的内置类。

```typescript
// file: ~/src/filter/http-exception.filter.ts
export enum ResponseState {
	Success = 'success',
	Error = 'error',
}
---

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
import { ResponseState } from '@BA/interface/rest.interface'

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
      status: ResponseState.Error,
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

### 正常数据结构处理

基于 nestjs 中的`拦截器`进行处理, 基于 nestjs 中的`NestInterceptor`进行扩展。

```typescript
export enum ResponseState {
	Success = 'success',
	Error = 'error',
}
---
import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { ResponseState } from '@BA/interface/rest.interface'

export interface Response<T> {
  data: T;
}

@Injectable()
export class TransformInterceptor<T> implements NestInterceptor<T, Response<T>> {
  intercept(context: ExecutionContext, next: CallHandler): Observable<Response<T>> {
    return next.handle().pipe(
      map((data) => {
        return {
          data,
          status: ResponseState.Success
				};
      }),
    );
  }
}
```
