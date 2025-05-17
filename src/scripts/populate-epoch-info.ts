import { NestFactory } from '@nestjs/core';
import { Logger } from '@nestjs/common';
import { AppModule } from '../app.module';
import { EpochService } from '../epoch/epoch.service';
import { Repository } from 'typeorm';
import { EpochInfo } from '../entities/epoch-info.entity';
import { getRepositoryToken } from '@nestjs/typeorm';

/**
 * This script populates the initial epoch information in the database.
 * It fetches the current epoch and a few future epochs from the blockchain
 * and stores them in the database.
 */
async function bootstrap() {
  const logger = new Logger('PopulateEpochInfo');
  logger.log('Starting epoch info population script...');

  // Create a standalone application context
  const app = await NestFactory.createApplicationContext(AppModule);

  try {
    // Get the required services
    const epochService = app.get(EpochService);
    const epochInfoRepository = app.get<Repository<EpochInfo>>(getRepositoryToken(EpochInfo));

    // Get current epoch progress
    const epochProgress = await epochService.getEpochProgress();
    const currentEpoch = epochProgress.currentEpoch;
    
    logger.log(`Current epoch: ${currentEpoch}`);
    
    // Store current epoch info
    const currentSlotInfo = await epochService.getSlotInfo();
    const endSlot = epochProgress.absoluteSlot + (epochProgress.slotsInEpoch - epochProgress.slotIndex);
    
    // Calculate timestamps
    const startTimestamp = currentSlotInfo.timestamp - 
      (epochProgress.slotIndex * epochService.SLOT_TIME_SECONDS);
    
    const endTimestamp = startTimestamp + 
      (epochProgress.slotsInEpoch * epochService.SLOT_TIME_SECONDS);
    
    // Check if current epoch already exists
    const existingCurrentEpoch = await epochInfoRepository.findOne({
      where: { epoch: currentEpoch }
    });
    
    if (!existingCurrentEpoch) {
      // Create current epoch info
      const currentEpochInfo = epochInfoRepository.create({
        epoch: currentEpoch,
        slotsInEpoch: epochProgress.slotsInEpoch,
        startTimestamp: BigInt(Math.floor(startTimestamp)),
        endTimestamp: BigInt(Math.floor(endTimestamp)),
        startSlot: epochProgress.absoluteSlot - epochProgress.slotIndex,
        endSlot: endSlot,
        isActive: true
      });
      
      await epochInfoRepository.save(currentEpochInfo);
      logger.log(`Created epoch info for current epoch ${currentEpoch}`);
    } else {
      logger.log(`Epoch info for current epoch ${currentEpoch} already exists`);
    }
    
    // Add next epoch info
    const nextEpoch = currentEpoch + 1;
    const existingNextEpoch = await epochInfoRepository.findOne({
      where: { epoch: nextEpoch }
    });
    
    if (!existingNextEpoch) {
      const nextStartSlot = endSlot + 1;
      const nextEndSlot = nextStartSlot + epochProgress.slotsInEpoch - 1;
      const nextStartTimestamp = endTimestamp;
      const nextEndTimestamp = nextStartTimestamp + 
        (epochProgress.slotsInEpoch * epochService.SLOT_TIME_SECONDS);
      
      const nextEpochInfo = epochInfoRepository.create({
        epoch: nextEpoch,
        slotsInEpoch: epochProgress.slotsInEpoch,
        startTimestamp: BigInt(Math.floor(nextStartTimestamp)),
        endTimestamp: BigInt(Math.floor(nextEndTimestamp)),
        startSlot: nextStartSlot,
        endSlot: nextEndSlot,
        isActive: false
      });
      
      await epochInfoRepository.save(nextEpochInfo);
      logger.log(`Created epoch info for next epoch ${nextEpoch}`);
    }

    logger.log('Epoch info population completed successfully!');
  } catch (error) {
    logger.error(`Error populating epoch info: ${error.message}`, error.stack);
  } finally {
    await app.close();
  }
}

bootstrap(); 