import { Controller, Get, UseGuards } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags, ApiHeader } from '@nestjs/swagger';
import { CrankSchedulerService } from './crank-scheduler.service';
import { AuthGuard } from '../infrastructure/guards/auth.guard';

@ApiTags('Crank')
@Controller('crank')
export class CrankController {
  constructor(private readonly crankSchedulerService: CrankSchedulerService) {}

  @Get('status')
  @UseGuards(AuthGuard)
  @ApiOperation({ summary: 'Get current crank operations status' })
  @ApiResponse({
    status: 200,
    description: 'Returns the status of all crank operations'
  })
  @ApiHeader({
    name: 'x-api-key',
    description: 'API key for authentication',
    required: true
  })
  async getStatus() {
    const status = await this.crankSchedulerService.getCranksExecutionStatus();
    return {
      success: true,
      data: status,
      timestamp: new Date().toISOString()
    };
  }
}

