import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UnstakeTicketListener } from './unstake-ticket.listener';
import { UnstakeTickets } from '../entities/unstaketickets.entity';
import { UtilsModule } from '../utils/utils.module';
import { EpochModule } from '../epoch/epoch.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([UnstakeTickets]),
    UtilsModule,
    EpochModule,
  ],
  providers: [UnstakeTicketListener],
  exports: [UnstakeTicketListener],
})
export class ListenersModule {}
