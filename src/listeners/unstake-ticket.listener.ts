import { Injectable, Logger, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { SolanaUtilService } from '../utils/solana-utils.service';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UnstakeTickets } from '../entities/unstaketickets.entity';
import { EpochService } from '../epoch/epoch.service';

@Injectable()
export class UnstakeTicketListener implements OnModuleInit, OnModuleDestroy {
  private readonly logger = new Logger(UnstakeTicketListener.name);
  private listenerSubscriptionId: number;

  constructor(
    private readonly solanaUtilsService: SolanaUtilService,
    private readonly epochService: EpochService,
    @InjectRepository(UnstakeTickets)
    private readonly unstakeTicketsRepository: Repository<UnstakeTickets>,
  ) {}

  async onModuleInit() {
    this.logger.log('Initializing UnstakeTicketListener...');
    await this.setupUnstakeTicketListener();
  }

  private async setupUnstakeTicketListener() {
    try {
      const program = this.solanaUtilsService.getProgram();
      
      this.logger.log('Setting up unstake ticket listener...');
      
      // Subscribe to program account changes for ticket accounts
      // Use the correct event name from the Stader staking program
      this.listenerSubscriptionId = program.addEventListener('OrderUnstakeEvent', async (event) => {
        try {
          this.logger.log(`Unstake ticket created event received: ${JSON.stringify(event)}`);
          
          // Extract data from the event based on the actual event structure
          // Fixed field names to match the actual event structure
          const state = event.state.toString();
          const ticketPublicKey = event.ticket.toString();
          const beneficiary = event.beneficiary.toString();
          const solAmount = event.solAmount.toString();
          const ticketCreatedEpoch = event.ticketEpoch;
          
          // Get the current epoch info
          const currentEpochInfo = await this.epochService.getEpochInfo(
            Number(ticketCreatedEpoch) + 1
          );
          
          // Calculate the claimable time from the epoch info
          const claimableTime = currentEpochInfo.targetEpochTimestamp;
          
          // Create new unstake ticket record
          const newTicket = this.unstakeTicketsRepository.create({
            state: 'created',
            ticket: ticketPublicKey,
            ticketCreatedEpoch: Number(ticketCreatedEpoch),
            beneficiary: beneficiary,
            solAmount: BigInt(solAmount),
            claimableTime: BigInt(claimableTime)
          });
          
          await this.unstakeTicketsRepository.save(newTicket);
          
          this.logger.log(`Unstake ticket saved to database: ${ticketPublicKey}`);
        } catch (error) {
          this.logger.error(`Error processing unstake ticket event: ${error.message}`, error.stack);
        }
      });
      
      this.logger.log(`Unstake ticket listener setup complete with subscription ID: ${this.listenerSubscriptionId}`);
    } catch (error) {
      this.logger.error(`Error setting up unstake ticket listener: ${error.message}`, error.stack);
    }
  }
  
  async onModuleDestroy() {
    if (this.listenerSubscriptionId) {
      const program = this.solanaUtilsService.getProgram();
      await program.removeEventListener(this.listenerSubscriptionId);
      this.logger.log(`Removed unstake ticket listener with subscription ID: ${this.listenerSubscriptionId}`);
    }
  }
} 