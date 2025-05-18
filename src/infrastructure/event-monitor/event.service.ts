import {
  HttpException,
  HttpStatus,
  Injectable,
  OnModuleDestroy,
  OnModuleInit,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Program } from '@coral-xyz/anchor';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {
  ChangeAuthorityEvent,
  ChangeAuthorityEventDocument,
  ConfigLpEvent,
  ConfigLpEventDocument,
  ConfigStaderLiquidStakingEvent,
  ConfigStaderLiquidStakingEventDocument,
  EmergencyPauseEvent,
  EmergencyPauseEventDocument,
  InitializeEvent,
  InitializeEventDocument,
  ReallocStakeListEvent,
  ReallocStakeListEventDocument,
  ReallocValidatorListEvent,
  ReallocValidatorListEventDocument,
  ResumeEvent,
  ResumeEventDocument,
  DeactivateStakeEvent,
  DeactivateStakeEventDocument,
  MergeStakesEvent,
  MergeStakesEventDocument,
  RedelegateEvent,
  RedelegateEventDocument,
  StakeReserveEvent,
  StakeReserveEventDocument,
  UpdateActiveEvent,
  UpdateActiveEventDocument,
  UpdateDeactivatedEvent,
  UpdateDeactivatedEventDocument,
  ClaimEvent,
  ClaimEventDocument,
  OrderUnstakeEvent,
  OrderUnstakeEventDocument,
  AddLiquidityEvent,
  AddLiquidityEventDocument,
  LiquidUnstakeEvent,
  LiquidUnstakeEventDocument,
  RemoveLiquidityEvent,
  RemoveLiquidityEventDocument,
  AddValidatorEvent,
  AddValidatorEventDocument,
  RemoveValidatorEvent,
  RemoveValidatorEventDocument,
  SetValidatorScoreEvent,
  SetValidatorScoreEventDocument,
  DepositEvent,
  DepositEventDocument,
  DepositStakeAccountEvent,
  DepositStakeAccountEventDocument,
  WithdrawStakeAccountEvent,
  WithdrawStakeAccountEventDocument,
} from '../mongoose/schemas';
import { ValidatorsDataService } from 'src/validators/validators-data.service';
import { EnvironmentConfigService } from '../environment-config';
import { EpochService } from 'src/epoch/epoch.service';
import { StateService } from 'src/state/state.service';
import { SolanaUtilService } from 'src/utils/solana-utils.service';
import { StaderLiquidStaking } from 'src/utils/targets/types/stader_liquid_staking';
import {
  StaderSolPriceHistory,
  StakeDelegation,
  StateMetrics,
  UnstakeTickets,
} from 'src/entities/';

@Injectable()
export class SolanaEventsService implements OnModuleInit, OnModuleDestroy {
  private program: Program<StaderLiquidStaking>;

  constructor(
    private readonly solanaUtilService: SolanaUtilService,

    @InjectRepository(StakeDelegation)
    private readonly stakeDelegationRepository: Repository<StakeDelegation>,

    // Admin Events
    @InjectModel(ChangeAuthorityEvent.name)
    private changeAuthorityEventModel: Model<ChangeAuthorityEventDocument>,
    @InjectModel(ConfigLpEvent.name)
    private configLpEventModel: Model<ConfigLpEventDocument>,
    @InjectModel(ConfigStaderLiquidStakingEvent.name)
    private configStaderLiquidStakingEventModel: Model<ConfigStaderLiquidStakingEventDocument>,
    @InjectModel(EmergencyPauseEvent.name)
    private emergencyPauseEventModel: Model<EmergencyPauseEventDocument>,
    @InjectModel(InitializeEvent.name)
    private initializeEventModel: Model<InitializeEventDocument>,
    @InjectModel(ReallocStakeListEvent.name)
    private reallocStakeListEventModel: Model<ReallocStakeListEventDocument>,
    @InjectModel(ReallocValidatorListEvent.name)
    private reallocValidatorListEventModel: Model<ReallocValidatorListEventDocument>,
    @InjectModel(ResumeEvent.name)
    private resumeEventModel: Model<ResumeEventDocument>,
    // Crank Events
    @InjectModel(DeactivateStakeEvent.name)
    private deactivateStakeEventModel: Model<DeactivateStakeEventDocument>,
    @InjectModel(MergeStakesEvent.name)
    private mergeStakesEventModel: Model<MergeStakesEventDocument>,
    @InjectModel(RedelegateEvent.name)
    private redelegateEventModel: Model<RedelegateEventDocument>,
    @InjectModel(StakeReserveEvent.name)
    private stakeReserveEventModel: Model<StakeReserveEventDocument>,
    @InjectModel(UpdateActiveEvent.name)
    private updateActiveEventModel: Model<UpdateActiveEventDocument>,
    @InjectModel(UpdateDeactivatedEvent.name)
    private updateDeactivatedEventModel: Model<UpdateDeactivatedEventDocument>,
    // Delayed Unstake Events
    @InjectModel(ClaimEvent.name)
    private claimEventModel: Model<ClaimEventDocument>,
    @InjectModel(OrderUnstakeEvent.name)
    private orderUnstakeEventModel: Model<OrderUnstakeEventDocument>,
    // Liq Pool Events
    @InjectModel(AddLiquidityEvent.name)
    private addLiquidityEventModel: Model<AddLiquidityEventDocument>,
    @InjectModel(LiquidUnstakeEvent.name)
    private liquidUnstakeEventModel: Model<LiquidUnstakeEventDocument>,
    @InjectModel(RemoveLiquidityEvent.name)
    private removeLiquidityEventModel: Model<RemoveLiquidityEventDocument>,
    // Management Events
    @InjectModel(AddValidatorEvent.name)
    private addValidatorEventModel: Model<AddValidatorEventDocument>,
    @InjectModel(RemoveValidatorEvent.name)
    private removeValidatorEventModel: Model<RemoveValidatorEventDocument>,
    @InjectModel(SetValidatorScoreEvent.name)
    private setValidatorScoreEventModel: Model<SetValidatorScoreEventDocument>,
    // User Events
    @InjectModel(DepositEvent.name)
    private depositEventModel: Model<DepositEventDocument>,
    @InjectModel(DepositStakeAccountEvent.name)
    private depositStakeAccountEventModel: Model<DepositStakeAccountEventDocument>,
    @InjectModel(WithdrawStakeAccountEvent.name)
    private withdrawStakeAccountEventModel: Model<WithdrawStakeAccountEventDocument>,
    @InjectRepository(UnstakeTickets)
    private readonly unstakeTicketsRepository: Repository<UnstakeTickets>,
    private readonly epochService: EpochService,
    private validatorsDataService: ValidatorsDataService,
    private readonly environmentConfigService: EnvironmentConfigService,
    private readonly stateService: StateService,
    @InjectRepository(StaderSolPriceHistory)
    private readonly staderSolPriceHistoryRepository: Repository<StaderSolPriceHistory>,
    @InjectRepository(StateMetrics)
    private readonly stateMetricsRepository: Repository<StateMetrics>,
  ) {
    this.program = this.solanaUtilService.getProgram();
  }

