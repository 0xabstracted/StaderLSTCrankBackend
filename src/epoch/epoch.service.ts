import { Injectable, Logger } from '@nestjs/common';
import { Connection, EpochInfo, EpochSchedule } from '@solana/web3.js';
import { SolanaUtilService } from '../utils/solana-utils.service';

@Injectable()
export class EpochService {
  private readonly logger = new Logger(EpochService.name);
  private connection: Connection;
  readonly SLOT_TIME_SECONDS = 0.4; // 400ms per slot

  constructor(private readonly solanaUtilService: SolanaUtilService) {
    this.connection = this.solanaUtilService.getConnection();
  }

  async getEpochProgress(): Promise<{
    currentEpoch: number;
    slotIndex: number;
    absoluteSlot: number;
    slotsInEpoch: number;
    timeLeftInEpoch: number;
    progress: number;
  }> {
    try {
      const epochInfo: EpochInfo = await this.connection.getEpochInfo();
      // Validate epoch info and slot
      if (
        !epochInfo ||
        typeof epochInfo.slotsInEpoch !== 'number' ||
        typeof epochInfo.slotIndex !== 'number'
      ) {
        throw new Error('Invalid epoch info');
      }
      const progress = (epochInfo.slotIndex / epochInfo.slotsInEpoch) * 100;
      const slotsRemaining = epochInfo.slotsInEpoch - epochInfo.slotIndex;
      const timeLeftInEpoch = slotsRemaining * this.SLOT_TIME_SECONDS; // Convert to seconds

      this.logger.debug(`Current epoch: ${epochInfo.epoch}`);
      // this.logger.debug(`Slot index: ${epochInfo.slotIndex}`);
      // this.logger.debug(`Slots in epoch: ${epochInfo.slotsInEpoch}`);
      // this.logger.debug(`Absolute slot: ${epochInfo.absoluteSlot}`);
      // this.logger.debug(`Time left in epoch: ${timeLeftInEpoch}`);
      // this.logger.debug(`Current epoch progress: ${progress.toFixed(2)}%`);

      return {
        currentEpoch: epochInfo.epoch,
        slotIndex: epochInfo.slotIndex,
        absoluteSlot: epochInfo.absoluteSlot,
        slotsInEpoch: epochInfo.slotsInEpoch,
        timeLeftInEpoch: Math.floor(timeLeftInEpoch),
        progress: Number(progress.toFixed(2)),
      };
    } catch (error) {
      this.logger.error('Error fetching epoch progress:', error);
      throw error;
    }
  }

  async getEpochInfo(targetEpoch?: number): Promise<{
    epoch: number;
    targetEpochTimestamp: number;
    date: string;
  }> {
    try {
      const connection = this.solanaUtilService.getConnection();
      // Fetch epoch info
      const epochInfo = await connection.getEpochInfo();
      // Fetch current slot
      const slot = await connection.getSlot();

      // Validate epoch info and slot
      if (
        !epochInfo ||
        typeof epochInfo.slotsInEpoch !== 'number' ||
        typeof epochInfo.slotIndex !== 'number'
      ) {
        throw new Error('Invalid epoch info');
      }
      if (typeof slot !== 'number') {
        throw new Error('Invalid slot');
      }

      // Get current slot's timestamp (in seconds)
      const currentTimestamp = await connection.getBlockTime(slot);
      if (!currentTimestamp) {
        throw new Error('Could not get block time for the current slot');
      }

      // If target epoch is provided, calculate additional epochs
      const epochsToAdd = targetEpoch ? targetEpoch - epochInfo.epoch : 1;

      // Calculate remaining slots in current epoch plus additional epochs
      const slotsRemaining =
        epochInfo.slotsInEpoch -
        epochInfo.slotIndex +
        (epochsToAdd - 1) * epochInfo.slotsInEpoch;

      // Calculate time remaining (in seconds)
      const timeRemainingInEpoch = slotsRemaining * this.SLOT_TIME_SECONDS;

      // Target epoch's timestamp will be current time + remaining time
      const targetEpochTimestamp = currentTimestamp + timeRemainingInEpoch;

      return {
        epoch: epochInfo.epoch,
        targetEpochTimestamp,
        date: new Date(targetEpochTimestamp * 1000).toISOString(),
      };
    } catch (error) {
      this.logger.error('Error calculating epoch timestamp:', error);
      throw error;
    }
  }

  async getSlotInfo(targetSlot?: number): Promise<{
    slot: number;
    timestamp: number;
    date: string;
  }> {
    const connection = this.solanaUtilService.getConnection();

    try {
      // If targetSlot is provided, get its timestamp
      if (targetSlot) {
        const timestamp = await connection.getBlockTime(targetSlot);
        if (typeof timestamp !== 'number') {
          throw new Error('Invalid timestamp for provided slot');
        }
        this.logger.debug(`Target slot: ${targetSlot}`);
        this.logger.debug(`Target timestamp: ${timestamp}`);
        return {
          slot: targetSlot,
          timestamp,
          date: new Date(timestamp * 1000).toISOString(),
        };
      }

      // Otherwise get current slot and its timestamp
      const currentSlot = await connection.getSlot();
      if (typeof currentSlot !== 'number') {
        throw new Error('Invalid slot');
      }
      const currentTimestamp = await connection.getBlockTime(currentSlot);
      if (typeof currentTimestamp !== 'number') {
        throw new Error('Invalid timestamp');
      }
      this.logger.debug(`Current slot: ${currentSlot}`);
      this.logger.debug(`Current timestamp: ${currentTimestamp}`);
      return {
        slot: currentSlot,
        timestamp: currentTimestamp,
        date: new Date(currentTimestamp * 1000).toISOString(),
      };
    } catch (error) {
      this.logger.error('Error getting slot info:', error);
      throw error;
    }
  }

  async slotChecker(slotsForStakeDelta: number): Promise<{
    currentSlot: number;
    targetSlot: number;
    timeUntilExecution: number;
  }> {
    const epochInfo = await this.getEpochProgress();
    const epochSchedule: EpochSchedule =
      await this.connection.getEpochSchedule();
    const lastSlot = epochSchedule.getLastSlotInEpoch(epochInfo.currentEpoch);
    const targetSlot = lastSlot - slotsForStakeDelta;
    const slotsUntilExecution = targetSlot - epochInfo.absoluteSlot;
    const timeUntilExecution = slotsUntilExecution * this.SLOT_TIME_SECONDS;
    this.logger.debug({
      message: 'Slot checker',
      currentSlot: epochInfo.absoluteSlot,
      targetSlot,
      timeUntilExecution,
    });
    return {
      currentSlot: epochInfo.absoluteSlot,
      targetSlot,
      timeUntilExecution,
    };
  }
}
