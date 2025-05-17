import { Injectable, Logger } from '@nestjs/common';
import { SolanaUtilService } from '../utils/solana-utils.service';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UnstakeTickets } from 'src/entities/unstaketickets.entity';
import { StakeDelegation } from 'src/entities/stakedelegationhistory.entity';
import { EpochService } from '../epoch/epoch.service';
import { StaderSolPriceHistory } from '../entities/staderSolpricehistory.entity';

// Move interface outside the class
interface TicketUpdate {
  ticket: string;
  claimableTime?: string;
  claimed?: boolean;
  claimedTime?: Date;
}

@Injectable()
export class StateService {
  private readonly logger = new Logger(StateService.name);
  private readonly SLOTS_PER_EPOCH = 432000;  // Number of slots in an epoch
  private readonly SLOT_DURATION_MS = 400;     // Duration of each slot in milliseconds
  private readonly MS_PER_YEAR = 365.25 * 24 * 60 * 60 * 1000;  // Milliseconds in a year (including leap year average) 31,557,600,000
  
  constructor(
    private readonly solanaUtilsService: SolanaUtilService,
    private readonly epochService: EpochService,
    @InjectRepository(UnstakeTickets)
    private readonly unstakeTicketsRepository: Repository<UnstakeTickets>,
    @InjectRepository(StakeDelegation)
    private readonly stakeDelegationRepository: Repository<StakeDelegation>,
    @InjectRepository(StaderSolPriceHistory)
    private staderSolPriceHistoryRepository: Repository<StaderSolPriceHistory>,
  ) {
    const epochsPerYear = this.calculateEpochsPerYear();
    this.logger.log(`Calculated epochs per year: ${epochsPerYear.toFixed(3)}`);
    // 432000 slots * 0.4 seconds = 172800 seconds per epoch
    // 172800 seconds = 2 days per epoch
    // 365.25 days / 2 days ≈ 182.625 epochs per year
  }

  private calculateEpochsPerYear(): number {
    const msPerEpoch = this.SLOTS_PER_EPOCH * this.SLOT_DURATION_MS; // 172,800,000 
    const epochsPerYear = this.MS_PER_YEAR / msPerEpoch; // 182.625
    return epochsPerYear;
  }

  async getState() {
    const stateAccountPublicKey = this.solanaUtilsService.getStateAccountPublicKey();
    const program = this.solanaUtilsService.getProgram();
    const state = await program.account.state.fetch(
      stateAccountPublicKey
    );
    return state;
  }

  async getStaderSolPrice(): Promise<{ price: number; rawPrice: string }> {
    try {
      const stateAccountPublicKey = this.solanaUtilsService.getStateAccountPublicKey();
      const program = this.solanaUtilsService.getProgram();
      const state = await program.account.state.fetch(
        stateAccountPublicKey
      );
      const rawPrice = state.staderSolPrice;
      const PRICE_DENOMINATOR = BigInt("0x100000000");
      const price = Number(rawPrice) / Number(PRICE_DENOMINATOR);
      this.logger.verbose(`staderSOL Price: ${price}`);
      return {
        price,
        rawPrice: rawPrice.toString()
      };
    } catch (error) {
      this.logger.error('Error fetching staderSOL price:', error);
      throw error;
    }
  }

  async getAllDelayedUnstakeTickets() {
    try {
      const tickets = await this.unstakeTicketsRepository.find({
        order: { created_at: 'DESC' }
      });

      const serializedTickets = tickets.map(ticket => ({
        ...ticket,
        solAmount: ticket.solAmount.toString(),
        claimableTime: ticket.claimableTime.toString()
      }));

      return {
        success: true,
        data: serializedTickets,
        count: tickets.length
      };
    } catch (error) {
      this.logger.error('Error fetching all unstake tickets:', error);
      throw error;
    }
  }