  async onModuleInit() {
    console.log('Starting subscription to Solana events...');
    // Admin Events
    await this.subscribeToChangeAuthorityEvent();
    await this.subscribeToConfigLpEvent();
    await this.subscribeToConfigStaderLiquidStakingEvent();
    await this.subscribeToEmergencyPauseEvent();
    await this.subscribeToInitializeEvent();
    await this.subscribeToReallocStakeListEvent();
    await this.subscribeToReallocValidatorListEvent();
    await this.subscribeToResumeEvent();
    // Crank Events
    await this.subscribeToDeactivateStakeEvent();
    await this.subscribeToMergeStakesEvent();
    await this.subscribeToRedelegateEvent();
    await this.subscribeToStakeReserveEvent();
    await this.subscribeToUpdateActiveEvent();
    await this.subscribeToUpdateDeactivatedEvent();
    // Delayed Unstake Events
    await this.subscribeToClaimEvent();
    await this.subscribeToOrderUnstakeEvent();
    // Liq Pool Events
    await this.subscribeToAddLiquidityEvent();
    await this.subscribeToLiquidUnstakeEvent();
    await this.subscribeToRemoveLiquidityEvent();
    // Management Events
    await this.subscribeToAddValidatorEvent();
    await this.subscribeToRemoveValidatorEvent();
    await this.subscribeToSetValidatorScoreEvent();
    // User Events
    await this.subscribeToDepositEvent();
    await this.subscribeToDepositStakeAccountEvent();
    await this.subscribeToWithdrawStakeAccountEvent();
  }

  // Admin Events
  async subscribeToChangeAuthorityEvent() {
    try {
      const changeAuthoritySubId = this.program.addEventListener(
        'ChangeAuthorityEvent',
        async (event) => {
          const newEvent = new this.changeAuthorityEventModel({
            state: event.state,
            adminChange: event.adminChange,
            validatorManagerChange: event.validatorManagerChange,
            operationalSolAccountChange: event.operationalSolAccountChange,
            treasuryStaderSolAccountChange:
              event.treasuryStaderSolAccountChange,
            pauseAuthorityChange: event.pauseAuthorityChange,
          });
          await newEvent.save();
          console.log('ChangeAuthorityEvent saved to MongoDB');
        },
      );
    } catch (error) {
      console.error('Error subscribing to ChangeAuthorityEvent:', error);
    }
  }

  async subscribeToConfigLpEvent() {
    try {
      const configLpSubId = this.program.addEventListener(
        'ConfigLpEvent',
        async (event) => {
          const newEvent = new this.configLpEventModel({
            state: event.state,
            minFeeChange: event.minFeeChange,
            maxFeeChange: event.maxFeeChange,
            liquidityTargetChange: event.liquidityTargetChange,
            treasuryCutChange: event.treasuryCutChange,
          });
          await newEvent.save();
          console.log('ConfigLpEvent saved to MongoDB');
        },
      );
    } catch (error) {
      console.error('Error subscribing to ConfigLpEvent:', error);
    }
  }

  async subscribeToConfigStaderLiquidStakingEvent() {
    try {
      const configStaderSubId = this.program.addEventListener(
        'ConfigStaderLiquidStakingEvent',
        async (event) => {
          const newEvent = new this.configStaderLiquidStakingEventModel({
            state: event.state,
            rewardsFeeChange: event.rewardsFeeChange,
            slotsForStakeDeltaChange: event.slotsForStakeDeltaChange,
            minStakeChange: event.minStakeChange,
            minDepositChange: event.minDepositChange,
            minWithdrawChange: event.minWithdrawChange,
            stakingSolCapChange: event.stakingSolCapChange,
            liquiditySolCapChange: event.liquiditySolCapChange,
            withdrawStakeAccountEnabledChange:
              event.withdrawStakeAccountEnabledChange,
            delayedUnstakeFeeChange: event.delayedUnstakeFeeChange,
            withdrawStakeAccountFeeChange: event.withdrawStakeAccountFeeChange,
            maxStakeMovedPerEpochChange: event.maxStakeMovedPerEpochChange,
          });
          await newEvent.save();
          console.log('ConfigStaderLiquidStakingEvent saved to MongoDB');
        },
      );
    } catch (error) {
      console.error(
        'Error subscribing to ConfigStaderLiquidStakingEvent:',
        error,
      );
    }
  }

  async subscribeToEmergencyPauseEvent() {
    try {
      const emergencyPauseSubId = this.program.addEventListener(
        'EmergencyPauseEvent',
        async (event) => {
          const newEvent = new this.emergencyPauseEventModel({
            state: event.state,
          });
          await newEvent.save();
          console.log('EmergencyPauseEvent saved to MongoDB');
        },
      );
    } catch (error) {
      console.error('Error subscribing to EmergencyPauseEvent:', error);
    }
  }

  async subscribeToInitializeEvent() {
    try {
      const initializeSubId = this.program.addEventListener(
        'InitializeEvent',
        async (event) => {
          const newEvent = new this.initializeEventModel({
            state: event.state,
            params: event.params,
            stakeList: event.stakeList,
            validatorList: event.validatorList,
            staderSolMint: event.staderSolMint,
            operationalSolAccount: event.operationalSolAccount,
            lpMint: event.lpMint,
            lpStaderSolLeg: event.lpStaderSolLeg,
            treasuryStaderSolAccount: event.treasuryStaderSolAccount,
          });
          await newEvent.save();
          console.log('InitializeEvent saved to MongoDB');
        },
      );
    } catch (error) {
      console.error('Error subscribing to InitializeEvent:', error);
    }
  }

