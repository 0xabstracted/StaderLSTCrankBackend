import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { CrankOpsService } from './crank-ops.service';
import { EpochService } from '../epoch/epoch.service';
import { EnvironmentConfigService } from '../infrastructure/environment-config';

@Injectable()
export class CrankSchedulerService implements OnModuleInit {
  private readonly logger = new Logger(CrankSchedulerService.name);
  private slotCheckInterval: ReturnType<typeof setInterval>;
  private areCranksRunning: boolean = false;
  readonly SLOTS_FOR_STAKE_DELTA: number = 420000; //18000;
  readonly SLOTS_FOR_UPDATE_CRANKS: number = 420000; //18000;
  // Status flags for each operation
  private processStatus = {
    isDeactivateStakeRunning: false,
    isStakeReserveRunning: false,
    isUpdateActiveRunning: false,
    isUpdateDeactivatedRunning: false,
    lastExecutionTime: null as Date | null,
    currentOperation: null as string | null,
  };
  // Add tracking for last executed epochs
  private lastDeactivateStakeEpoch: number = 0;
  private lastStakeDeltaEpoch: number = 0;
  private lastUpdateCranksEpoch: number = 0;

  constructor(
    private readonly crankOpsService: CrankOpsService,
    private readonly epochService: EpochService,
    private readonly environmentConfigService: EnvironmentConfigService,
  ) {}

  onModuleInit() {
    this.startSlotMonitoring();
  }

  private async startSlotMonitoring() {
    // Check slot every 10 seconds
    this.slotCheckInterval = setInterval(async () => {
      await this.checkSlotForDeactivateStakeCranks();
      await this.checkSlotForStakeDeltaCranks();
      await this.checkSlotsForUpdateCranks();
    }, 10000);
  }

  private async checkSlotForDeactivateStakeCranks() {
    try {
      const { currentSlot, targetSlot, timeUntilExecution } =
        await this.epochService.slotChecker(this.SLOTS_FOR_STAKE_DELTA);
      const currentEpoch = (await this.epochService.getEpochInfo()).epoch;

      // Execute when we reach target slot, cranks aren't running, and haven't run in this epoch
      if (
        currentSlot >= targetSlot &&
        !this.areCranksRunning &&
        currentEpoch > this.lastDeactivateStakeEpoch
      ) {
        this.areCranksRunning = true;
        this.logger.log(
          `Target slot ${targetSlot} reached. Starting deactivateStake crank for epoch ${currentEpoch}...`,
        );

        try {
          this.processStatus.isDeactivateStakeRunning = true;
          this.processStatus.currentOperation = 'deactivateStake';
          await this.crankOpsService.deactivateStake();
          this.lastDeactivateStakeEpoch = currentEpoch; // Update last executed epoch
          this.processStatus.isDeactivateStakeRunning = false;
          this.processStatus.lastExecutionTime = new Date();
          this.processStatus.currentOperation = null;
          this.logger.log(
            `deactivateStake completed for epoch ${currentEpoch}`,
          );
        } catch (error) {
          this.resetAllFlags();
          this.logger.error('Error in deactivateStake crank:', error);
        } finally {
          this.areCranksRunning = false;
        }

        this.logger.log({
          message: 'deactivateStake Process completed',
          currentSlot,
          targetSlot,
          timeUntilExecution,
        });
      }
    } catch (error) {
      this.logger.error('Error in checkSlotForDeactivateStakeCranks:', error);
      this.areCranksRunning = false;
    }
  }

