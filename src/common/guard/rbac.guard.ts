import { CanActivate, ExecutionContext, Injectable, ForbiddenException } from '@nestjs/common';
import { Observable } from 'rxjs';

@Injectable()
export class RBACGuard implements CanActivate {
  constructor(private readonly role: number) {}
  canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    const user = request.user;
    if (user.role > this.role) {
      throw new ForbiddenException('无权访问，暂无权限访问');
    }
    return true;
  }
}
