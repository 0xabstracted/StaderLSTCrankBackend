import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import {
  MongooseModuleOptions,
  MongooseOptionsFactory,
} from '@nestjs/mongoose';
import { EnvironmentConfigService } from '../environment-config';

@Injectable()
export class MongooseConfigService implements MongooseOptionsFactory {
  constructor(
    private readonly environmentConfigService:EnvironmentConfigService
  ) {}
  createMongooseOptions():
    | MongooseModuleOptions
    | Promise<MongooseModuleOptions> {
    const uri = this.environmentConfigService.getMongoDbUri();
    return {
      uri,
    };
  }
}
