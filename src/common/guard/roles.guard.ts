/*
 * @Date: 2022-09-10 11:41:21
 * @LastEditTime: 2022-09-10 13:08:57
 */
import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ROLES_KEY } from '@BA/common/decorator/role. decorator';
import { Role } from '@BA/common/enums/enums';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext) {
    const requiredRoles = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass()
    ]);
    if (!requiredRoles) {
      return true;
    }
    const request = context.switchToHttp().getRequest();

    return requiredRoles.some((role) => request.user.roles?.includes(role));
  }
}
