import type { Types } from 'mongoose';
import type { DocumentType } from '@typegoose/typegoose';

export type MongooseDoc<T> = Omit<DocumentType<T>, '_id' | 'id'> & T & { _id: Types.ObjectId };

export type MongooseID = Types.ObjectId | string;
