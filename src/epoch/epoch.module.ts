import { Module } from '@nestjs/common';
import { EpochService } from './epoch.service';
import { EpochController } from './epoch.controller';
import { UtilsModule } from '../utils/utils.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EpochInfo } from '../entities/epoch-info.entity';
import { EpochTrackerService } from './epoch-tracker.service';

@Module({
  imports: [
    UtilsModule,
    TypeOrmModule.forFeature([EpochInfo])
  ],
  controllers: [EpochController],
  providers: [EpochService, EpochTrackerService],
  exports: [EpochService, EpochTrackerService]
})
export class EpochModule {} 