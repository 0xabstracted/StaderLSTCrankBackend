import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  UseGuards,
  Patch,
} from '@nestjs/common';
import { StateService } from './state.service';
import { ApiOperation, ApiResponse, ApiTags, ApiHeader } from '@nestjs/swagger';
import { AuthGuard } from '../infrastructure/guards/auth.guard';
import { Logger } from '@nestjs/common';

@ApiTags('State')
@Controller('state')
export class StateController {
  private readonly logger = new Logger(StateController.name);

  constructor(private readonly stateService: StateService) {}

  @Get('stader-sol-price')
  @UseGuards(AuthGuard)
  @ApiOperation({ summary: 'Get current staderSOL price' })
  @ApiResponse({
    status: 200,
    description: 'Returns current staderSOL price information',
  })
  @ApiHeader({
    name: 'x-api-key',
    description: 'API key for authentication',
    required: true,
  })
  async getStaderSolPrice() {
    try {
      const priceData = await this.stateService.getStaderSolPrice();
      return {
        success: true,
        data: {
          price: priceData.price,
          rawPrice: priceData.rawPrice,
          timestamp: new Date().toISOString(),
        },
      };
    } catch (error) {
      return {
        success: false,
        error: 'Failed to fetch staderSOL price',
        message: error.message,
      };
    }
  }

  @Get('unstake-ticket/:ticket')
  @UseGuards(AuthGuard)
  @ApiOperation({ summary: 'Get time left for unstake ticket' })
  @ApiResponse({
    status: 200,
    description: 'Returns time left for the unstake ticket',
  })
  @ApiHeader({
    name: 'x-api-key',
    description: 'API key for authentication',
    required: true,
  })
  async getUnstakeTicketTimeLeft(@Param('ticket') ticket: string) {
    try {
      return await this.stateService.getUnstakeTicketTimeLeft(ticket);
    } catch (error) {
      return {
        success: false,
        error: 'Failed to fetch unstake ticket time left',
        message: error.message,
      };
    }
  }

  @Get('unstake-tickets/:beneficiary')
  @UseGuards(AuthGuard)
  @ApiOperation({ summary: 'Get unstake tickets for a beneficiary' })
  @ApiResponse({
    status: 200,
    description: 'Returns unstake tickets for the given beneficiary',
  })
  @ApiHeader({
    name: 'x-api-key',
    description: 'API key for authentication',
    required: true,
  })
  async getUnclaimedUnstakeTicketsByBenificiary(
    @Param('beneficiary') beneficiary: string,
  ) {
    try {
      return await this.stateService.getUnclaimedUnstakeTicketsByBenificiary(
        beneficiary,
      );
    } catch (error) {
      return {
        success: false,
        error: 'Failed to fetch unstake tickets',
        message: error.message,
      };
    }
  }

  @Post('stake-delegation')
  @UseGuards(AuthGuard)
  @ApiOperation({ summary: 'Create new stake delegation entry' })
  @ApiResponse({
    status: 200,
    description: 'Creates a new stake delegation record',
  })
  @ApiHeader({
    name: 'x-api-key',
    description: 'API key for authentication',
    required: true,
  })
  async createStakeDelegation(
    @Body()
    stakeDelegation: {
      stakeAccount: string | null;
      stakeAcIndex: number | null;
      validatorAccount: string;
      validatorAcIndex: number;
      stakedAmount?: bigint | null;
    },
  ) {
    return await this.stateService.createStakeDelegation(stakeDelegation);
  }

  @Post('unstake-tickets/bulk')
  @UseGuards(AuthGuard)
  @ApiOperation({ summary: 'Create multiple unstake tickets' })
  @ApiResponse({
    status: 200,
    description: 'Creates multiple unstake ticket records',
  })
  @ApiHeader({
    name: 'x-api-key',
    description: 'API key for authentication',
    required: true,
  })
  async createUnstakeTicketsBulk(
    @Body()
    tickets: {
      state: string;
      ticket: string;
      ticketCreatedEpoch: number;
      beneficiary: string;
      solAmount: string;
      claimableTime: string;
    }[],
  ) {
    return await this.stateService.createUnstakeTicketsBulk(tickets);
  }

