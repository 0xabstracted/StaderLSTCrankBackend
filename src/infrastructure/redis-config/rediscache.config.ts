import { ServiceLevelLogger } from '../logger-config/service-logger.provider';
import {
  EnvironmentConfigModule,
  EnvironmentConfigService,
} from '../environment-config';
import { RedisModule } from './redis.module';

export const redisCache = RedisModule.registerAsync({
  imports: [EnvironmentConfigModule],
  useFactory: async (environmentConfigService: EnvironmentConfigService) => {
    const logger = new ServiceLevelLogger('REDIS_LOGGER');
    return {
      connectionOptions: {
        host: environmentConfigService.getRedisHost(),
        port: environmentConfigService.getRedisPort(),
        db: environmentConfigService.getRedisDb(),
        password: environmentConfigService.getRedisPassword(),
      },
      onClientReady: (client) => {
        logger.log('Redis Client Ready');

        client.on('error', (err) => {
          console.log('error redis:', err);
          logger.error(`Redis Client Error: ${err} `);
        });

        client.on('connect', () => {
          logger.log(
            `Connected to redis on ${client.options.host}:${client.options.port}:${client.options.db}`,
          );
        });
      },
    };
  },
  inject: [EnvironmentConfigService],
});
