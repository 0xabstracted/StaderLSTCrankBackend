import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { EpochInfo } from '../entities/epoch-info.entity';
import { EpochService } from './epoch.service';

@Injectable()
export class EpochTrackerService implements OnModuleInit {
  private readonly logger = new Logger(EpochTrackerService.name);
  private trackedEpoch: number | null = null;

  constructor(
    private readonly epochService: EpochService,
    @InjectRepository(EpochInfo)
    private readonly epochInfoRepository: Repository<EpochInfo>
  ) {}

  async onModuleInit() {
    await this.initializeEpochInfo();
  }

  /**
   * Initialize epoch info in the database
   */
  async initializeEpochInfo() {
    try {
      this.logger.log('Initializing epoch info...');
      
      // Get current epoch progress
      const epochProgress = await this.epochService.getEpochProgress();
      
      // Check if we already have this epoch in our database
      const existingEpoch = await this.epochInfoRepository.findOne({
        where: { epoch: epochProgress.currentEpoch }
      });
      
      if (!existingEpoch) {
        this.logger.log(`Creating epoch info for epoch ${epochProgress.currentEpoch}`);
        
        // Get current and next slots and timestamps
        const currentSlotInfo = await this.epochService.getSlotInfo();
        const endSlot = epochProgress.absoluteSlot + (epochProgress.slotsInEpoch - epochProgress.slotIndex);
        
        // Calculate start time
        const startTimestamp = currentSlotInfo.timestamp - 
          (epochProgress.slotIndex * this.epochService.SLOT_TIME_SECONDS);
        
        // Calculate end time
        const endTimestamp = startTimestamp + 
          (epochProgress.slotsInEpoch * this.epochService.SLOT_TIME_SECONDS);
        
        // Create new epoch info record
        const newEpochInfo = this.epochInfoRepository.create({
          epoch: epochProgress.currentEpoch,
          slotsInEpoch: epochProgress.slotsInEpoch,
          startTimestamp: BigInt(Math.floor(startTimestamp)),
          endTimestamp: BigInt(Math.floor(endTimestamp)),
          startSlot: epochProgress.absoluteSlot - epochProgress.slotIndex,
          endSlot: endSlot,
          isActive: true
        });
        
        await this.epochInfoRepository.save(newEpochInfo);
        
        // Also create next epoch info record
        await this.createNextEpochInfo(
          epochProgress.currentEpoch + 1, 
          epochProgress.slotsInEpoch, 
          endSlot + 1, 
          endTimestamp
        );
        
        this.trackedEpoch = epochProgress.currentEpoch;
        this.logger.log(`Epoch info initialized for epoch ${epochProgress.currentEpoch}`);
      } else {
        this.trackedEpoch = existingEpoch.epoch;
        this.logger.log(`Epoch info already exists for epoch ${existingEpoch.epoch}`);
        
        // Check if next epoch info exists, create if not
        const nextEpoch = existingEpoch.epoch + 1;
        const nextEpochInfo = await this.epochInfoRepository.findOne({
          where: { epoch: nextEpoch }
        });
        
        if (!nextEpochInfo) {
          this.logger.log(`Creating next epoch info for epoch ${nextEpoch}`);
          await this.createNextEpochInfo(
            nextEpoch, 
            existingEpoch.slotsInEpoch, 
            existingEpoch.endSlot + 1, 
            Number(existingEpoch.endTimestamp)
          );
        }
      }
    } catch (error) {
      this.logger.error(`Error initializing epoch info: ${error.message}`, error.stack);
    }
  }

  /**
   * Helper function to create next epoch info
   */
  private async createNextEpochInfo(
    epoch: number, 
    slotsInEpoch: number, 
    startSlot: number, 
    startTimestamp: number
  ) {
    try {
      const endSlot = startSlot + slotsInEpoch - 1;
      const endTimestamp = startTimestamp + (slotsInEpoch * this.epochService.SLOT_TIME_SECONDS);
      
      const newEpochInfo = this.epochInfoRepository.create({
        epoch: epoch,
        slotsInEpoch: slotsInEpoch,
        startTimestamp: BigInt(Math.floor(startTimestamp)),
        endTimestamp: BigInt(Math.floor(endTimestamp)),
        startSlot: startSlot,
        endSlot: endSlot,
        isActive: false
      });
      
      await this.epochInfoRepository.save(newEpochInfo);
      this.logger.log(`Created epoch info for epoch ${epoch}`);
    } catch (error) {
      this.logger.error(`Error creating next epoch info: ${error.message}`, error.stack);
    }
  }

