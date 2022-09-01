import { createHash } from 'crypto';

export const decodeMD5 = (value: string): string => {
  return createHash('md5').update(value).digest('hex');
};