  async subscribeToReallocStakeListEvent() {
    try {
      const reallocStakeListSubId = this.program.addEventListener(
        'ReallocStakeListEvent',
        async (event) => {
          const newEvent = new this.reallocStakeListEventModel({
            state: event.state,
            count: event.count,
            newCapacity: event.newCapacity,
          });
          await newEvent.save();
          console.log('ReallocStakeListEvent saved to MongoDB');
        },
      );
    } catch (error) {
      console.error('Error subscribing to ReallocStakeListEvent:', error);
    }
  }

  async subscribeToReallocValidatorListEvent() {
    try {
      const reallocValidatorListSubId = this.program.addEventListener(
        'ReallocValidatorListEvent',
        async (event) => {
          const newEvent = new this.reallocValidatorListEventModel({
            state: event.state,
            count: event.count,
            newCapacity: event.newCapacity,
          });
          await newEvent.save();
          console.log('ReallocValidatorListEvent saved to MongoDB');
        },
      );
    } catch (error) {
      console.error('Error subscribing to ReallocValidatorListEvent:', error);
    }
  }

  async subscribeToResumeEvent() {
    try {
      const resumeSubId = this.program.addEventListener(
        'ResumeEvent',
        async (event) => {
          const newEvent = new this.resumeEventModel({
            state: event.state,
          });
          await newEvent.save();
          console.log('ResumeEvent saved to MongoDB');
        },
      );
    } catch (error) {
      console.error('Error subscribing to ResumeEvent:', error);
    }
  }

  // Crank Events
  async subscribeToDeactivateStakeEvent() {
    try {
      const deactivateStakeSubId = this.program.addEventListener(
        'DeactivateStakeEvent',
        async (event) => {
          const newEvent = new this.deactivateStakeEventModel({
            state: event.state,
            epoch: event.epoch,
            stakeIndex: event.stakeIndex,
            stakeAccount: event.stakeAccount,
            lastUpdateStakeDelegation: event.lastUpdateStakeDelegation,
            splitStakeAccount: event.splitStakeAccount,
            validatorIndex: event.validatorIndex,
            validatorVote: event.validatorVote,
            totalStakeTarget: event.totalStakeTarget,
            validatorStakeTarget: event.validatorStakeTarget,
            totalActiveBalance: event.totalActiveBalance,
            delayedUnstakeCoolingDown: event.delayedUnstakeCoolingDown,
            validatorActiveBalance: event.validatorActiveBalance,
            totalUnstakeDelta: event.totalUnstakeDelta,
            unstakedAmount: event.unstakedAmount,
          });
          await newEvent.save();
          console.log('DeactivateStakeEvent saved to MongoDB');
        },
      );
    } catch (error) {
      console.error('Error subscribing to DeactivateStakeEvent:', error);
    }
  }

  async subscribeToMergeStakesEvent() {
    try {
      const mergeStakesSubId = this.program.addEventListener(
        'MergeStakesEvent',
        async (event) => {
          const newEvent = new this.mergeStakesEventModel({
            state: event.state,
            epoch: event.epoch,
            destinationStakeIndex: event.destinationStakeIndex,
            destinationStakeAccount: event.destinationStakeAccount,
            lastUpdateDestinationStakeDelegation:
              event.lastUpdateDestinationStakeDelegation,
            sourceStakeIndex: event.sourceStakeIndex,
            sourceStakeAccount: event.sourceStakeAccount,
            lastUpdateSourceStakeDelegation:
              event.lastUpdateSourceStakeDelegation,
            validatorIndex: event.validatorIndex,
            validatorVote: event.validatorVote,
            extraDelegated: event.extraDelegated,
            returnedStakeRent: event.returnedStakeRent,
            validatorActiveBalance: event.validatorActiveBalance,
            totalActiveBalance: event.totalActiveBalance,
            operationalSolBalance: event.operationalSolBalance,
          });
          await newEvent.save();
          console.log('MergeStakesEvent saved to MongoDB');
        },
      );
    } catch (error) {
      console.error('Error subscribing to MergeStakesEvent:', error);
    }
  }

  async subscribeToRedelegateEvent() {
    try {
      const redelegateSubId = this.program.addEventListener(
        'RedelegateEvent',
        async (event) => {
          const newEvent = new this.redelegateEventModel({
            state: event.state,
            epoch: event.epoch,
            stakeIndex: event.stakeIndex,
            stakeAccount: event.stakeAccount,
            lastUpdateDelegation: event.lastUpdateDelegation,
            sourceValidatorIndex: event.sourceValidatorIndex,
            sourceValidatorVote: event.sourceValidatorVote,
            sourceValidatorScore: event.sourceValidatorScore,
            sourceValidatorBalance: event.sourceValidatorBalance,
            sourceValidatorStakeTarget: event.sourceValidatorStakeTarget,
            destValidatorIndex: event.destValidatorIndex,
            destValidatorVote: event.destValidatorVote,
            destValidatorScore: event.destValidatorScore,
            destValidatorBalance: event.destValidatorBalance,
            destValidatorStakeTarget: event.destValidatorStakeTarget,
            redelegateAmount: event.redelegateAmount,
            splitStakeAccount: event.splitStakeAccount,
            redelegateStakeIndex: event.redelegateStakeIndex,
            redelegateStakeAccount: event.redelegateStakeAccount,
          });
          await newEvent.save();
          console.log('RedelegateEvent saved to MongoDB');
        },
      );
    } catch (error) {
      console.error('Error subscribing to RedelegateEvent:', error);
    }
  }

