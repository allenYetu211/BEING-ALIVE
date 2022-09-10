import { ExceptionFilter, Catch, ArgumentsHost, HttpException, HttpStatus } from '@nestjs/common';
import { HttpAdapterHost } from '@nestjs/core';
import * as _ from 'lodash';

import { loggers } from '@BA/common/utils/logger';
import { ResponseState } from '@BA/common/interface/rest.interface';

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  constructor(private readonly httpAdapterHost: HttpAdapterHost) {}

  catch(exception: unknown, host: ArgumentsHost): void {
    const { httpAdapter } = this.httpAdapterHost;
    const ctx = host.switchToHttp();

    const request = ctx.getRequest();
    const { headers } = request;

    const message = _.isString(exception)
      ? exception
      : exception instanceof HttpException
      ? exception.message
      : JSON.stringify(exception);

    const httpStatus =
      exception instanceof HttpException ? exception.getStatus() : HttpStatus.INTERNAL_SERVER_ERROR;

    const responseBody = {
      statusCode: httpStatus,
      timestamp: new Date().toISOString(),
      path: httpAdapter.getRequestUrl(ctx.getRequest()),
      message,
      status: ResponseState.Error
    };

    const address = headers['x-real-ip'] || headers['x-forwarded-for'] || '';
    loggers.error(
      { label: '<<RESPONSE ERROR>>' },
      `${address} |`,
      `${responseBody.statusCode} |`,
      message
    );

    httpAdapter.reply(ctx.getResponse(), responseBody, httpStatus);
  }
}
