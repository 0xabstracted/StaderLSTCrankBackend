import { Injectable } from '@nestjs/common';
import { CrankDataService } from './crank-data.service';
import {
  Connection,
  Keypair,
  PublicKey,
  SYSVAR_EPOCH_SCHEDULE_PUBKEY,
  SYSVAR_STAKE_HISTORY_PUBKEY,
  STAKE_CONFIG_ID,
  StakeProgram,
  sendAndConfirmTransaction,
} from '@solana/web3.js';
import { SolanaUtilService } from '../utils/solana-utils.service';
import {
  DeactivateStakeParam,
  MergeStakeParam,
  RedelegateParam,
  StakeReserveParam,
  UpdateActiveParam,
  UpdateDeactivatedParam,
} from '../utils/types';
import { Program } from '@coral-xyz/anchor';
import { voteAccount } from './voteAccounts';
import { StaderLiquidStaking } from '@target/types/stader_liquid_staking';

@Injectable()
export class CrankOpsService {
  private connection: Connection;
  private program: Program<StaderLiquidStaking>;
  private payer: Keypair;
  private cranker: Keypair;
  private stateAccountPublicKey: PublicKey;
  private validatorsListPublicKey: PublicKey;
  private stakeListPublicKey: PublicKey;
  private reservePda: PublicKey;
  private stakeDepositAuthority: PublicKey;
  private stakeWithdrawAuthority: PublicKey;
  private staderSolMintPublicKey: PublicKey;
  private staderSolMintAuthority: PublicKey;
  private treasuryStaderSolAccount: PublicKey;
  private operationalSolAccountPublicKey: PublicKey;
  constructor(
    private readonly crankDataService: CrankDataService,
    private readonly solanaUtilService: SolanaUtilService,
  ) {
    this.connection = this.solanaUtilService.getConnection();
    this.program = this.solanaUtilService.getProgram();
    this.payer = this.solanaUtilService.getPayerKeypair();
    this.cranker = this.solanaUtilService.getCrankerKeypair();
    this.stateAccountPublicKey =
      this.solanaUtilService.getStateAccountPublicKey();
    this.validatorsListPublicKey =
      this.solanaUtilService.getValidatorListPublicKey();
    this.stakeListPublicKey = this.solanaUtilService.getStakeListPublicKey();
    this.reservePda = this.solanaUtilService.getReservePda();
    this.stakeDepositAuthority =
      this.solanaUtilService.getStakeDepositAuthority();
    this.stakeWithdrawAuthority =
      this.solanaUtilService.getStakeWithdrawAuthority();
    this.operationalSolAccountPublicKey =
      this.solanaUtilService.getOperationalSolAccountPublicKey();
    this.staderSolMintPublicKey =
      this.solanaUtilService.getStaderSolMintPublicKey();
    this.staderSolMintAuthority =
      this.solanaUtilService.getStaderSolMintAuthority();
    this.treasuryStaderSolAccount =
      this.solanaUtilService.getTreasuryStaderSolAccount();
  }

  async stakeReserve() {
    try {
      const validators = voteAccount;

      // Process current batch
      for (let i = 0; i < validators.length; i++) {
        console.log(`Processing delegation for validator: ${validators[i]}`);
        let stakeAccountKeypair = Keypair.generate();
        await this.stakeReserveCall(stakeAccountKeypair, {
          validatorIndex: i,
          validatorVote: validators[i],
        });

        console.log(
          `Successfully processed stake account ${i} of ${validators.length} for stakeReserve: ${stakeAccountKeypair.publicKey}`,
        );
      }

      return {
        success: true,
        message: 'Stake reserve operations completed',
        totalProcessed: validators.length,
      };
    } catch (error) {
      console.error('Error in stake reserve process:', error);
      throw error;
    }
  }

