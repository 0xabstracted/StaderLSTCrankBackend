import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { SolanaUtilService } from './utils/solana-utils.service';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly solanaUtilsService: SolanaUtilService,
  ) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}
