import { Module } from '@nestjs/common';
import { StateService } from './state.service';
import { StateController } from './state.controller';
import { UtilsModule } from '../utils/utils.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UnstakeTickets } from 'src/entities/unstaketickets.entity';
import { StakeDelegation } from 'src/entities/stakedelegationhistory.entity';
import { EpochModule } from '../epoch/epoch.module';
import { StaderSolPriceHistory } from 'src/entities/staderSolpricehistory.entity';
@Module({
  imports: [
    UtilsModule,
    TypeOrmModule.forFeature([UnstakeTickets, StakeDelegation, StaderSolPriceHistory]),
    EpochModule
  ],
  controllers: [StateController],
  providers: [StateService],
  exports: [StateService]
})
export class StateModule {} 