  async stakeReserveCall(
    stakeAccountKeypair: Keypair,
    stakeReserveParam: StakeReserveParam,
  ) {
    const { validatorIndex, validatorVote } = stakeReserveParam;
    const tx = await this.program.methods
      .stakeReserve(validatorIndex)
      .accounts({
        state: this.stateAccountPublicKey,
        validatorList: this.validatorsListPublicKey,
        stakeList: this.stakeListPublicKey,
        validatorVote: validatorVote,
        reservePda: this.reservePda,
        stakeAccount: stakeAccountKeypair.publicKey, //  must be fresh one
        stakeDepositAuthority: this.stakeDepositAuthority,
        rentPayer: this.cranker.publicKey,
        epochSchedule: SYSVAR_EPOCH_SCHEDULE_PUBKEY,
        stakeHistory: SYSVAR_STAKE_HISTORY_PUBKEY,
        stakeConfig: STAKE_CONFIG_ID,
        stakeProgram: StakeProgram.programId,
      })
      .signers([this.cranker])
      .transaction();

    // Set fee payer and recent blockhash
    tx.feePayer = this.cranker.publicKey;
    tx.recentBlockhash = (await this.connection.getLatestBlockhash()).blockhash;
    try {
      // Simulate the transaction to catch errors
      // const simulationResult = await this.connection.simulateTransaction(tx);
      // console.log("stakeReserve: Simulation Result:", simulationResult);
      // Send the transaction
      const sig = await sendAndConfirmTransaction(
        this.connection,
        tx,
        [this.cranker, stakeAccountKeypair],
        {
          skipPreflight: true,
        },
      );
      console.log('stakeReserve: Transaction Signature:', sig);
    } catch (error) {
      console.log('Error in executing stakeReserve ix:', error);
    }
  }

  async updateActive() {
    try {
      let page = 1;
      const limit = 10;
      let processedCount = 0;
      let hasMoreDelegations = true;

      while (hasMoreDelegations) {
        const stakeDelegations =
          await this.crankDataService.getStakeDelegationsList({
            page,
            limit,
          });

        // Stop if no delegations are returned
        if (!stakeDelegations.data.length) {
          hasMoreDelegations = false;
          break;
        }

        console.log(
          `Processing batch ${page}, delegations: ${stakeDelegations.data.length}`,
        );

        // Process current batch
        for (const delegation of stakeDelegations.data) {
          console.log(
            `Processing delegation for validator: ${delegation.validatorAccount}`,
          );

          await this.updateActiveCall(new PublicKey(delegation.stakeAccount), {
            stakeIndex: delegation.stakeAcIndex,
            validatorIndex: delegation.validatorAcIndex,
          });

          processedCount++;
          console.log(
            `Successfully processed stake account ${processedCount} of ${stakeDelegations.total} for updateActive: ${delegation.stakeAccount}`,
          );
        }

        // Check if we've processed all delegations
        hasMoreDelegations = processedCount < stakeDelegations.total;
        page++;

        // Optional: Add delay between batches to prevent rate limiting
        if (hasMoreDelegations) {
          await new Promise((resolve) => setTimeout(resolve, 1000));
        }
      }

      return {
        success: true,
        message: 'Update active operations completed',
        totalProcessed: processedCount,
      };
    } catch (error) {
      console.error('Error in update active process:', error);
      throw error;
    }
  }

  async updateActiveCall(
    stakeAccount: PublicKey,
    updateActiveParam: UpdateActiveParam,
  ) {
    const { stakeIndex, validatorIndex } = updateActiveParam;
    const tx = await this.program.methods
      .updateActive(stakeIndex, validatorIndex)
      .accounts({
        state: this.stateAccountPublicKey,
        stakeList: this.stakeListPublicKey,
        validatorList: this.validatorsListPublicKey,
        stakeAccount: stakeAccount,
        stakeWithdrawAuthority: this.stakeWithdrawAuthority,
        reservePda: this.reservePda,
        staderSolMint: this.staderSolMintPublicKey,
        staderSolMintAuthority: this.staderSolMintAuthority,
        treasuryStaderSolAccount: this.treasuryStaderSolAccount,
        stakeHistory: SYSVAR_STAKE_HISTORY_PUBKEY,
        stakeProgram: StakeProgram.programId,
      })
      .signers([this.cranker])
      .transaction();

    tx.feePayer = this.cranker.publicKey;
    tx.recentBlockhash = (await this.connection.getLatestBlockhash()).blockhash;

    try {
      // const simulationResult = await this.connection.simulateTransaction(tx);
      // console.log("updateActive: Simulation Result:", simulationResult);
      const sig = await sendAndConfirmTransaction(
        this.connection,
        tx,
        [this.cranker],
        {
          skipPreflight: true,
        },
      );
      console.log('updateActive: Transaction Signature:', sig);
    } catch (error) {
      console.log('Error in executing updateActive ix:', error);
    }
  }

