/*
 * @Date: 2022-09-09 11:41:31
 * @LastEditTime: 2022-09-10 14:04:37
 */
import { SetMetadata } from '@nestjs/common';
import { Role } from '@BA/common/enums/enums';

export const ROLES_KEY = 'roles';
export const Roles = (...roles: Role[]) => SetMetadata(ROLES_KEY, roles);