  async getAllUnclaimedDelayedUnstakeTickets() {
    try {
      // First attempt to get from database
      const tickets = await this.unstakeTicketsRepository.find({
        where: { claimed: false }
      });
      
      if (tickets.length > 0) {
        return tickets.map((ticket) => ({
          ticketAccount: ticket.ticket,
          beneficiary: ticket.beneficiary,
          lamportsAmount: ticket.solAmount.toString(),
          createdEpoch: ticket.ticketCreatedEpoch.toString(),
        }));
      }
      
      // If no tickets in database, fallback to blockchain read
      const program = this.solanaUtilsService.getProgram();
      const ticketAccountData = await program.account.ticketAccountData.all();
      return ticketAccountData.map((ticket) => ({
        ticketAccount: ticket.publicKey.toBase58(),
        beneficiary: ticket.account.beneficiary.toBase58(),
        lamportsAmount: ticket.account.lamportsAmount.toString(),
        createdEpoch: ticket.account.createdEpoch.toString(),
      }));
    } catch (error) {
      console.log("Error in getAllUnclaimedDelayedUnstakeTickets : ", error)
      throw error;
    }
  }
  
  async getUnclaimedUnstakeTicketsByBenificiary(beneficiary: string) {
    try {
      const tickets = await this.unstakeTicketsRepository.find({
        where: { 
          beneficiary,
          claimed: false
        },
        order: { created_at: 'DESC' }
      });

      const serializedTickets = tickets.map(ticket => ({
        ...ticket,
        solAmount: ticket.solAmount.toString(),
        claimableTime: ticket.claimableTime.toString()
      }));

      return {
        success: true,
        data: serializedTickets
      };
    } catch (error) {
      this.logger.error('Error fetching unstake tickets:', error);
      throw error;
    }
  }

  async createStakeDelegation(stakeDelegation: {
    stakeAccount: string | null;
    stakeAcIndex: number | null;
    validatorAccount: string;
    validatorAcIndex: number;
    stakedAmount?: bigint | null;
  }) {
    try {
      const newDelegation = this.stakeDelegationRepository.create(stakeDelegation);
      await this.stakeDelegationRepository.save(newDelegation);
      return {
        success: true,
        data: newDelegation
      };
    } catch (error) {
      this.logger.error('Error creating stake delegation:', error);
      throw error;
    }
  }

  async createUnstakeTicket(ticket: {
    state: string;
    ticket: string;
    ticketCreatedEpoch: number;
    beneficiary: string;
    solAmount: string;
  }) {
    try {
      const epochInfo = await this.epochService.getEpochInfo(
        ticket.ticketCreatedEpoch + 1
      );
      const claimableTime = epochInfo.targetEpochTimestamp;
      
      const newTicket = this.unstakeTicketsRepository.create({
        ...ticket,
        solAmount: BigInt(ticket.solAmount),
        claimableTime: BigInt(claimableTime)
      });
      const savedTicket = await this.unstakeTicketsRepository.save(newTicket);

      const serializedTicket = {
        ...savedTicket,
        solAmount: savedTicket.solAmount.toString(),
        claimableTime: savedTicket.claimableTime.toString()
      };

      return {
        success: true,
        data: serializedTicket
      };
    } catch (error) {
      this.logger.error('Error creating unstake ticket:', error);
      throw error;
    }
  }

  async createUnstakeTicketsBulk(tickets: {
    state: string;
    ticket: string;
    ticketCreatedEpoch: number;
    beneficiary: string;
    solAmount: string;
    claimableTime: string;
  }[]) {
    try {
      const newTickets = tickets.map(ticket => 
        this.unstakeTicketsRepository.create({
          ...ticket,
          solAmount: BigInt(ticket.solAmount),
          claimableTime: BigInt(ticket.claimableTime)
        })
      );
      const savedTickets = await this.unstakeTicketsRepository.save(newTickets);

      const serializedTickets = savedTickets.map(ticket => ({
        ...ticket,
        solAmount: ticket.solAmount.toString(),
        claimableTime: ticket.claimableTime.toString()
      }));

      return {
        success: true,
        data: serializedTickets
      };
    } catch (error) {
      this.logger.error('Error creating bulk unstake tickets:', error);
      throw error;
    }
  }