  async updateDeactivated() {
    try {
      let page = 1;
      const limit = 10;
      let processedCount = 0;
      let hasMoreDelegations = true;

      while (hasMoreDelegations) {
        const stakeDelegations =
          await this.crankDataService.getStakeDelegationsList({
            page,
            limit,
          });

        // Stop if no delegations are returned
        if (!stakeDelegations.data.length) {
          hasMoreDelegations = false;
          break;
        }

        console.log(
          `Processing batch ${page}, delegations: ${stakeDelegations.data.length}`,
        );

        // Process current batch
        for (const delegation of stakeDelegations.data) {
          console.log(
            `Processing delegation for validator: ${delegation.validatorAccount}`,
          );

          await this.updateDeactivatedCall(
            new PublicKey(delegation.stakeAccount),
            {
              stakeIndex: delegation.stakeAcIndex,
            },
          );

          processedCount++;
          console.log(
            `Successfully processed stake account ${processedCount} of ${stakeDelegations.total} for updateDeactivated: ${delegation.stakeAccount}`,
          );
        }

        // Check if we've processed all delegations
        hasMoreDelegations = processedCount < stakeDelegations.total;
        page++;

        // Optional: Add delay between batches to prevent rate limiting
        if (hasMoreDelegations) {
          await new Promise((resolve) => setTimeout(resolve, 1000));
        }
      }

      return {
        success: true,
        message: 'Update deactivated operations completed',
        totalProcessed: processedCount,
      };
    } catch (error) {
      console.error('Error in update deactivated process:', error);
      throw error;
    }
  }

  async updateDeactivatedCall(
    stakeAccount: PublicKey,
    updateDeactivatedParam: UpdateDeactivatedParam,
  ) {
    const { stakeIndex } = updateDeactivatedParam;

    const tx = await this.program.methods
      .updateDeactivated(stakeIndex)
      .accounts({
        state: this.stateAccountPublicKey,
        stakeList: this.stakeListPublicKey,
        stakeAccount: stakeAccount,
        stakeWithdrawAuthority: this.stakeWithdrawAuthority,
        reservePda: this.reservePda,
        staderSolMint: this.staderSolMintPublicKey,
        staderSolMintAuthority: this.staderSolMintAuthority,
        treasuryStaderSolAccount: this.treasuryStaderSolAccount,
        stakeHistory: SYSVAR_STAKE_HISTORY_PUBKEY,
        stakeProgram: StakeProgram.programId,
        operationalSolAccount: this.operationalSolAccountPublicKey,
      })
      .signers([this.cranker])
      .transaction();

    tx.feePayer = this.cranker.publicKey;
    tx.recentBlockhash = (await this.connection.getLatestBlockhash()).blockhash;

    try {
      // const simulationResult = await this.connection.simulateTransaction(tx);
      // console.log("updateDeactivated: Simulation Result:", simulationResult);
      const sig = await sendAndConfirmTransaction(
        this.connection,
        tx,
        [this.cranker],
        {
          skipPreflight: true,
        },
      );
      console.log('updateDeactivated: Transaction Signature:', sig);
    } catch (error) {
      console.log('Error in executing updateDeactivated ix:', error);
    }
  }

  async deactivateStake() {
    try {
      let page = 1;
      const limit = 10;
      let processedCount = 0;
      let hasMoreDelegations = true;

      while (hasMoreDelegations) {
        const stakeDelegations =
          await this.crankDataService.getStakeDelegationsList({
            page,
            limit,
          });

        // Stop if no delegations are returned
        if (!stakeDelegations.data.length) {
          hasMoreDelegations = false;
          break;
        }

        // Stop if no delegations are returned
        if (!stakeDelegations.data.length) {
          hasMoreDelegations = false;
          break;
        }

        console.log(
          `Processing batch ${page}, delegations: ${stakeDelegations.data.length}`,
        );

        for (const delegation of stakeDelegations.data) {
          console.log(
            `Processing delegation for validator: ${delegation.validatorAccount}`,
          );
          await this.deactivateStakeCall(
            new PublicKey(delegation.stakeAccount),
            {
              stakeIndex: delegation.stakeAcIndex,
              validatorIndex: delegation.validatorAcIndex,
              splitStakeAccount: new Keypair(), // TODO: Add split stake account
            },
          );
          console.log(
            `Successfully processed stake account ${processedCount} of ${stakeDelegations.total} for deactivateStake: ${delegation.stakeAccount}`,
          );
        }

        hasMoreDelegations = processedCount < stakeDelegations.total;
        page++;

        if (hasMoreDelegations) {
          await new Promise((resolve) => setTimeout(resolve, 1000));
        }
      }
    } catch (error) {
      console.error('Error in deactivate stake process:', error);
      throw error;
    }
  }

