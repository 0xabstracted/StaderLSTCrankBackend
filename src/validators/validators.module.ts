import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Validator } from 'src/entities';
import { ServiceLevelLogger, TypeOrmConfigModule } from 'src/infrastructure';
import { ValidatorsDataService } from './validators-data.service';
import { ValidatorController } from './validators.controller';
import { EnvironmentConfigModule } from 'src/infrastructure';
import { ScheduleModule } from '@nestjs/schedule';

@Module({
  imports: [
    ScheduleModule.forRoot(),
    EnvironmentConfigModule,
    TypeOrmConfigModule,
    TypeOrmModule.forFeature([Validator]),
  ],
  providers: [
    ValidatorsDataService,
    {
      provide: 'VALIDATORS_DATA_SERVICE_LOGGER',
      useValue: new ServiceLevelLogger('VALIDATORS_DATA_SERVICE_LOGGER'),
    },
  ],
  controllers: [ValidatorController],
  exports: [ValidatorsDataService],
})
export class ValidatorsModule {}
