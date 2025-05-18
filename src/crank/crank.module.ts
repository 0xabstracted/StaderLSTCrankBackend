import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Validator, StakeDelegation } from 'src/entities';
import { CrankOpsService } from './crank-ops.service';
import { CrankDataService } from './crank-data.service';
import { CrankSchedulerService } from './crank-scheduler.service';
import { UtilsModule } from 'src/utils/utils.module';
import { ServiceLevelLogger } from 'src/infrastructure';
import { StateModule } from '../state/state.module';
import { EpochModule } from '../epoch/epoch.module';
import { ScheduleModule } from '@nestjs/schedule';
import { CrankController } from './crank.controller';

@Module({
  imports: [
    UtilsModule,
    StateModule,
    EpochModule,
    TypeOrmModule.forFeature([Validator, StakeDelegation]),
    ScheduleModule.forRoot(),
  ],
  providers: [
    CrankDataService,
    CrankSchedulerService,
    CrankOpsService,
    {
      provide: 'CRANK_DATA_SERVICE_LOGGER',
      useValue: new ServiceLevelLogger('CRANK_DATA_SERVICE_LOGGER'),
    },
  ],
  controllers: [CrankController],
  exports: [],
})
export class CrankModule {}