  async deactivateStakeCall(
    stakeAccount: PublicKey,
    deactivateStakeParam: DeactivateStakeParam,
  ) {
    const { stakeIndex, validatorIndex, splitStakeAccount } =
      deactivateStakeParam;

    const tx = await this.program.methods
      .deactivateStake(stakeIndex, validatorIndex)
      .accounts({
        state: this.stateAccountPublicKey,
        reservePda: this.reservePda,
        validatorList: this.validatorsListPublicKey,
        stakeList: this.stakeListPublicKey,
        stakeAccount: stakeAccount,
        stakeDepositAuthority: this.stakeDepositAuthority,
        splitStakeAccount: splitStakeAccount.publicKey,
        splitStakeRentPayer: this.cranker.publicKey,
        epochSchedule: SYSVAR_EPOCH_SCHEDULE_PUBKEY,
        stakeHistory: SYSVAR_STAKE_HISTORY_PUBKEY,
        stakeProgram: StakeProgram.programId,
      })
      .signers([this.cranker])
      .transaction();
    // Set fee payer and recent blockhash
    tx.feePayer = this.cranker.publicKey;
    tx.recentBlockhash = (await this.connection.getLatestBlockhash()).blockhash;
    try {
      // Simulate the transaction to catch errors
      // const simulationResult = await this.connection.simulateTransaction(tx);
      // console.log("Simulation Result:", simulationResult);

      // Send the transaction
      const sig = await sendAndConfirmTransaction(
        this.connection,
        tx,
        [this.cranker, splitStakeAccount],
        {
          skipPreflight: true,
        },
      );
      console.log('deactivateStake: Transaction Signature:', sig);
    } catch (error) {
      console.log('Error in executing deactivateStake ix:', error);
    }
  }

  async mergeStake() {
    try {
      let page = 1;
      const limit = 10;
      let processedCount = 0;
      let hasMoreDelegations = true;

      while (hasMoreDelegations) {
        const stakeDelegations =
          await this.crankDataService.getStakeDelegationsList({
            page,
            limit,
          });

        // Stop if no delegations are returned
        if (!stakeDelegations.data.length) {
          hasMoreDelegations = false;
          break;
        }

        console.log(
          `Processing batch ${page}, delegations: ${stakeDelegations.data.length}`,
        );

        for (const delegation of stakeDelegations.data) {
          console.log(
            `Processing delegation for validator: ${delegation.validatorAccount}`,
          );
          await this.mergeStakeCall(new PublicKey(delegation.stakeAccount), {
            destinationStakeIndex: delegation.stakeAcIndex,
            sourceStakeIndex: delegation.stakeAcIndex,
            validatorIndex: delegation.validatorAcIndex,
            splitStakeAccount: new Keypair(), // TODO: Add split stake account
          });
          console.log(
            `Successfully processed stake account ${processedCount} of ${stakeDelegations.total} for mergeStake: ${delegation.stakeAccount}`,
          );
        }

        hasMoreDelegations = processedCount < stakeDelegations.total;
        page++;

        if (hasMoreDelegations) {
          await new Promise((resolve) => setTimeout(resolve, 1000));
        }
      }
    } catch (error) {
      console.error('Error in merge stake process:', error);
      throw error;
    }
  }

