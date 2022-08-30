import { MongoClientOptions } from 'mongodb';


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
