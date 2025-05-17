import { SetMetadata } from '@nestjs/common';

export const SetResponseCode = (code: any) =>
  SetMetadata('statusCode', code);