  async mergeStakeCall(
    stakeAccount: PublicKey,
    mergeStakeParam: MergeStakeParam,
  ) {
    const {
      destinationStakeIndex,
      sourceStakeIndex,
      validatorIndex,
      splitStakeAccount,
    } = mergeStakeParam;

    const tx = await this.program.methods
      .mergeStakes(destinationStakeIndex, sourceStakeIndex, validatorIndex)
      .accounts({
        state: this.stateAccountPublicKey,
        stakeList: this.stakeListPublicKey,
        validatorList: this.validatorsListPublicKey,
        destinationStake: splitStakeAccount.publicKey,
        sourceStake: stakeAccount,
        stakeDepositAuthority: this.stakeDepositAuthority,
        stakeWithdrawAuthority: this.stakeWithdrawAuthority,
        operationalSolAccount: this.operationalSolAccountPublicKey,
        stakeHistory: SYSVAR_STAKE_HISTORY_PUBKEY,
        stakeProgram: StakeProgram.programId,
      })
      .signers([this.cranker])
      .transaction();

    tx.feePayer = this.cranker.publicKey;
    tx.recentBlockhash = (await this.connection.getLatestBlockhash()).blockhash;

    try {
      // const simulationResult = await this.connection.simulateTransaction(tx);
      // console.log("Simulation Result:", simulationResult);
      const sig = await sendAndConfirmTransaction(
        this.connection,
        tx,
        [this.cranker],
        {
          skipPreflight: true,
        },
      );
      console.log('mergeStake: Transaction Signature:', sig);
    } catch (error) {
      console.log('Error in executing mergeStake ix:', error);
    }
  }

  async redelegate() {
    try {
      let page = 1;
      const limit = 10;
      let processedCount = 0;
      let hasMoreDelegations = true;

      while (hasMoreDelegations) {
        const stakeDelegations =
          await this.crankDataService.getStakeDelegationsList({
            page,
            limit,
          });

        // Stop if no delegations are returned
        if (!stakeDelegations.data.length) {
          hasMoreDelegations = false;
          break;
        }

        console.log(
          `Processing batch ${page}, delegations: ${stakeDelegations.data.length}`,
        );

        for (const delegation of stakeDelegations.data) {
          console.log(
            `Processing delegation for validator: ${delegation.validatorAccount}`,
          );
          await this.redelegateCall(new PublicKey(delegation.stakeAccount), {
            stakeIndex: delegation.stakeAcIndex,
            sourceValidatorIndex: delegation.validatorAcIndex,
            destValidatorIndex: delegation.validatorAcIndex,
            validatorVote: new PublicKey(delegation.validatorAccount),
            splitStakeAccount: new Keypair(), // TODO: Add split stake account
            newRedelegateStakeAccount: new Keypair(), // TODO: Add new redelegate stake account
          });
          console.log(
            `Successfully processed stake account ${processedCount} of ${stakeDelegations.total} for redelegate: ${delegation.stakeAccount}`,
          );
        }

        hasMoreDelegations = processedCount < stakeDelegations.total;
        page++;

        if (hasMoreDelegations) {
          await new Promise((resolve) => setTimeout(resolve, 1000));
        }
      }
    } catch (error) {
      console.error('Error in redelegate process:', error);
      throw error;
    }
  }

  async redelegateCall(
    stakeAccount: PublicKey,
    redelegateParam: RedelegateParam,
  ) {
    const {
      stakeIndex,
      sourceValidatorIndex,
      destValidatorIndex,
      validatorVote,
      splitStakeAccount,
      newRedelegateStakeAccount,
    } = redelegateParam;

    const tx = await this.program.methods
      .redelegate(stakeIndex, sourceValidatorIndex, destValidatorIndex)
      .accounts({
        state: this.stateAccountPublicKey,
        validatorList: this.validatorsListPublicKey,
        stakeList: this.stakeListPublicKey,
        stakeAccount: stakeAccount,
        stakeDepositAuthority: this.stakeDepositAuthority,
        reservePda: this.reservePda,
        splitStakeAccount: splitStakeAccount.publicKey,
        splitStakeRentPayer: this.payer.publicKey,
        destValidatorAccount: validatorVote,
        redelegateStakeAccount: newRedelegateStakeAccount.publicKey,
        stakeHistory: SYSVAR_STAKE_HISTORY_PUBKEY,
        stakeConfig: STAKE_CONFIG_ID,
        stakeProgram: StakeProgram.programId,
      })
      .signers([this.cranker])
      .transaction();

    tx.feePayer = this.cranker.publicKey;
    tx.recentBlockhash = (await this.connection.getLatestBlockhash()).blockhash;

    try {
      // const simulationResult = await this.connection.simulateTransaction(tx);
      // console.log("Simulation Result:", simulationResult);
      const sig = await sendAndConfirmTransaction(
        this.connection,
        tx,
        [this.cranker, splitStakeAccount, newRedelegateStakeAccount],
        {
          skipPreflight: true,
        },
      );
      console.log('redelegate: Transaction Signature:', sig);
    } catch (error) {
      console.log('Error in executing redelegate ix:', error);
    }
  }
}