  // TODO: GET THE NEWLY CREATED STAKE ACCOUNT AND ITS INDEX.
  //  * 1. CREATE RECORD ON DB.
  //  * 2. STORE THE VALIDATOR AND ITS INDEX .
  async subscribeToStakeReserveEvent() {
    try {
      const stakeReserveSubId = this.program.addEventListener(
        'StakeReserveEvent',
        async (event) => {
          const newEvent = new this.stakeReserveEventModel({
            state: event.state,
            epoch: event.epoch,
            stakeIndex: event.stakeIndex,
            stakeAccount: event.stakeAccount,
            validatorIndex: event.validatorIndex,
            validatorVote: event.validatorVote,
            totalStakeTarget: event.totalStakeTarget,
            validatorStakeTarget: event.validatorStakeTarget,
            reserveBalance: event.reserveBalance,
            totalActiveBalance: event.totalActiveBalance,
            validatorActiveBalance: event.validatorActiveBalance,
            totalStakeDelta: event.totalStakeDelta,
            amount: event.amount,
          });
          // Save the dump of the log to mongo db
          await newEvent.save();
          console.log('StakeReserveEvent saved to MongoDB');
          // Save the stake account and validator account to pg db
          const newstakeDelegationEntry = new StakeDelegation();
          newstakeDelegationEntry.stakeAccount = event.stakeAccount.toString();
          newstakeDelegationEntry.stakeAcIndex = Number(
            event.stakeIndex.toString(),
          );
          newstakeDelegationEntry.validatorAccount =
            event.validatorVote.toString();
          newstakeDelegationEntry.validatorAcIndex = Number(
            event.validatorIndex.toString(),
          );
          await this.stakeDelegationRepository.save(newstakeDelegationEntry);
        },
      );
    } catch (error) {
      console.error('Error subscribing to StakeReserveEvent:', error);
    }
  }

  async subscribeToUpdateActiveEvent() {
    try {
      const updateActiveSubId = this.program.addEventListener(
        'UpdateActiveEvent',
        async (event) => {
          // Save the event to MongoDB
          const newEvent = new this.updateActiveEventModel({
            state: event.state,
            epoch: event.epoch,
            stakeIndex: event.stakeIndex,
            stakeAccount: event.stakeAccount,
            validatorIndex: event.validatorIndex,
            validatorVote: event.validatorVote,
            delegationChange: event.delegationChange,
            delegationGrowthStaderSolFees: event.delegationGrowthStaderSolFees,
            extraLamports: event.extraLamports,
            extraStaderSolFees: event.extraStaderSolFees,
            validatorActiveBalance: event.validatorActiveBalance,
            totalActiveBalance: event.totalActiveBalance,
            staderSolPriceChange: event.staderSolPriceChange,
            rewardFeeUsed: event.rewardFeeUsed,
            totalVirtualStakedLamports: event.totalVirtualStakedLamports,
            staderSolSupply: event.staderSolSupply,
          });
          await newEvent.save();
          console.log('UpdateActiveEvent saved to MongoDB');

          // Get current state data
          const state = await this.stateService.getState();

          // Create state metrics entry
          const stateMetricsEntry = this.stateMetricsRepository.create({
            state: event.state.toBase58(),
            currentEpoch: Number(event.epoch),
            delayedUnstakeCoolingDown: BigInt(
              state.stakeSystem.delayedUnstakeCoolingDown.toNumber(),
            ),
            emergencyCoolingDown: BigInt(state.emergencyCoolingDown.toNumber()),
            availableReserveBalance: BigInt(
              state.availableReserveBalance.toNumber(),
            ),
            validatorIndex: event.validatorIndex,
            validatorVote: event.validatorVote.toBase58(),
            validatorActiveBalance: BigInt(
              event.validatorActiveBalance.toNumber(),
            ),
            totalActiveBalance: BigInt(
              state.validatorSystem.totalActiveBalance.toNumber(),
            ),
          });

          await this.stateMetricsRepository.save(stateMetricsEntry);
          console.log('State metrics saved to Postgres');

          // Convert BN objects to string values for storage
          const PRICE_DENOMINATOR = 4294967296; // Decimal equivalent of 0x100000000
          const oldStaderSolPrice =
            Number(event.staderSolPriceChange.old.toNumber()) /
            PRICE_DENOMINATOR;
          const newStaderSolPrice =
            Number(event.staderSolPriceChange.new.toNumber()) /
            PRICE_DENOMINATOR;
          const validatorActiveBalance =
            event.validatorActiveBalance.toString();
          const totalActiveBalance = event.totalActiveBalance.toString();
          const totalVirtualStakedLamports =
            event.totalVirtualStakedLamports.toString();
          const currentEpoch = Number(event.epoch);

          // Calculate the stake balance (extraLamports + newDelegatedLamports)
          const stakeBalanceWithoutRent =
            BigInt(event.extraLamports.toNumber()) +
            BigInt(event.delegationChange.new.toNumber());
          // Create a new entry in StaderSolPriceHistory table
          const priceHistoryEntry = this.staderSolPriceHistoryRepository.create(
            {
              state: event.state.toBase58(),
              currentEpoch: Number(event.epoch),
              stakeIndex: event.stakeIndex,
              stakeAccount: event.stakeAccount.toBase58(),
              oldDelegatedLamports: BigInt(
                event.delegationChange.old.toNumber(),
              ),
              newDelegatedLamports: BigInt(
                event.delegationChange.new.toNumber(),
              ),
              stakeBalanceWithoutRent,
              staderSolFees: BigInt(
                event.delegationGrowthStaderSolFees.toNumber(),
              ),
              extraLamports: BigInt(event.extraLamports.toNumber()),
              extraStaderSolFees: BigInt(event.extraStaderSolFees.toNumber()),
              oldStaderSolPrice: oldStaderSolPrice,
              newStaderSolPrice: newStaderSolPrice,
              rewardFeeUsed: BigInt(event.rewardFeeUsed.basisPoints),
              staderSolSupply: BigInt(event.staderSolSupply.toNumber()),
              totalVirtualStakedLamports: BigInt(
                event.totalVirtualStakedLamports.toNumber(),
              ),
              operationalSolBalance: null,
              isDeactivateEvent: false,
            },
          );

          await this.staderSolPriceHistoryRepository.save(priceHistoryEntry);
          console.log(
            'StaderSolPriceHistory entry saved to Postgres from UpdateActiveEvent',
          );
        },
      );
    } catch (error) {
      console.error('Error subscribing to UpdateActiveEvent:', error);
    }
  }

