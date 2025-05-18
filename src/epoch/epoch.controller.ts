import {
  Controller,
  Get,
  ParseIntPipe,
  Query,
  UseGuards,
} from '@nestjs/common';
import { EpochService } from './epoch.service';
import {
  ApiOperation,
  ApiQuery,
  ApiResponse,
  ApiTags,
  ApiHeader,
} from '@nestjs/swagger';
import { AuthGuard } from '../infrastructure/guards/auth.guard';
import { EpochTrackerService } from './epoch-tracker.service';

@ApiTags('Epoch')
@Controller('epoch')
export class EpochController {
  constructor(
    private readonly epochService: EpochService,
    private readonly epochTrackerService: EpochTrackerService,
  ) {}

  @Get('progress')
  @UseGuards(AuthGuard)
  @ApiOperation({ summary: 'Get current epoch progress and time remaining' })
  @ApiResponse({
    status: 200,
    description: 'Returns epoch progress information',
    schema: {
      example: {
        success: true,
        data: {
          currentEpoch: 420,
          slotIndex: 432000,
          absoluteSlot: 225533440,
          slotsInEpoch: 432000,
          timeLeftInEpoch: 0,
          progress: 100,
        },
      },
    },
  })
  @ApiHeader({
    name: 'x-api-key',
    description: 'API key for authentication',
    required: true,
  })
  async getEpochProgress() {
    try {
      // Calculate epoch progress using database values instead of blockchain reads
      const epochInfo = await this.epochTrackerService.calculateEpochProgress();
      const dbEpochInfo = await this.epochTrackerService.getEpochInfoFromDb();

      return {
        success: true,
        data: {
          currentEpoch: epochInfo.currentEpoch,
          timeLeftInEpoch: epochInfo.timeLeftInEpoch,
          progress: epochInfo.progress,
          // Include additional data for UI compatibility
          slotsInEpoch: dbEpochInfo.slotsInEpoch,
          slotIndex: 0, // Not used by UI when progress is provided
          absoluteSlot: 0, // Not used by UI when progress is provided
        },
      };
    } catch (error) {
      // Fallback to blockchain method if database approach fails
      try {
        const epochInfo = await this.epochService.getEpochProgress();
        return {
          success: true,
          data: epochInfo,
        };
      } catch (fallbackError) {
        return {
          success: false,
          error: 'Failed to fetch epoch progress',
          message: error.message,
        };
      }
    }
  }

  @Get('epoch-info')
  @UseGuards(AuthGuard)
  @ApiOperation({ summary: 'Get epoch info for a target epoch' })
  @ApiResponse({
    status: 200,
    description: 'Returns the timestamp for when the target epoch will start',
    schema: {
      example: {
        success: true,
        data: {
          epoch: 420,
          timestamp: 1677649200,
          date: '2024-03-01T12:00:00.000Z',
        },
      },
    },
  })
  @ApiQuery({
    name: 'targetEpoch',
    required: false,
    type: Number,
    description:
      'Target epoch number. If not provided, calculates for next epoch',
  })
  @ApiHeader({
    name: 'x-api-key',
    description: 'API key for authentication',
    required: true,
  })
  async getEpochInfo(
    @Query('targetEpoch', new ParseIntPipe({ optional: true }))
    targetEpoch?: number,
  ) {
    try {
      // First try to get epoch info from database
      try {
        // If targetEpoch is not provided, use current + 1
        let epochToFetch = targetEpoch;
        if (!epochToFetch) {
          const currentInfo =
            await this.epochTrackerService.getEpochInfoFromDb();
          epochToFetch = currentInfo.epoch + 1;
        }

        const epochInfo =
          await this.epochTrackerService.getEpochInfoFromDb(epochToFetch);

        return {
          success: true,
          data: {
            epoch: epochInfo.epoch,
            targetEpochTimestamp: epochInfo.startTimestamp,
            date: new Date(epochInfo.startTimestamp * 1000).toISOString(),
          },
        };
      } catch (dbError) {
        // If database lookup fails, fallback to blockchain calculation
        const epochInfo = await this.epochService.getEpochInfo(targetEpoch);

        return {
          success: true,
          data: epochInfo,
        };
      }
    } catch (error) {
      return {
        success: false,
        error: 'Failed to calculate epoch timestamp',
        message: error.message,
      };
    }
  }

  @Get('slot-info')
  @UseGuards(AuthGuard)
  @ApiOperation({ summary: 'Get slot info with timestamp' })
  @ApiResponse({
    status: 200,
    description: 'Returns the slot number and its timestamp',
    schema: {
      example: {
        success: true,
        data: {
          slot: 225533440,
          timestamp: 1709225436,
        },
      },
    },
  })
  @ApiQuery({
    name: 'slot',
    required: false,
    type: Number,
    description:
      'Target slot number. If not provided, returns current slot info',
  })
  @ApiHeader({
    name: 'x-api-key',
    description: 'API key for authentication',
    required: true,
  })
  async getSlotInfo(
    @Query('slot', new ParseIntPipe({ optional: true })) slot?: number,
  ) {
    try {
      // For slot info, we still use blockchain reads as calculating this from DB would be complex
      // and it's called less frequently
      const slotInfo = await this.epochService.getSlotInfo(slot);
      return {
        success: true,
        data: slotInfo,
      };
    } catch (error) {
      return {
        success: false,
        error: 'Failed to fetch slot info',
        message: error.message,
      };
    }
  }
}
