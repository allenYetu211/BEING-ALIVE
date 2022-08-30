import { Inject } from '@nestjs/common';
import { DatabaseClass } from './database.interface';

export const getModelToken = (model: string) => {
  return `${model}Token`;
};

export const InjectModel = (model: DatabaseClass) => {
  return Inject(getModelToken(model.name));
};