  /**
   * Check for epoch change every 2 hours
   * Solana epochs are ~2-3 days, so checking every 2 hours is sufficient
   */
  @Cron(CronExpression.EVERY_2_HOURS)
  async checkEpochChange() {
    try {
      // Get current epoch progress
      const epochProgress = await this.epochService.getEpochProgress();
      
      if (this.trackedEpoch === null || epochProgress.currentEpoch !== this.trackedEpoch) {
        this.logger.log(`Epoch change detected. Previous: ${this.trackedEpoch}, Current: ${epochProgress.currentEpoch}`);
        
        // Update previous epoch to inactive if it exists
        if (this.trackedEpoch !== null) {
          await this.epochInfoRepository.update(
            { epoch: this.trackedEpoch },
            { isActive: false }
          );
          this.logger.log(`Marked epoch ${this.trackedEpoch} as inactive`);
        }
        
        // Check if we already have the new epoch in our database
        const existingNewEpoch = await this.epochInfoRepository.findOne({
          where: { epoch: epochProgress.currentEpoch }
        });
        
        if (existingNewEpoch) {
          // Update it to active
          await this.epochInfoRepository.update(
            { epoch: epochProgress.currentEpoch },
            { isActive: true }
          );
          this.logger.log(`Updated epoch ${epochProgress.currentEpoch} to active`);
        } else {
          // Create record for the new epoch
          const currentSlotInfo = await this.epochService.getSlotInfo();
          const endSlot = epochProgress.absoluteSlot + (epochProgress.slotsInEpoch - epochProgress.slotIndex);
          
          // Calculate start time
          const startTimestamp = currentSlotInfo.timestamp - 
            (epochProgress.slotIndex * this.epochService.SLOT_TIME_SECONDS);
          
          // Calculate end time
          const endTimestamp = startTimestamp + 
            (epochProgress.slotsInEpoch * this.epochService.SLOT_TIME_SECONDS);
          
          // Create new epoch info record
          const newEpochInfo = this.epochInfoRepository.create({
            epoch: epochProgress.currentEpoch,
            slotsInEpoch: epochProgress.slotsInEpoch,
            startTimestamp: BigInt(Math.floor(startTimestamp)),
            endTimestamp: BigInt(Math.floor(endTimestamp)),
            startSlot: epochProgress.absoluteSlot - epochProgress.slotIndex,
            endSlot: endSlot,
            isActive: true
          });
          
          await this.epochInfoRepository.save(newEpochInfo);
          this.logger.log(`Created epoch info for new epoch ${epochProgress.currentEpoch}`);
        }
        
        // Create next epoch info if it doesn't exist
        const nextEpoch = epochProgress.currentEpoch + 1;
        const nextEpochInfo = await this.epochInfoRepository.findOne({
          where: { epoch: nextEpoch }
        });
        
        if (!nextEpochInfo) {
          this.logger.log(`Creating next epoch info for epoch ${nextEpoch}`);
          
          // Get the current epoch info again
          const currentEpochInfo = await this.epochInfoRepository.findOne({
            where: { epoch: epochProgress.currentEpoch }
          });
          
          if (currentEpochInfo) {
            await this.createNextEpochInfo(
              nextEpoch, 
              currentEpochInfo.slotsInEpoch, 
              currentEpochInfo.endSlot + 1, 
              Number(currentEpochInfo.endTimestamp)
            );
          }
        }
        
        this.trackedEpoch = epochProgress.currentEpoch;
      } else {
        this.logger.debug(`No epoch change detected. Current epoch: ${epochProgress.currentEpoch}`);
      }
    } catch (error) {
      this.logger.error(`Error checking for epoch change: ${error.message}`, error.stack);
    }
  }

  /**
   * Get epoch info from database
   */
  async getEpochInfoFromDb(targetEpoch?: number): Promise<any> {
    try {
      let epochInfo;
      
      if (targetEpoch) {
        // Get specific epoch info
        epochInfo = await this.epochInfoRepository.findOne({
          where: { epoch: targetEpoch }
        });
      } else {
        // Get active epoch info
        epochInfo = await this.epochInfoRepository.findOne({
          where: { isActive: true }
        });
        
        // If no active epoch found, get the highest epoch
        if (!epochInfo) {
          const latestEpochs = await this.epochInfoRepository.find({
            order: { epoch: 'DESC' },
            take: 1
          });
          
          if (latestEpochs.length > 0) {
            epochInfo = latestEpochs[0];
          }
        }
      }
      
      if (!epochInfo) {
        throw new Error(`Epoch info not found for ${targetEpoch || 'active epoch'}`);
      }
      
      return {
        epoch: epochInfo.epoch,
        slotsInEpoch: epochInfo.slotsInEpoch,
        startTimestamp: Number(epochInfo.startTimestamp.toString()),
        endTimestamp: Number(epochInfo.endTimestamp.toString()),
        startSlot: epochInfo.startSlot,
        endSlot: epochInfo.endSlot
      };
    } catch (error) {
      this.logger.error(`Error fetching epoch info from DB: ${error.message}`, error.stack);
      throw error;
    }
  }

  /**
   * Calculate epoch progress based on current time and epoch info
   */
  async calculateEpochProgress(): Promise<{
    currentEpoch: number;
    timeLeftInEpoch: number;
    progress: number;
  }> {
    try {
      // Get epoch info from database
      const epochInfo = await this.getEpochInfoFromDb();
      
      // Get current time
      const currentTime = Math.floor(Date.now() / 1000);
      
      // Calculate progress
      const epochDuration = epochInfo.endTimestamp - epochInfo.startTimestamp;
      const timeElapsed = currentTime - epochInfo.startTimestamp;
      const progress = (timeElapsed / epochDuration) * 100;
      
      // Calculate time left
      const timeLeftInEpoch = epochInfo.endTimestamp - currentTime;
      
      return {
        currentEpoch: epochInfo.epoch,
        timeLeftInEpoch: Math.max(0, timeLeftInEpoch),
        progress: Math.min(100, Math.max(0, Number(progress.toFixed(2))))
      };
    } catch (error) {
      this.logger.error(`Error calculating epoch progress: ${error.message}`, error.stack);
      throw error;
    }
  }
} 