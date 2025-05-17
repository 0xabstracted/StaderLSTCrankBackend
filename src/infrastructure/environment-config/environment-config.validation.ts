import { Transform, plainToClass } from '@nestjs/class-transformer';
import {
  IsBoolean,
  IsString,
  IsNumber,
  IsEnum,
  validateSync,
} from '@nestjs/class-validator';

enum Environment {
  Production = 'production',
  Staging = 'staging',
  Test = 'test',
  Local = 'local',
}

class EnvironmentVariables {
  @IsEnum(Environment)
  NODE_ENV: Environment;

  @IsString()
  DB_CONNECTION_URL: string;

  @IsString()
  VALIDATORS_APP_API_KEY: string;

  @IsString()
  VALIDATORS_APP_URL: string;
}

export function validate(config: Record<string, unknown>) {
  const validatedConfig = plainToClass(EnvironmentVariables, config, {
    enableImplicitConversion: true,
  });
  // console.log(validatedConfig)
  const errors = validateSync(validatedConfig, {
    skipMissingProperties: false,
  });
  if (errors.length > 0) {
    throw new Error(errors.toString());
  }
  return validatedConfig;
}