  async subscribeToUpdateDeactivatedEvent() {
    try {
      const updateDeactivatedSubId = this.program.addEventListener(
        'UpdateDeactivatedEvent',
        async (event) => {
          // Save the event to MongoDB
          const newEvent = new this.updateDeactivatedEventModel({
            state: event.state,
            epoch: event.epoch,
            stakeIndex: event.stakeIndex,
            stakeAccount: event.stakeAccount,
            balanceWithoutRentExempt: event.balanceWithoutRentExempt,
            lastUpdateDelegatedLamports: event.lastUpdateDelegatedLamports,
            staderSolFees: event.staderSolFees,
            staderSolPriceChange: event.staderSolPriceChange,
            rewardFeeUsed: event.rewardFeeUsed,
            operationalSolBalance: event.operationalSolBalance,
            totalVirtualStakedLamports: event.totalVirtualStakedLamports,
            staderSolSupply: event.staderSolSupply,
          });
          await newEvent.save();
          console.log('UpdateDeactivatedEvent saved to MongoDB');

          // Convert staderSolPriceChange values to string
          const PRICE_DENOMINATOR = 4294967296; // Decimal equivalent of 0x100000000
          const oldStaderSolPrice =
            Number(event.staderSolPriceChange.old.toNumber()) /
            PRICE_DENOMINATOR;
          const newStaderSolPrice =
            Number(event.staderSolPriceChange.new.toNumber()) /
            PRICE_DENOMINATOR;

          const priceHistoryEntry = this.staderSolPriceHistoryRepository.create(
            {
              state: event.state.toBase58(),
              currentEpoch: Number(event.epoch),
              stakeIndex: event.stakeIndex,
              stakeAccount: event.stakeAccount.toBase58(),
              oldDelegatedLamports: BigInt(
                event.lastUpdateDelegatedLamports.toNumber(),
              ),
              newDelegatedLamports: null,
              stakeBalanceWithoutRent: BigInt(
                event.balanceWithoutRentExempt.toNumber(),
              ),
              staderSolFees: BigInt(event.staderSolFees.toNumber()),
              extraLamports: null,
              extraStaderSolFees: null,
              oldStaderSolPrice: oldStaderSolPrice,
              newStaderSolPrice: newStaderSolPrice,
              rewardFeeUsed: BigInt(event.rewardFeeUsed.basisPoints),
              staderSolSupply: BigInt(event.staderSolSupply.toNumber()),
              totalVirtualStakedLamports: BigInt(
                event.totalVirtualStakedLamports.toNumber(),
              ),
              operationalSolBalance: BigInt(
                event.operationalSolBalance.toNumber(),
              ),
              isDeactivateEvent: true,
            },
          );

          await this.staderSolPriceHistoryRepository.save(priceHistoryEntry);
          console.log(
            'StaderSolPriceHistory entry saved to Postgres from UpdateDeactivatedEvent',
          );
        },
      );
    } catch (error) {
      console.error('Error subscribing to UpdateDeactivatedEvent:', error);
    }
  }

  // Delayed Unstake Events
  async subscribeToClaimEvent() {
    try {
      const claimSubId = this.program.addEventListener(
        'ClaimEvent',
        async (event) => {
          // Save claim event to MongoDB
          const newEvent = new this.claimEventModel({
            state: event.state,
            epoch: event.epoch,
            ticket: event.ticket,
            beneficiary: event.beneficiary,
            circulatingTicketBalance: event.circulatingTicketBalance,
            circulatingTicketCount: event.circulatingTicketCount,
            reserveBalance: event.reserveBalance,
            userBalance: event.userBalance,
            amount: event.amount,
          });
          await newEvent.save();
          console.log('ClaimEvent saved to MongoDB');

          // Update unstake ticket in PostgreSQL
          try {
            await this.stateService.updateUnstakeTicket(
              event.ticket.toBase58(),
              {
                claimed: true,
                claimedTime: new Date(),
              },
            );
            console.log('Unstake ticket updated in PostgreSQL');
          } catch (error) {
            console.error(
              'Error updating unstake ticket in PostgreSQL:',
              error,
            );
          }
        },
      );
    } catch (error) {
      console.error('Error subscribing to ClaimEvent:', error);
    }
  }

  async subscribeToOrderUnstakeEvent() {
    try {
      const orderUnstakeSubId = this.program.addEventListener(
        'OrderUnstakeEvent',
        async (event) => {
          const newEvent = new this.orderUnstakeEventModel({
            state: event.state,
            ticketEpoch: event.ticketEpoch,
            ticket: event.ticket,
            beneficiary: event.beneficiary,
            circulatingTicketBalance: event.circulatingTicketBalance,
            circulatingTicketCount: event.circulatingTicketCount,
            userStaderSolBalance: event.userStaderSolBalance,
            burnedStaderSolAmount: event.burnedStaderSolAmount,
            solAmount: event.solAmount,
            feeBpCents: event.feeBpCents,
            totalVirtualStakedLamports: event.totalVirtualStakedLamports,
            staderSolSupply: event.staderSolSupply,
          });
          await newEvent.save();
          console.log('OrderUnstakeEvent saved to MongoDB');
          // Calculate claimable time for target epoch
          // take a ceil of the target epoch timestamp
          const epochInfo = await this.epochService.getEpochInfo(
            Number(event.ticketEpoch.toString()) + 1,
          );
          const claimableTime = Math.ceil(epochInfo.targetEpochTimestamp);

          // Save to PostgreSQL
          const unstakeTicket = new UnstakeTickets();
          unstakeTicket.state = event.state.toString();
          unstakeTicket.ticket = event.ticket.toString();
          unstakeTicket.ticketCreatedEpoch = Number(
            event.ticketEpoch.toString(),
          );
          unstakeTicket.beneficiary = event.beneficiary.toString();
          unstakeTicket.solAmount = BigInt(event.solAmount.toString());
          unstakeTicket.claimableTime = BigInt(claimableTime);

          await this.unstakeTicketsRepository.save(unstakeTicket);
          console.log('OrderUnstakeEvent saved to PostgreSQL');
        },
      );
    } catch (error) {
      console.error('Error subscribing to OrderUnstakeEvent:', error);
    }
  }

