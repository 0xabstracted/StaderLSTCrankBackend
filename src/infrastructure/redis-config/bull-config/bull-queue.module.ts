import { Module } from '@nestjs/common';
import { EnvironmentConfigModule } from 'src/infrastructure/environment-config';
import { EnvironmentConfigService } from 'src/infrastructure/environment-config';
import { BullModule } from '@nestjs/bull';

@Module({
  imports: [
    BullModule.registerQueueAsync({
      name: 'bill-image-processing-queue',
      imports: [EnvironmentConfigModule],
      inject: [EnvironmentConfigService],
      useFactory: (config: EnvironmentConfigService) => ({
        name: 'bill-image-processing-queue',
        redis: {
          host: config.getRedisHost(),
          port: config.getRedisPort(),
          password: config.getRedisPassword(),
          db: config.getRedisDb(),
        },
      }),
    }),
    BullModule.registerQueueAsync({
      name: 'solana-deposit-payments-processing-queue',
      imports: [EnvironmentConfigModule],
      inject: [EnvironmentConfigService],
      useFactory: (config: EnvironmentConfigService) => ({
        name: 'solana-deposit-payments-processing-queue',
        redis: {
          host: config.getRedisHost(),
          port: config.getRedisPort(),
          password: config.getRedisPassword(),
          db: config.getRedisDb(),
        },
      }),
    }),
    BullModule.registerQueueAsync({
      name: 'solana-withdraw-payments-processing-queue',
      imports: [EnvironmentConfigModule],
      inject: [EnvironmentConfigService],
      useFactory: (config: EnvironmentConfigService) => ({
        name: 'solana-withdraw-payments-processing-queue',
        redis: {
          host: config.getRedisHost(),
          port: config.getRedisPort(),
          password: config.getRedisPassword(),
          db: config.getRedisDb(),
        },
      }),
    }),
  ],
  exports: [BullModule],
})
export class RedisBullQueueConfigModule {}
