import { Module } from '@nestjs/common';
import {
  EnvironmentConfigModule,
  ServiceLevelLogger,
} from 'src/infrastructure';
import { SolanaUtilService } from './solana-utils.service';

@Module({
  imports: [EnvironmentConfigModule],
  providers: [
    SolanaUtilService,
    {
      provide: 'SOLANA_UTIL_LOGGER',
      useValue: new ServiceLevelLogger('SOLANA_UTIL_LOGGER'),
    },
  ],
  exports: [SolanaUtilService],
})
export class UtilsModule {}