  private async checkSlotForStakeDeltaCranks() {
    try {
      const { currentSlot, targetSlot, timeUntilExecution } =
        await this.epochService.slotChecker(this.SLOTS_FOR_STAKE_DELTA);
      const currentEpoch = (await this.epochService.getEpochInfo()).epoch;

      if (
        currentSlot >= targetSlot &&
        !this.areCranksRunning &&
        currentEpoch > this.lastStakeDeltaEpoch
      ) {
        this.areCranksRunning = true;
        this.logger.log(
          `Target slot ${targetSlot} reached. Starting stakeDelta crank for epoch ${currentEpoch}...`,
        );

        try {
          this.processStatus.isStakeReserveRunning = true;
          this.processStatus.currentOperation = 'stakeReserve';
          await this.crankOpsService.stakeReserve();
          this.lastStakeDeltaEpoch = currentEpoch; // Update last executed epoch
          this.processStatus.isStakeReserveRunning = false;
          this.processStatus.lastExecutionTime = new Date();
          this.processStatus.currentOperation = null;
          this.logger.log(`stakeReserve completed for epoch ${currentEpoch}`);
        } catch (error) {
          this.resetAllFlags();
          this.logger.error('Error in stakeReserve crank:', error);
        } finally {
          this.areCranksRunning = false;
        }

        this.logger.log({
          message: 'stakeReserve Process completed',
          currentSlot,
          targetSlot,
          timeUntilExecution,
        });
      }
    } catch (error) {
      this.logger.error('Error in checkSlotForStakeDeltaCranks:', error);
      this.areCranksRunning = false;
    }
  }

  private async checkSlotsForUpdateCranks() {
    try {
      const { currentSlot, targetSlot, timeUntilExecution } =
        await this.epochService.slotChecker(this.SLOTS_FOR_UPDATE_CRANKS);
      const currentEpoch = (await this.epochService.getEpochInfo()).epoch;

      if (
        currentSlot >= targetSlot &&
        !this.areCranksRunning &&
        currentEpoch > this.lastUpdateCranksEpoch
      ) {
        this.areCranksRunning = true;
        this.logger.log(
          `Target slot ${targetSlot} reached. Starting Update Active and Deactivated for epoch ${currentEpoch}...`,
        );

        try {
          await this.executeUpdateCranks();
          this.lastUpdateCranksEpoch = currentEpoch; // Update last executed epoch
          this.logger.log(
            `Update Active and Deactivated completed successfully for epoch ${currentEpoch}`,
          );
        } catch (error) {
          this.logger.error('Update Active and Deactivated failed:', error);
          this.resetAllFlags();
        } finally {
          this.areCranksRunning = false;
        }

        this.logger.log({
          message:
            'Process cycle completed after Update Active and Deactivated',
          currentSlot,
          targetSlot,
          timeUntilExecution,
        });
      }
    } catch (error) {
      this.logger.error('Error in checkSlotsForUpdateCranks:', error);
      this.areCranksRunning = false;
    }
  }

  private async executeUpdateCranks() {
    try {
      // 1. Update active stakes
      this.processStatus.isUpdateActiveRunning = true;
      this.processStatus.currentOperation = 'updateActive';
      this.logger.log('1. Starting updateActive...');
      await this.crankOpsService.updateActive();
      this.logger.log('updateActive completed');
      this.processStatus.isUpdateActiveRunning = false;

      // 2. Update deactivated stakes
      this.processStatus.isUpdateDeactivatedRunning = true;
      this.processStatus.currentOperation = 'updateDeactivated';
      this.logger.log('2. Starting updateDeactivated...');
      await this.crankOpsService.updateDeactivated();
      this.logger.log('updateDeactivated completed');
      this.processStatus.isUpdateDeactivatedRunning = false;

      this.processStatus.lastExecutionTime = new Date();
      this.processStatus.currentOperation = null;

      this.logger.log('Update Active and Deactivated completed successfully');
    } catch (error) {
      this.logger.error(
        'Error executing Update Active and Deactivated:',
        error,
      );
      throw error; // Re-throw to trigger error handling in parent
    } finally {
      // Always reset the areCranksRunning flag when updates complete or fail
      this.areCranksRunning = false;
      this.logger.log('Process flag reset after Update Active and Deactivated');
    }
  }

  private resetAllFlags() {
    this.processStatus.isDeactivateStakeRunning = false;
    this.processStatus.isStakeReserveRunning = false;
    this.processStatus.isUpdateActiveRunning = false;
    this.processStatus.isUpdateDeactivatedRunning = false;
    this.processStatus.currentOperation = null;
  }

  // Cleanup on service destruction
  async onModuleDestroy() {
    if (this.slotCheckInterval) {
      clearInterval(this.slotCheckInterval);
    }
  }

  // crank process Status getters
  async getCranksExecutionStatus() {
    return {
      ...this.processStatus,
      isAnyProcessRunning: this.areCranksRunning,
    };
  }
}
