import { Module } from '@nestjs/common';
import { DatabaseModule } from '../mongoose/database.module';
import { MongooseModule } from '@nestjs/mongoose';
import { TypeOrmModule } from '@nestjs/typeorm';
import {
  AddValidatorEvent,
  AddValidatorEventSchema,
  AddLiquidityEvent,
  AddLiquidityEventSchema,
  ChangeAuthorityEvent,
  ChangeAuthorityEventSchema,
  ConfigLpEvent,
  ConfigLpEventSchema,
  ConfigStaderLiquidStakingEvent,
  ConfigStaderLiquidStakingEventSchema,
  ClaimEvent,
  ClaimEventSchema,
  DeactivateStakeEvent,
  DeactivateStakeEventSchema,
  DepositEvent,
  DepositEventSchema,
  DepositStakeAccountEvent,
  DepositStakeAccountEventSchema,
  EmergencyPauseEvent,
  EmergencyPauseEventSchema,
  InitializeEvent,
  InitializeEventSchema,
  LiquidUnstakeEvent,
  LiquidUnstakeEventSchema,
  MergeStakesEvent,
  MergeStakesEventSchema,
  OrderUnstakeEvent,
  OrderUnstakeEventSchema,
  ReallocStakeListEvent,
  ReallocStakeListEventSchema,
  ReallocValidatorListEvent,
  ReallocValidatorListEventSchema,
  ResumeEvent,
  ResumeEventSchema,
  RedelegateEvent,
  RedelegateEventSchema,
  StakeReserveEvent,
  StakeReserveEventSchema,
  UpdateActiveEvent,
  UpdateActiveEventSchema,
  UpdateDeactivatedEvent,
  UpdateDeactivatedEventSchema,
  RemoveLiquidityEvent,
  RemoveLiquidityEventSchema,
  WithdrawStakeAccountEvent,
  WithdrawStakeAccountEventSchema,
} from '../mongoose/schemas';
import {
  RemoveValidatorEvent,
  RemoveValidatorEventSchema,
} from '../mongoose/schemas';
import {
  SetValidatorScoreEventSchema,
  SetValidatorScoreEvent,
} from '../mongoose/schemas';
import { SolanaEventsService } from './event.service';
import { EventController } from './event.controller';
import { SolanaUtilService } from 'src/utils/solana-utils.service';
import { ServiceLevelLogger } from '../logger-config/service-logger.provider';
import { ValidatorsModule } from 'src/validators/validators.module';
import { EnvironmentConfigModule } from '../environment-config';
import { EpochModule } from 'src/epoch/epoch.module';
import { StateModule } from 'src/state/state.module';
import {
  StaderSolPriceHistory,
  StakeDelegation,
  StateMetrics,
  UnstakeTickets,
} from 'src/entities/';

// Import other event schemas as needed
@Module({
  imports: [
    DatabaseModule,
    TypeOrmModule.forFeature([
      StakeDelegation,
      UnstakeTickets,
      StaderSolPriceHistory,
      StateMetrics,
    ]),
    MongooseModule.forFeature([
      { name: AddValidatorEvent.name, schema: AddValidatorEventSchema },
      { name: RemoveValidatorEvent.name, schema: RemoveValidatorEventSchema },
      {
        name: SetValidatorScoreEvent.name,
        schema: SetValidatorScoreEventSchema,
      },
      { name: ChangeAuthorityEvent.name, schema: ChangeAuthorityEventSchema },
      { name: ConfigLpEvent.name, schema: ConfigLpEventSchema },
      {
        name: ConfigStaderLiquidStakingEvent.name,
        schema: ConfigStaderLiquidStakingEventSchema,
      },
      { name: EmergencyPauseEvent.name, schema: EmergencyPauseEventSchema },
      { name: InitializeEvent.name, schema: InitializeEventSchema },
      { name: ReallocStakeListEvent.name, schema: ReallocStakeListEventSchema },
      {
        name: ReallocValidatorListEvent.name,
        schema: ReallocValidatorListEventSchema,
      },
      { name: ResumeEvent.name, schema: ResumeEventSchema },
      { name: DeactivateStakeEvent.name, schema: DeactivateStakeEventSchema },
      { name: MergeStakesEvent.name, schema: MergeStakesEventSchema },
      { name: RedelegateEvent.name, schema: RedelegateEventSchema },
      { name: StakeReserveEvent.name, schema: StakeReserveEventSchema },
      { name: UpdateActiveEvent.name, schema: UpdateActiveEventSchema },
      {
        name: UpdateDeactivatedEvent.name,
        schema: UpdateDeactivatedEventSchema,
      },
      { name: ClaimEvent.name, schema: ClaimEventSchema },
      { name: OrderUnstakeEvent.name, schema: OrderUnstakeEventSchema },
      { name: AddLiquidityEvent.name, schema: AddLiquidityEventSchema },
      { name: LiquidUnstakeEvent.name, schema: LiquidUnstakeEventSchema },
      { name: RemoveLiquidityEvent.name, schema: RemoveLiquidityEventSchema },
      { name: DepositEvent.name, schema: DepositEventSchema },
      {
        name: DepositStakeAccountEvent.name,
        schema: DepositStakeAccountEventSchema,
      },
      {
        name: WithdrawStakeAccountEvent.name,
        schema: WithdrawStakeAccountEventSchema,
      },
    ]),
    ValidatorsModule,
    EnvironmentConfigModule,
    EpochModule,
    StateModule,
  ],
  providers: [
    SolanaEventsService,
    SolanaUtilService,
    {
      provide: 'SOLANA_UTIL_LOGGER',
      useValue: new ServiceLevelLogger('SOLANA_UTIL_LOGGER'),
    },
  ],
  controllers: [EventController],
})
export class EventModule {}
