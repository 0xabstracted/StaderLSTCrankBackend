import { Controller, Post, Body, Get, Query, UseGuards } from '@nestjs/common';
import { ValidatorsDataService } from './validators-data.service';
import { ListPaginationDto } from 'dtos';
import { ApiOperation, ApiResponse, ApiTags, ApiHeader } from '@nestjs/swagger';
import { AuthGuard } from '../infrastructure/guards/auth.guard';

@ApiTags('Validators')
@Controller('validators')
export class ValidatorController {
  constructor(private readonly validatorDataService: ValidatorsDataService) {}

  @Get('list-validators')
  @UseGuards(AuthGuard)
  @ApiOperation({ summary: 'Get list of validators' })
  @ApiResponse({
    status: 200,
    description: 'Returns paginated list of validators',
  })
  @ApiHeader({
    name: 'x-api-key',
    description: 'API key for authentication',
    required: true,
  })
  async getValidatorsList(@Query() paginationQuery: ListPaginationDto) {
    const res =
      await this.validatorDataService.getValidatorsList(paginationQuery);
    return res;
  }

  @Post('bulk-update')
  @UseGuards(AuthGuard)
  @ApiOperation({ summary: 'Bulk update or create validators' })
  @ApiResponse({
    status: 200,
    description: 'Validators updated or created successfully',
  })
  @ApiHeader({
    name: 'x-api-key',
    description: 'API key for authentication',
    required: true,
  })
  async updateOrCreateBulk(@Body() validators: any[]): Promise<string> {
    await this.validatorDataService.createOrUpdateBulk(validators);
    return 'Bulk update or creation completed successfully!';
  }

  @Post('create')
  @UseGuards(AuthGuard)
  @ApiOperation({ summary: 'Create a new validator' })
  @ApiResponse({
    status: 200,
    description: 'Validator created successfully',
  })
  @ApiHeader({
    name: 'x-api-key',
    description: 'API key for authentication',
    required: true,
  })
  async createValidator(@Body() validator: any): Promise<string> {
    await this.validatorDataService.createValidator(validator);
    return 'Validator created successfully!';
  }
}
