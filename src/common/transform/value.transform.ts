/*
 * @Date: 2022-09-22 23:44:56
 * @LastEditTime: 2022-09-22 23:53:34
 */
import { isNumberString } from 'class-validator';

export const unknownToNumber = (value: unknown) => {
  return isNumberString(value) ? Number(value) : value;
};
