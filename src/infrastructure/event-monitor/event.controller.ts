import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { ApiHeader, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '../guards/auth.guard';
import { SolanaEventsService } from './event.service';
import { 
  ChangeAuthorityEvent,
  ConfigLpEvent,
  ConfigStaderLiquidStakingEvent,
  EmergencyPauseEvent,
  InitializeEvent,
  ReallocStakeListEvent,
  ReallocValidatorListEvent,
  ResumeEvent,
  DeactivateStakeEvent,
  MergeStakesEvent,
  RedelegateEvent,
  StakeReserveEvent,
  UpdateActiveEvent,
  UpdateDeactivatedEvent,
  ClaimEvent,
  OrderUnstakeEvent,
  AddLiquidityEvent,
  LiquidUnstakeEvent,
  RemoveLiquidityEvent,
  AddValidatorEvent,
  RemoveValidatorEvent,
  SetValidatorScoreEvent,
  DepositEvent,
  DepositStakeAccountEvent,
  WithdrawStakeAccountEvent,
} from '../mongoose/schemas';

@ApiTags('Events')
@Controller('events')
export class EventController {
  constructor(private readonly solanaEventsService: SolanaEventsService) {}

  @Get('add-validator')
  @UseGuards(AuthGuard)
  @ApiOperation({ summary: 'Get add validator events' })
  @ApiResponse({
    status: 200,
    description: 'Returns add validator events'
  })
  @ApiHeader({
    name: 'x-api-key',
    description: 'API key for authentication',
    required: true
  })
  async getAddValidatorEvents(
    @Query('validatorId') validatorId: string,
    @Query('limit') limit: number = 10,
  ): Promise<AddValidatorEvent[]> {
    return this.solanaEventsService.getAddValidatorEvents(validatorId, limit);
  }

  @Get('remove-validator')
  @UseGuards(AuthGuard)
  @ApiOperation({ summary: 'Get remove validator events' })
  @ApiResponse({
    status: 200,
    description: 'Returns remove validator events'
  })
  @ApiHeader({
    name: 'x-api-key',
    description: 'API key for authentication',
    required: true
  })
  async getRemoveValidatorEvents(
    @Query('validatorId') validatorId: string,
    @Query('limit') limit: number = 10,
  ): Promise<RemoveValidatorEvent[]> {
    return this.solanaEventsService.getRemoveValidatorEvents(validatorId, limit);
  }

  @Get('set-validator-score')
  @UseGuards(AuthGuard)
  @ApiOperation({ summary: 'Get set validator score events' })
  @ApiResponse({
    status: 200,
    description: 'Returns set validator score events'
  })
  @ApiHeader({
    name: 'x-api-key',
    description: 'API key for authentication',
    required: true
  })
  async getSetValidatorScoreEvents(
    @Query('validatorId') validatorId: string,
    @Query('limit') limit: number = 10,
  ): Promise<SetValidatorScoreEvent[]> {
    return this.solanaEventsService.getSetValidatorScoreEvents(validatorId, limit);
  }

  // Add similar endpoints for other event types
  @Get('claim')
  @UseGuards(AuthGuard)
  @ApiOperation({ summary: 'Get claim events' })
  @ApiResponse({
    status: 200,
    description: 'Returns claim events'
  })
  @ApiHeader({
    name: 'x-api-key',
    description: 'API key for authentication',
    required: true
  })
  async getClaimEvents(
    @Query('state') state: string,
    @Query('limit') limit: number = 10,
  ): Promise<ClaimEvent[]> {
    return this.solanaEventsService.getClaimEvents(state, limit);
  }

  @Get('order-unstake')
  @UseGuards(AuthGuard)
  @ApiOperation({ summary: 'Get order unstake events' })
  @ApiResponse({
    status: 200,
    description: 'Returns order unstake events'
  })
  @ApiHeader({
    name: 'x-api-key',
    description: 'API key for authentication',
    required: true
  })
  async getOrderUnstakeEvents(
    @Query('state') state: string,
    @Query('limit') limit: number = 10,
  ): Promise<OrderUnstakeEvent[]> {
    return this.solanaEventsService.getOrderUnstakeEvents(state, limit);
  }

  @Get('add-liquidity')
  @UseGuards(AuthGuard)
  @ApiOperation({ summary: 'Get add liquidity events' })
  @ApiResponse({
    status: 200,
    description: 'Returns add liquidity events'
  })
  @ApiHeader({
    name: 'x-api-key',
    description: 'API key for authentication',
    required: true
  })
  async getAddLiquidityEvents(
    @Query('state') state: string,
    @Query('limit') limit: number = 10,
  ): Promise<AddLiquidityEvent[]> {
    return this.solanaEventsService.getAddLiquidityEvents(state, limit);
  }

  @Get('liquid-unstake')
  @UseGuards(AuthGuard)
  @ApiOperation({ summary: 'Get liquid unstake events' })
  @ApiResponse({
    status: 200,
    description: 'Returns liquid unstake events'
  })
  @ApiHeader({
    name: 'x-api-key',
    description: 'API key for authentication',
    required: true
  })
  async getLiquidUnstakeEvents(
    @Query('state') state: string,
    @Query('limit') limit: number = 10,
  ): Promise<LiquidUnstakeEvent[]> {
    return this.solanaEventsService.getLiquidUnstakeEvents(state, limit);
  }

  @Get('remove-liquidity')
  @UseGuards(AuthGuard)
  @ApiOperation({ summary: 'Get remove liquidity events' })
  @ApiResponse({
    status: 200,
    description: 'Returns remove liquidity events'
  })
  @ApiHeader({
    name: 'x-api-key',
    description: 'API key for authentication',
    required: true
  })
  async getRemoveLiquidityEvents(
    @Query('state') state: string,
    @Query('limit') limit: number = 10,
  ): Promise<RemoveLiquidityEvent[]> {
    return this.solanaEventsService.getRemoveLiquidityEvents(state, limit);
  }

  @Get('deposit')
  @UseGuards(AuthGuard)
  @ApiOperation({ summary: 'Get deposit events' })
  @ApiResponse({
    status: 200,
    description: 'Returns deposit events'
  })
  @ApiHeader({
    name: 'x-api-key',
    description: 'API key for authentication',
    required: true
  })
  async getDepositEvents(
    @Query('state') state: string,
    @Query('limit') limit: number = 10,
  ): Promise<DepositEvent[]> {
    return this.solanaEventsService.getDepositEvents(state, limit);
  }

  @Get('deposit-stake-account')
  @UseGuards(AuthGuard)
  @ApiOperation({ summary: 'Get deposit stake account events' })
  @ApiResponse({
    status: 200,
    description: 'Returns deposit stake account events'
  })
  @ApiHeader({
    name: 'x-api-key',
    description: 'API key for authentication',
    required: true
  })
  async getDepositStakeAccountEvents(
    @Query('state') state: string,
    @Query('limit') limit: number = 10,
  ): Promise<DepositStakeAccountEvent[]> {
    return this.solanaEventsService.getDepositStakeAccountEvents(state, limit);
  }

  @Get('withdraw-stake-account')
  @UseGuards(AuthGuard)
  @ApiOperation({ summary: 'Get withdraw stake account events' })
  @ApiResponse({
    status: 200,
    description: 'Returns withdraw stake account events'
  })
  @ApiHeader({
    name: 'x-api-key',
    description: 'API key for authentication',
    required: true
  })
  async getWithdrawStakeAccountEvents(
    @Query('state') state: string,
    @Query('limit') limit: number = 10,
  ): Promise<WithdrawStakeAccountEvent[]> {
    return this.solanaEventsService.getWithdrawStakeAccountEvents(state, limit);
  }

  // Add similar endpoints for other event types as needed
}