  @Post('unstake-tickets')
  @UseGuards(AuthGuard)
  @ApiOperation({ summary: 'Create a single unstake ticket' })
  @ApiResponse({
    status: 200,
    description: 'Creates a single unstake ticket record',
  })
  @ApiHeader({
    name: 'x-api-key',
    description: 'API key for authentication',
    required: true,
  })
  async createUnstakeTicket(
    @Body()
    ticket: {
      state: string;
      ticket: string;
      ticketCreatedEpoch: number;
      beneficiary: string;
      solAmount: string;
      claimableTime: string;
    },
  ) {
    return await this.stateService.createUnstakeTicket(ticket);
  }

  @Get('apy')
  @UseGuards(AuthGuard)
  @ApiOperation({
    summary: 'Get staking rewards metrics including APR and APY',
  })
  @ApiResponse({
    status: 200,
    description: 'Returns staking rewards metrics',
  })
  @ApiHeader({
    name: 'x-api-key',
    description: 'API key for authentication',
    required: true,
  })
  async getAPY() {
    try {
      const metrics = await this.stateService.calculateAPY();
      return {
        success: true,
        data: {
          apr: `${metrics.apr}%`,
          apy: `${metrics.apy}%`,
          totalStaked: metrics.totalStaked.toString(),
          epochsPerYear: metrics.epochsPerYear,
          epochsPassed: metrics.epochsPassed,
          currentEpoch: metrics.currentEpoch,
          programStartEpoch: metrics.programStartEpoch,
          currentPrice: metrics.currentPrice,
          growth: `${metrics.growth}%`,
          growthFactor: metrics.growthFactor,
          timestamp: new Date().toISOString(),
          usingHistoricData: metrics.usingHistoricData || false,
        },
      };
    } catch (error) {
      this.logger.error(`APY calculation error: ${error.message}`, error.stack);
      return {
        success: false,
        error: 'Failed to calculate staking rewards',
        message: error.message,
      };
    }
  }

  @Patch('unstake-ticket/:ticket')
  @UseGuards(AuthGuard)
  @ApiOperation({ summary: 'Update unstake ticket fields' })
  @ApiResponse({
    status: 200,
    description: 'Updates unstake ticket fields',
  })
  @ApiHeader({
    name: 'x-api-key',
    description: 'API key for authentication',
    required: true,
  })
  async updateUnstakeTicket(
    @Param('ticket') ticket: string,
    @Body()
    update: {
      claimableTime?: string;
      claimed?: boolean;
      claimedTime?: Date;
    },
  ) {
    return await this.stateService.updateUnstakeTicket(ticket, update);
  }

  @Patch('unstake-tickets/bulk')
  @UseGuards(AuthGuard)
  @ApiOperation({ summary: 'Update multiple unstake tickets' })
  @ApiResponse({
    status: 200,
    description: 'Updates multiple unstake tickets',
  })
  @ApiHeader({
    name: 'x-api-key',
    description: 'API key for authentication',
    required: true,
  })
  async updateUnstakeTicketsBulk(
    @Body()
    updates: {
      ticket: string;
      claimableTime?: string;
      claimed?: boolean;
      claimedTime?: Date;
    }[],
  ) {
    return await this.stateService.updateUnstakeTicketsBulk(updates);
  }

  @Get('unstake-tickets')
  @UseGuards(AuthGuard)
  @ApiOperation({ summary: 'Get all delayed unstake tickets from the program' })
  @ApiResponse({
    status: 200,
    description: 'Returns all delayed unstake tickets',
    schema: {
      example: {
        success: true,
        data: [
          {
            ticketAccount: 'ticketAccountPublicKey',
            beneficiary: 'beneficiaryPublicKey',
            lamportsAmount: '1000000000',
            createdEpoch: '420',
          },
        ],
      },
    },
  })
  @ApiHeader({
    name: 'x-api-key',
    description: 'API key for authentication',
    required: true,
  })
  async getAllUnclaimedDelayedUnstakeTickets() {
    try {
      const tickets =
        await this.stateService.getAllUnclaimedDelayedUnstakeTickets();
      return {
        success: true,
        data: tickets,
      };
    } catch (error) {
      return {
        success: false,
        error: 'Failed to fetch delayed unstake tickets',
        message: error.message,
      };
    }
  }
}
