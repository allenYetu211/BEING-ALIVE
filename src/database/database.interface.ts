/*
 * @Date: 2022-08-30 15:32:01
 * @LastEditTime: 2022-09-02 18:27:55
 */
import { MongoClientOptions } from 'mongodb';
import { Document } from 'mongoose';
import { ModelType } from '@typegoose/typegoose/lib/types';

export interface DatabaseClass {
  new (...args: any[]);
}

export interface DatabaseConnectionOptions extends MongoClientOptions {
  bufferCommands?: boolean;
  dbName?: string;
  user?: string;
  pass?: string;
  autoIndex?: boolean;
  autoCreate?: boolean;
}

export type MongooseModel<T> = ModelType<T> & Document;