  // Liq Pool Events
  async subscribeToAddLiquidityEvent() {
    try {
      const addLiquiditySubId = this.program.addEventListener(
        'AddLiquidityEvent',
        async (event) => {
          const newEvent = new this.addLiquidityEventModel({
            state: event.state,
            solOwner: event.solOwner,
            userSolBalance: event.userSolBalance,
            userLpBalance: event.userLpBalance,
            solLegBalance: event.solLegBalance,
            lpSupply: event.lpSupply,
            solAddedAmount: event.solAddedAmount,
            lpMinted: event.lpMinted,
            totalVirtualStakedLamports: event.totalVirtualStakedLamports,
            staderSolSupply: event.staderSolSupply,
          });
          await newEvent.save();
          console.log('AddLiquidityEvent saved to MongoDB');
        },
      );
    } catch (error) {
      console.error('Error subscribing to AddLiquidityEvent:', error);
    }
  }

  async subscribeToLiquidUnstakeEvent() {
    try {
      const liquidUnstakeSubId = this.program.addEventListener(
        'LiquidUnstakeEvent',
        async (event) => {
          const newEvent = new this.liquidUnstakeEventModel({
            state: event.state,
            staderSolOwner: event.staderSolOwner,
            liqPoolSolBalance: event.liqPoolSolBalance,
            liqPoolStaderSolBalance: event.liqPoolStaderSolBalance,
            treasuryStaderSolBalance: event.treasuryStaderSolBalance,
            userStaderSolBalance: event.userStaderSolBalance,
            userSolBalance: event.userSolBalance,
            staderSolAmount: event.staderSolAmount,
            staderSolFee: event.staderSolFee,
            treasuryStaderSolCut: event.treasuryStaderSolCut,
            solAmount: event.solAmount,
            lpLiquidityTarget: event.lpLiquidityTarget,
            lpMaxFee: event.lpMaxFee,
            lpMinFee: event.lpMinFee,
            treasuryCut: event.treasuryCut,
          });
          await newEvent.save();
          console.log('LiquidUnstakeEvent saved to MongoDB');
        },
      );
    } catch (error) {
      console.error('Error subscribing to LiquidUnstakeEvent:', error);
    }
  }

  async subscribeToRemoveLiquidityEvent() {
    try {
      const removeLiquiditySubId = this.program.addEventListener(
        'RemoveLiquidityEvent',
        async (event) => {
          const newEvent = new this.removeLiquidityEventModel({
            state: event.state,
            solLegBalance: event.solLegBalance,
            staderSolLegBalance: event.staderSolLegBalance,
            userLpBalance: event.userLpBalance,
            userSolBalance: event.userSolBalance,
            userStaderSolBalance: event.userStaderSolBalance,
            lpMintSupply: event.lpMintSupply,
            lpBurned: event.lpBurned,
            solOutAmount: event.solOutAmount,
            staderSolOutAmount: event.staderSolOutAmount,
          });
          await newEvent.save();
          console.log('RemoveLiquidityEvent saved to MongoDB');
        },
      );
    } catch (error) {
      console.error('Error subscribing to RemoveLiquidityEvent:', error);
    }
  }

  // Management Events
  // TODO: PG DB UPDATE TO CREATE ENTRY OF NEWLY ADDED VALIDATOR and their index on protocol.
  async subscribeToAddValidatorEvent() {
    try {
      const addValidatorSubId = this.program.addEventListener(
        'AddValidatorEvent',
        async (event) => {
          const newEvent = new this.addValidatorEventModel({
            state: event.state,
            validator: event.validator,
            index: event.index,
            score: event.score,
          });
          await newEvent.save();
          console.log('AddValidatorEvent saved to MongoDB');
          // 1. from validatorsApp API get the data of the validator.
          // 2. save that data in pg db.
          // Add a new entry in the stakeDelegation Table
          const validatorsAppUrl =
            this.environmentConfigService.getValidatorsAppUrl();
          const validatorsAppApiKey =
            this.environmentConfigService.getValidatorsAppKey();
          // const apiResponse = await axios.get(`${validatorsAppUrl}${account}`,{
          //   headers:{Token:validatorsAppApiKey}
          // })
          const validatorData =
            await this.validatorsDataService.createValidator(
              event.validator.toString(),
            );
          const stakeDelegationEntry = new StakeDelegation();
          stakeDelegationEntry.stakeAccount = null;
          stakeDelegationEntry.stakeAcIndex = null;
          stakeDelegationEntry.validatorAccount = event.validator.toString();
          stakeDelegationEntry.validatorAcIndex = Number(
            event.index.toString(),
          );
          await this.stakeDelegationRepository.save(stakeDelegationEntry);
        },
      );
    } catch (error) {
      console.error('Error subscribing to AddValidatorEvent:', error);
    }
  }

  // TODO: UPDATE PG DB TO MOVE THE VALIDATOR TO INACTIVE VALIDATORS LIST.
  async subscribeToRemoveValidatorEvent() {
    try {
      const removeValidatorSubId = this.program.addEventListener(
        'RemoveValidatorEvent',
        async (event) => {
          const newEvent = new this.removeValidatorEventModel({
            state: event.state,
            validator: event.validator,
            index: event.index,
            operationalSolBalance: event.operationalSolBalance,
          });
          await newEvent.save();
          console.log('RemoveValidatorEvent saved to MongoDB');
        },
      );
    } catch (error) {
      console.error('Error subscribing to RemoveValidatorEvent:', error);
    }
  }

  async subscribeToSetValidatorScoreEvent() {
    try {
      const setValidatorScoreSubId = this.program.addEventListener(
        'SetValidatorScoreEvent',
        async (event) => {
          const newEvent = new this.setValidatorScoreEventModel({
            state: event.state,
            validator: event.validator,
            index: event.index,
            scoreChange: event.scoreChange,
          });
          await newEvent.save();
          console.log('SetValidatorScoreEvent saved to MongoDB');
        },
      );
    } catch (error) {
      console.error('Error subscribing to SetValidatorScoreEvent:', error);
    }
  }

  // User Events
  async subscribeToDepositEvent() {
    try {
      const depositSubId = this.program.addEventListener(
        'DepositEvent',
        async (event) => {
          const newEvent = new this.depositEventModel({
            state: event.state,
            solOwner: event.solOwner,
            userSolBalance: event.userSolBalance,
            userStaderSolBalance: event.userStaderSolBalance,
            solLegBalance: event.solLegBalance,
            staderSolLegBalance: event.staderSolLegBalance,
            reserveBalance: event.reserveBalance,
            solSwapped: event.solSwapped,
            staderSolSwapped: event.staderSolSwapped,
            solDeposited: event.solDeposited,
            staderSolMinted: event.staderSolMinted,
            totalVirtualStakedLamports: event.totalVirtualStakedLamports,
            staderSolSupply: event.staderSolSupply,
          });
          await newEvent.save();
          console.log('DepositEvent saved to MongoDB');
        },
      );
    } catch (error) {
      console.error('Error subscribing to DepositEvent:', error);
    }
  }

