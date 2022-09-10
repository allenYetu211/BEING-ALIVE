/*
 * @Date: 2022-09-01 18:24:12
 * @LastEditTime: 2022-09-10 14:06:19
 */
import { createHash } from 'crypto';

export const decodeMD5 = (value: string): string => {
  return createHash('md5').update(value).digest('hex');
};
