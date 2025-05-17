import {
  Module,
  DynamicModule,
  ModuleMetadata,
  FactoryProvider,
} from '@nestjs/common';
import IOredis, { Redis, RedisOptions } from 'ioredis';
import { RedisCacheService } from './rediscache.service';

export const IORedisKey = 'IOREDIS';

type RedisModuleOptions = {
  connectionOptions: RedisOptions;
  onClientReady?: (client: Redis) => void;
};

type RedisAsyncModuleOptions = {
  useFactory: (
    ...args: any[]
  ) => Promise<RedisModuleOptions> | RedisModuleOptions | any;
} & Pick<ModuleMetadata, 'imports'> &
  Pick<FactoryProvider, 'inject'>;

@Module({
  imports: [],
  providers: [],
  exports: [],
})
export class RedisModule {
  static async registerAsync({
    useFactory,
    imports,
    inject,
  }: RedisAsyncModuleOptions): Promise<DynamicModule> {
    const redisProvider = {
      provide: IORedisKey,
      useFactory: async (...args) => {
        const { connectionOptions, onClientReady } = await useFactory(...args);
        const client = await new IOredis(connectionOptions);
        onClientReady(client);
        return client;
      },
      inject,
    };

    return {
      module: RedisModule,
      imports,
      providers: [redisProvider],
      exports: [redisProvider],
    };
  }
}
