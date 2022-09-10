/*
 * @Date: 2022-09-09 11:41:31
 * @LastEditTime: 2022-09-10 14:01:20
 */
import { SetMetadata } from '@nestjs/common';
import { Role } from '@BA/common/enums';

export const ROLES_KEY = 'roles';
export const Roles = (...roles: Role[]) => SetMetadata(ROLES_KEY, roles);