  //  TODO: PG DB UPDATE FOR STAKE ACCOUNT :
  //  * 1. STAKE ACCOUNT ADDRESS
  //  * 2. STAKE ACCOUNT INDEX
  //  * 3. VALIDATOR ADDRESS
  //  * 4. VALIDATOR INDEX
  async subscribeToDepositStakeAccountEvent() {
    try {
      const depositStakeAccountSubId = this.program.addEventListener(
        'DepositStakeAccountEvent',
        async (event) => {
          const newEvent = new this.depositStakeAccountEventModel({
            state: event.state,
            stake: event.stake,
            delegated: event.delegated,
            withdrawer: event.withdrawer,
            stakeIndex: event.stakeIndex,
            validator: event.validator,
            validatorIndex: event.validatorIndex,
            validatorActiveBalance: event.validatorActiveBalance,
            totalActiveBalance: event.totalActiveBalance,
            userStaderSolBalance: event.userStaderSolBalance,
            staderSolMinted: event.staderSolMinted,
            totalVirtualStakedLamports: event.totalVirtualStakedLamports,
            staderSolSupply: event.staderSolSupply,
          });
          await newEvent.save();

          const newstakeDelegationEntry = new StakeDelegation();
          newstakeDelegationEntry.stakeAccount = event.stake.toString();
          newstakeDelegationEntry.stakeAcIndex = Number(
            event.stakeIndex.toString(),
          );
          newstakeDelegationEntry.validatorAccount = event.validator.toString();
          newstakeDelegationEntry.validatorAcIndex = Number(
            event.validatorIndex.toString(),
          );
          await this.stakeDelegationRepository.save(newstakeDelegationEntry);

          console.log('DepositStakeAccountEvent saved to MongoDB');
        },
      );
    } catch (error) {
      console.error('Error subscribing to DepositStakeAccountEvent:', error);
    }
  }

  //  TODO: PG DB UPDATE FOR STAKE ACCOUNT :
  //  * 1. STAKE ACCOUNT ADDRESS
  //  * 2. STAKE ACCOUNT INDEX
  //  * 3. VALIDATOR ADDRESS
  //  * 4. VALIDATOR INDEX
  async subscribeToWithdrawStakeAccountEvent() {
    try {
      const withdrawStakeAccountSubId = this.program.addEventListener(
        'WithdrawStakeAccountEvent',
        async (event) => {
          const newEvent = new this.withdrawStakeAccountEventModel({
            state: event.state,
            epoch: event.epoch,
            stake: event.stake,
            lastUpdateStakeDelegation: event.lastUpdateStakeDelegation,
            stakeIndex: event.stakeIndex,
            validator: event.validator,
            validatorIndex: event.validatorIndex,
            userStaderSolBalance: event.userStaderSolBalance,
            userStaderSolAuth: event.userStaderSolAuth,
            staderSolBurned: event.staderSolBurned,
            staderSolFees: event.staderSolFees,
            splitStake: event.splitStake,
            beneficiary: event.beneficiary,
            splitLamports: event.splitLamports,
            feeBpCents: event.feeBpCents,
            totalVirtualStakedLamports: event.totalVirtualStakedLamports,
            staderSolSupply: event.staderSolSupply,
          });
          await newEvent.save();
          console.log('WithdrawStakeAccountEvent saved to MongoDB');
        },
      );
    } catch (error) {
      console.error('Error subscribing to WithdrawStakeAccountEvent:', error);
    }
  }

