<!--
 * @Date: 2022-09-19 17:20:46
 * @LastEditTime: 2022-09-19 17:35:16
-->

# rbac 权限模型

## 概念：

rbac 可以分：0/1/2/3 四种。

rbac 0
基础的用户角色、权限模型分为两种

- `单用户`对应`单角色`, 一个用户只能充当一个角色，一个角色可以被多个用户所用。
- `单用户`对应`多角色`, 一个用户可以充当多个角色，一个角色可以被多个用户所用。

rbac 1
相对于 RBAC0 模型，增加了子角色，引入了继承概念，即子角色可以继承父角色的所有权限。

rbac 2
基于 RBAC0 模型，增加了对角色的一些限制：角色互斥、基数约束、先决条件角色等。

【角色互斥】：同一用户不能分配到一组互斥角色集合中的多个角色，互斥角色是指权限互相制约的两个角色。案例：财务系统中一个用户不能同时被指派给会计角色和审计员角色。
【基数约束】：一个角色被分配的用户数量受限，它指的是有多少用户能拥有这个角色。例如：一个角色专门为公司 CEO 创建的，那这个角色的数量是有限的。
【先决条件角色】：指要想获得较高的权限，要首先拥有低一级的权限。例如：先有副总经理权限，才能有总经理权限。
【运行时互斥】：例如，允许一个用户具有两个角色的成员资格，但在运行中不可同时激活这两个角色。

rbac 3
称为统一模型，它包含了 RBAC 1 和 RBAC 2，利用传递性，也把 RBAC 0 包括在内，综合了 RBAC 0、RBAC 1 和 RBAC 2 的所有特点。

## 实现：基于 guard 实现权限校验

新增权限权限枚举, 超级管理员：0，管理员：1，普通用户：2

```typescript
// ~/common/enums/role.ts
export enum Role {
  ADMIN = 0,
  MANAGER = 1,
  MEMBER = 2
}
```

修改用户模型，在创建用户的时候，默认为普通用户权限，手动修改数据库，设置超级管理员权限。

```typescript
// ~/src/module/user/user.model.ts
export type UserDocument = User & Document;
export class User {
  // ...
  @prop({ default: Role.MEMBER })
  role: number;
}
```

编写校验逻辑，在路由中传入 guard 访问权限内容，通过对比数据库中的权限与接口的权限。

```typescript
// ~/guard/rbac.guard.ts
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
```

通过 useGuards 使用，传入当前接口允许访问的权限。

> 注意： JWT guard 顺序与 RBAC guard 顺序。 需要先经过 jwt 解析验证权限后，才能让 RBAC guard 进行权限校验。

```typescript
import { Controller, Get, UseGuards, Request } from '@nestjs/common';
import { JwtAccessAuthGuard } from '@/common/guard/jwt-access.guard';
import { RBACGuard } from '@/common/guard/rbac.guard';
import { Role } from '@/common/enums/enums';

@Controller()
export class TagsController {
  @Get('tags')
  @UseGuards(new RBACGuard(Role.ADMIN))
  @UseGuards(JwtAccessAuthGuard)
  public async test(@Request() req) {
    return 'succeed ! ';
  }
}
```
