/*
 * @Date: 2022-09-01 16:54:34
 * @LastEditTime: 2022-09-01 16:55:24
 */
import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class LocalAuthGuard extends AuthGuard('local') {}