  async calculateAPY() {
    const programStartEpoch = 734;
    
    // Get current epoch info
    const epochInfo = await this.epochService.getEpochInfo();
    const currentEpoch = epochInfo.epoch;

    this.logger.log(`calculateAPY: Current epoch is ${currentEpoch}`);

    // Fetch all entries for the current epoch
    let currentEpochEntries = await this.staderSolPriceHistoryRepository
      .createQueryBuilder('history')
      .where('history.currentEpoch = :currentEpoch', { currentEpoch })
      .getMany();

    this.logger.log(`calculateAPY: Found ${currentEpochEntries.length} price entries for epoch ${currentEpoch}`);

    // If no entries in current epoch, try to fallback to latest available epoch
    let actualEpoch = currentEpoch;
    if (currentEpochEntries.length < 1) {
      // Let's check if there are entries in other epochs
      const allEntries = await this.staderSolPriceHistoryRepository
        .createQueryBuilder('history')
        .select('DISTINCT history.currentEpoch')
        .orderBy('history.currentEpoch', 'DESC')
        .getRawMany();
      
      const availableEpochs = allEntries.map(entry => entry.history_currentEpoch);
      this.logger.log(`calculateAPY: No entries for current epoch ${currentEpoch}. Available epochs: ${JSON.stringify(availableEpochs)}`);
      
      // Check if there are any entries in the latest available epoch
      if (availableEpochs.length > 0) {
        const latestAvailableEpoch = Math.max(...availableEpochs);
        this.logger.log(`calculateAPY: Falling back to latest available epoch with data: ${latestAvailableEpoch}`);
        
        // Get entries from the latest available epoch
        currentEpochEntries = await this.staderSolPriceHistoryRepository
          .createQueryBuilder('history')
          .where('history.currentEpoch = :latestEpoch', { latestEpoch: latestAvailableEpoch })
          .getMany();
        
        this.logger.log(`calculateAPY: Found ${currentEpochEntries.length} entries in latest available epoch ${latestAvailableEpoch}`);
        actualEpoch = latestAvailableEpoch;
      }
      
      if (currentEpochEntries.length < 1) {
        throw new Error(`No price data available for current epoch (${currentEpoch}) or any previous epoch`);
      }
    }

    // Find highest price in current epoch
    const currentEpochHighestPrice = Math.max(
      ...currentEpochEntries.map(entry => Number(entry.newStaderSolPrice))
    );
    this.logger.log(`calculateAPY: Highest price in epoch ${actualEpoch}: ${currentEpochHighestPrice}`);

    // Constants
    const EPOCH_DURATION_DAYS = 2; // Each epoch is approximately 2 days
    const DAYS_IN_YEAR = 365.25; // Including leap years
    const EPOCHS_PER_YEAR = DAYS_IN_YEAR / EPOCH_DURATION_DAYS;
    
    const currentPrice = currentEpochHighestPrice;
    const startingPrice = 1; // staderSOL starts at 1
    const epochsPassed = actualEpoch - programStartEpoch;

    // Calculate growth
    const growth = currentPrice - startingPrice;
    
    // Calculate APR
    const apr = (growth / startingPrice) * (EPOCHS_PER_YEAR / epochsPassed) * 100;
    
    // Calculate growth factor for APY
    const growthFactor = currentPrice / startingPrice;
    
    // Calculate APY using compound growth formula
    const apy = (Math.pow(growthFactor, EPOCHS_PER_YEAR / epochsPassed) - 1) * 100;

    // Get latest total staked amount
    const latestEntry = currentEpochEntries[currentEpochEntries.length - 1];

    this.logger.log(`calculateAPY: Calculation complete - APR: ${apr}%, APY: ${apy}%`);

    return {
      apr,
      apy,
      growth: growth * 100, // Convert to percentage
      epochsPassed,
      epochsPerYear: EPOCHS_PER_YEAR,
      currentEpoch: actualEpoch, // Return the actual epoch used for calculation
      programStartEpoch,
      currentPrice,
      growthFactor,
      totalStaked: Number(latestEntry.totalVirtualStakedLamports),
      usingHistoricData: actualEpoch !== currentEpoch
    };
  }

