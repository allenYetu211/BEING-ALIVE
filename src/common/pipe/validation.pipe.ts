/*
 * @Date: 2022-09-01 15:23:37
 * @LastEditTime: 2022-09-23 15:59:01
 */

import { PipeTransform, Injectable, ArgumentMetadata, BadRequestException } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';

@Injectable()
export class ValidationPipe implements PipeTransform {
  async transform(value: any, { metatype }: ArgumentMetadata) {
    if (this.isUnverifiableMetatype(metatype)) {
      return value;
    }

    const object = plainToInstance(metatype, value);
    const errors = await validate(object);

    if (errors.length > 0) {
      const errorCollection: string[] = [];
      errors.forEach((error) => {
        errorCollection.push(Object.values(error.constraints!)[0]);
      });
      const errorMessage = errorCollection.join(' | ');
      throw new BadRequestException(errorMessage);
    }

    return object;
  }

  private isUnverifiableMetatype(metatype: Function): boolean {
    const types: Function[] = [String, Boolean, Number, Array, Object];
    return !metatype || types.includes(metatype as any);
  }
}