  async getDelegationRecords(page: number, limit: number) {
    try {
      const _page = Number(page) > 0 ? Number(page) : 1;
      const _limit = Number(limit) > 0 ? Number(limit) : 10;
      const skip = Number((page - 1) * limit);
      const [redords, total] =
        await this.stakeDelegationRepository.findAndCount({
          skip: skip,
          take: limit,
          order: {
            createdAt: 'ASC',
          },
        });
      return {
        total,
        _page,
        _limit,
        data: redords,
      };
    } catch (error) {
      throw new HttpException(
        'Error while fetching stake delegation records',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async onModuleDestroy() {
    console.log('Shutting down Solana events subscription...');
    // Add any cleanup logic if needed (e.g., removing event listeners)
  }

  // Retrieval methods for each event type

  // Admin Events
  async getChangeAuthorityEvents(
    state?: string,
    limit: number = 10,
  ): Promise<ChangeAuthorityEvent[]> {
    const filter = state ? { state } : {};
    return this.changeAuthorityEventModel
      .find(filter)
      .sort({ state: -1 })
      .limit(limit)
      .exec();
  }

  async getConfigLpEvents(
    state?: string,
    limit: number = 10,
  ): Promise<ConfigLpEvent[]> {
    const filter = state ? { state } : {};
    return this.configLpEventModel
      .find(filter)
      .sort({ state: -1 })
      .limit(limit)
      .exec();
  }

  async getConfigStaderLiquidStakingEvents(
    state?: string,
    limit: number = 10,
  ): Promise<ConfigStaderLiquidStakingEvent[]> {
    const filter = state ? { state } : {};
    return this.configStaderLiquidStakingEventModel
      .find(filter)
      .sort({ state: -1 })
      .limit(limit)
      .exec();
  }

  async getEmergencyPauseEvents(
    state?: string,
    limit: number = 10,
  ): Promise<EmergencyPauseEvent[]> {
    const filter = state ? { state } : {};
    return this.emergencyPauseEventModel
      .find(filter)
      .sort({ state: -1 })
      .limit(limit)
      .exec();
  }

  async getInitializeEvents(
    state?: string,
    limit: number = 10,
  ): Promise<InitializeEvent[]> {
    const filter = state ? { state } : {};
    return this.initializeEventModel
      .find(filter)
      .sort({ state: -1 })
      .limit(limit)
      .exec();
  }

  async getReallocStakeListEvents(
    state?: string,
    limit: number = 10,
  ): Promise<ReallocStakeListEvent[]> {
    const filter = state ? { state } : {};
    return this.reallocStakeListEventModel
      .find(filter)
      .sort({ state: -1 })
      .limit(limit)
      .exec();
  }

  async getReallocValidatorListEvents(
    state?: string,
    limit: number = 10,
  ): Promise<ReallocValidatorListEvent[]> {
    const filter = state ? { state } : {};
    return this.reallocValidatorListEventModel
      .find(filter)
      .sort({ state: -1 })
      .limit(limit)
      .exec();
  }

  async getResumeEvents(
    state?: string,
    limit: number = 10,
  ): Promise<ResumeEvent[]> {
    const filter = state ? { state } : {};
    return this.resumeEventModel
      .find(filter)
      .sort({ state: -1 })
      .limit(limit)
      .exec();
  }

  // Crank Events
  async getDeactivateStakeEvents(
    state?: string,
    limit: number = 10,
  ): Promise<DeactivateStakeEvent[]> {
    const filter = state ? { state } : {};
    return this.deactivateStakeEventModel
      .find(filter)
      .sort({ state: -1 })
      .limit(limit)
      .exec();
  }

  async getMergeStakesEvents(
    state?: string,
    limit: number = 10,
  ): Promise<MergeStakesEvent[]> {
    const filter = state ? { state } : {};
    return this.mergeStakesEventModel
      .find(filter)
      .sort({ state: -1 })
      .limit(limit)
      .exec();
  }

  async getRedelegateEvents(
    state?: string,
    limit: number = 10,
  ): Promise<RedelegateEvent[]> {
    const filter = state ? { state } : {};
    return this.redelegateEventModel
      .find(filter)
      .sort({ state: -1 })
      .limit(limit)
      .exec();
  }

  async getStakeReserveEvents(
    state?: string,
    limit: number = 10,
  ): Promise<StakeReserveEvent[]> {
    const filter = state ? { state } : {};
    return this.stakeReserveEventModel
      .find(filter)
      .sort({ state: -1 })
      .limit(limit)
      .exec();
  }

  async getUpdateActiveEvents(
    state?: string,
    limit: number = 10,
  ): Promise<UpdateActiveEvent[]> {
    const filter = state ? { state } : {};
    return this.updateActiveEventModel
      .find(filter)
      .sort({ state: -1 })
      .limit(limit)
      .exec();
  }

  async getUpdateDeactivatedEvents(
    state?: string,
    limit: number = 10,
  ): Promise<UpdateDeactivatedEvent[]> {
    const filter = state ? { state } : {};
    return this.updateDeactivatedEventModel
      .find(filter)
      .sort({ state: -1 })
      .limit(limit)
      .exec();
  }

  // Delayed Unstake Events
  async getClaimEvents(
    state?: string,
    limit: number = 10,
  ): Promise<ClaimEvent[]> {
    const filter = state ? { state } : {};
    return this.claimEventModel
      .find(filter)
      .sort({ epoch: -1 })
      .limit(limit)
      .exec();
  }

  async getOrderUnstakeEvents(
    state?: string,
    limit: number = 10,
  ): Promise<OrderUnstakeEvent[]> {
    const filter = state ? { state } : {};
    return this.orderUnstakeEventModel
      .find(filter)
      .sort({ ticketEpoch: -1 })
      .limit(limit)
      .exec();
  }

  // Liq Pool Events
  async getAddLiquidityEvents(
    state?: string,
    limit: number = 10,
  ): Promise<AddLiquidityEvent[]> {
    const filter = state ? { state } : {};
    return this.addLiquidityEventModel
      .find(filter)
      .sort({ solOwner: -1 })
      .limit(limit)
      .exec();
  }

  async getLiquidUnstakeEvents(
    state?: string,
    limit: number = 10,
  ): Promise<LiquidUnstakeEvent[]> {
    const filter = state ? { state } : {};
    return this.liquidUnstakeEventModel
      .find(filter)
      .sort({ staderSolOwner: -1 })
      .limit(limit)
      .exec();
  }

  async getRemoveLiquidityEvents(
    state?: string,
    limit: number = 10,
  ): Promise<RemoveLiquidityEvent[]> {
    const filter = state ? { state } : {};
    return this.removeLiquidityEventModel
      .find(filter)
      .sort({ solLegBalance: -1 })
      .limit(limit)
      .exec();
  }

  // Management Events

  async getAddValidatorEvents(
    state?: string,
    limit: number = 10,
  ): Promise<AddValidatorEvent[]> {
    const filter = state ? { state } : {};
    return this.addValidatorEventModel
      .find(filter)
      .sort({ state: -1 })
      .limit(limit)
      .exec();
  }

  async getRemoveValidatorEvents(
    state?: string,
    limit: number = 10,
  ): Promise<RemoveValidatorEvent[]> {
    const filter = state ? { state } : {};
    return this.removeValidatorEventModel
      .find(filter)
      .sort({ state: -1 })
      .limit(limit)
      .exec();
  }

  async getSetValidatorScoreEvents(
    state?: string,
    limit: number = 10,
  ): Promise<SetValidatorScoreEvent[]> {
    const filter = state ? { state } : {};
    return this.setValidatorScoreEventModel
      .find(filter)
      .sort({ state: -1 })
      .limit(limit)
      .exec();
  }

  // User Events
  async getDepositEvents(
    state?: string,
    limit: number = 10,
  ): Promise<DepositEvent[]> {
    const filter = state ? { state } : {};
    return this.depositEventModel
      .find(filter)
      .sort({ solOwner: -1 })
      .limit(limit)
      .exec();
  }

  async getDepositStakeAccountEvents(
    state?: string,
    limit: number = 10,
  ): Promise<DepositStakeAccountEvent[]> {
    const filter = state ? { state } : {};
    return this.depositStakeAccountEventModel
      .find(filter)
      .sort({ stakeIndex: -1 })
      .limit(limit)
      .exec();
  }

  async getWithdrawStakeAccountEvents(
    state?: string,
    limit: number = 10,
  ): Promise<WithdrawStakeAccountEvent[]> {
    const filter = state ? { state } : {};
    return this.withdrawStakeAccountEventModel
      .find(filter)
      .sort({ epoch: -1 })
      .limit(limit)
      .exec();
  }
}