  async getUnstakeTicketTimeLeft(ticket: string) {
    try {
      const unstakeTicket = await this.unstakeTicketsRepository.findOne({
        where: { ticket }
      });

      if (!unstakeTicket) {
        throw new Error('Unstake ticket not found');
      }

      return {
        success: true,
        data: {
          ticket: unstakeTicket.ticket,
          claimableTime: unstakeTicket.claimableTime.toString(),
        }
      };
    } catch (error) {
      this.logger.error('Error fetching unstake ticket time left:', error);
      throw error;
    }
  }

  async updateUnstakeTicket(ticket: string, update: Partial<Omit<TicketUpdate, 'ticket'>>) {
    try {
      const unstakeTicket = await this.unstakeTicketsRepository.findOne({
        where: { ticket }
      });

      if (!unstakeTicket) {
        throw new Error('Unstake ticket not found');
      }

      if (update.claimableTime !== undefined) {
        unstakeTicket.claimableTime = BigInt(update.claimableTime);
      }
      if (update.claimed !== undefined) {
        unstakeTicket.claimed = update.claimed;
      }
      if (update.claimedTime !== undefined) {
        unstakeTicket.claimedTime = update.claimedTime;
      }

      const savedTicket = await this.unstakeTicketsRepository.save(unstakeTicket);

      return {
        success: true,
        data: {
          ...savedTicket,
          solAmount: savedTicket.solAmount.toString(),
          claimableTime: savedTicket.claimableTime.toString(),
          claimed: savedTicket.claimed,
          claimedTime: savedTicket.claimedTime
        }
      };
    } catch (error) {
      this.logger.error('Error updating unstake ticket:', error);
      throw error;
    }
  }

  async updateUnstakeTicketClaimableTime(ticket: string, claimableTime: string) {
    return this.updateUnstakeTicket(ticket, { claimableTime });
  }

  async updateUnstakeTicketsBulk(updates: TicketUpdate[]) {
    try {
      const tickets = await this.unstakeTicketsRepository.find({
        where: updates.map(update => ({ ticket: update.ticket }))
      });

      if (!tickets.length) {
        throw new Error('No unstake tickets found');
      }

      const updatedTickets = tickets.map(ticket => {
        const update = updates.find(u => u.ticket === ticket.ticket);
        if (update) {
          if (update.claimableTime !== undefined) {
            ticket.claimableTime = BigInt(update.claimableTime);
          }
          if (update.claimed !== undefined) {
            ticket.claimed = update.claimed;
          }
          if (update.claimedTime !== undefined) {
            ticket.claimedTime = update.claimedTime;
          }
        }
        return ticket;
      });

      const savedTickets = await this.unstakeTicketsRepository.save(updatedTickets);

      return {
        success: true,
        data: savedTickets.map(ticket => ({
          ...ticket,
          solAmount: ticket.solAmount.toString(),
          claimableTime: ticket.claimableTime.toString(),
          claimed: ticket.claimed,
          claimedTime: ticket.claimedTime
        }))
      };
    } catch (error) {
      this.logger.error('Error updating unstake tickets in bulk:', error);
      throw error;
    }
  }

  async updateUnstakeTicketsClaimableTimeBulk(updates: { ticket: string; claimableTime: string }[]) {
    const formattedUpdates = updates.map(update => ({
      ticket: update.ticket,
      claimableTime: update.claimableTime
    }));
    return this.updateUnstakeTicketsBulk(formattedUpdates);
  }
} 