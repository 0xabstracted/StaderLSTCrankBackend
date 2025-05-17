import { Inject, Injectable } from '@nestjs/common';
import { AnchorProvider, Program } from '@coral-xyz/anchor';
import NodeWallet from '@coral-xyz/anchor/dist/cjs/nodewallet';
import { Connection, Keypair, PublicKey } from '@solana/web3.js';
import idl from './targets/idl/stader_liquid_staking.json';
import { StaderLiquidStaking, IDL} from './targets/types/stader_liquid_staking';
import { EnvironmentConfigService } from 'src/infrastructure';
import * as fs from 'fs';
import * as path from 'path';
import { ServiceLevelLogger } from 'src/infrastructure';
import { getAssociatedTokenAddressSync } from '@solana/spl-token';


@Injectable()
export class SolanaUtilService{
  private RPC: string
  private connection:Connection
  private wallet:NodeWallet
  private provider:AnchorProvider
  private program:Program<StaderLiquidStaking>
  private programId:PublicKey
  // the keypair used to pay for the transactions
  private payerKeypair:Keypair
  // the keypair used to run the crank instructions
  private crankerKeypair:Keypair
  private stateAccountPublicKey:PublicKey
  private stakeListPublicKey: PublicKey
  private validatorListPublicKey: PublicKey
  private operationalSolAccountPublicKey: PublicKey
  private staderSolMintPublicKey: PublicKey
  private lpMintPublicKey: PublicKey
  private staderSolMintAuthority: PublicKey
  private authorityLpAcc: PublicKey
  private reservePda: PublicKey
  private solLegPda: PublicKey
  private authorityStaderSolLegAcc: PublicKey
  private stakeDepositAuthority: PublicKey
  private stakeWithdrawAuthority: PublicKey
  private treasuryStaderSolAccount: PublicKey
  private staderSolLeg: PublicKey

  constructor(
    @Inject('SOLANA_UTIL_LOGGER')
    private readonly logger:ServiceLevelLogger,
    private readonly environmentConfigService:EnvironmentConfigService
  ){
      this.initializeRPCClientConnect();
      this.programId = new PublicKey(idl.metadata.address)
      this.payerKeypair = this.loadKeypairFromFile('../../../secrets/prodDeploy/cranker.json');
      this.wallet = new NodeWallet(this.payerKeypair)
      this.provider = new AnchorProvider(this.connection, this.wallet,{})
      this.program = new Program<StaderLiquidStaking>(IDL,this.programId,this.provider);
      this.crankerKeypair = this.loadKeypairFromFile('../../../secrets/prodDeploy/cranker.json');
      this.stateAccountPublicKey = new PublicKey('6WkY9wdYRVcU1kEFwsKy1DEXSQtYw9qViu4d6Phi6cYB');
      this.stakeListPublicKey = new PublicKey('A8NUYkzHwPyWBQcoWgNYjAsVFWAinj3SRJwG9VBjxMZH');
      this.validatorListPublicKey = new PublicKey('B8jPF5FsjJRteUeSNqd4X7BucubTHnXutRZqphdfSYUr');
      this.operationalSolAccountPublicKey = new PublicKey('6hhhBVVJmaxdqJCSMYP44kooweDrHoStkPQo5wyPrN1s');
      this.staderSolMintPublicKey = new PublicKey('sTadM6ZhQGr9e45fpV6ig92X1ZEELRVjAiJ8qJ9SLXQ');
      this.lpMintPublicKey = new PublicKey('HnFze3Ef6hY48HMyVyHkRTwSrPWmf7e35JeEqtDaEELC');
      [this.staderSolMintAuthority] = PublicKey.findProgramAddressSync([this.stateAccountPublicKey.toBuffer(),Buffer.from('st_mint')],this.programId);
      [this.authorityLpAcc] = PublicKey.findProgramAddressSync([this.stateAccountPublicKey.toBuffer(),Buffer.from('liq_mint')],this.programId);
      [this.reservePda] = PublicKey.findProgramAddressSync([this.stateAccountPublicKey.toBuffer(),Buffer.from('reserve')],this.programId);
      [this.solLegPda] = PublicKey.findProgramAddressSync([this.stateAccountPublicKey.toBuffer(),Buffer.from('liq_sol')],this.programId);
      [this.authorityStaderSolLegAcc] = PublicKey.findProgramAddressSync([this.stateAccountPublicKey.toBuffer(),Buffer.from('liq_st_sol_authority')],this.programId);
      [this.stakeDepositAuthority] = PublicKey.findProgramAddressSync([this.stateAccountPublicKey.toBuffer(),Buffer.from('deposit')],this.programId);
      [this.stakeWithdrawAuthority] = PublicKey.findProgramAddressSync([this.stateAccountPublicKey.toBuffer(),Buffer.from('withdraw')],this.programId);
      this.treasuryStaderSolAccount = getAssociatedTokenAddressSync(this.staderSolMintPublicKey,this.stateAccountPublicKey,true)
      this.staderSolLeg = getAssociatedTokenAddressSync(this.staderSolMintPublicKey,this.authorityStaderSolLegAcc,true)

  }
  
  public loadKeypairFromFile(fileName: string): Keypair {
    const filePath = path.resolve(__dirname, '../secrets', fileName);
    try {
      this.logger.debug(`Resolved keypair file path: ${filePath}`);
      if (!fs.existsSync(filePath)) {
        this.logger.error(`Keypair file does not exist at: ${filePath}`);
        throw new Error(`Keypair file does not exist at: ${filePath}`);
      }
  
      const keyPairString = fs.readFileSync(filePath, 'utf-8');
      const keyPairData = JSON.parse(keyPairString);
      return Keypair.fromSecretKey(new Uint8Array(keyPairData));
    } catch (error) {
      this.logger.error('Error while loading keypair. Ensure the file exists and is readable.', error);
      throw new Error('Keypair file is missing or inaccessible. Check the file path and permissions.');
    }
  }
  
  private initializeRPCClientConnect(){
    if(this.environmentConfigService.getSolanaCluster() === 'MAINNET'){
      this.connection = new Connection(this.environmentConfigService.getSolanaMainnetRPCUrl(),'confirmed');
    }
    else{
      this.connection = new Connection(this.environmentConfigService.getSolanaDevnetRPCUrl(),'confirmed');
    }
  }

  public getProgram():Program<StaderLiquidStaking>{
    return this.program;
  }

  public getProvider():AnchorProvider{
    return this.provider;
  }
  
  public getConnection():Connection{
    return this.connection;
  }

  public getPayerKeypair():Keypair{
    return this.payerKeypair;
  }

  public getCrankerKeypair():Keypair{
    return this.crankerKeypair;
  }

  public getStateAccountPublicKey():PublicKey{
    return this.stateAccountPublicKey;
  }

  public getStakeListPublicKey():PublicKey{
    return this.stakeListPublicKey;
  }

  public getValidatorListPublicKey():PublicKey{
    return this.validatorListPublicKey;
  }

  public getOperationalSolAccountPublicKey():PublicKey{
    return this.operationalSolAccountPublicKey;
  }

  public getStaderSolMintPublicKey():PublicKey{
    return this.staderSolMintPublicKey;
  }

  public getLpMintPublicKey():PublicKey{
    return this.lpMintPublicKey;
  }

  public getAuthorityStaderSolLegAcc():PublicKey{
    return this.authorityStaderSolLegAcc;
  }

  public getStaderSolMintAuthority():PublicKey{
    return this.staderSolMintAuthority;
  }

  public getAuthorityLpAcc():PublicKey{
    return this.authorityLpAcc;
  }

  public getReservePda():PublicKey{
    return this.reservePda;
  }

  public getSolLegPda():PublicKey{
    return this.solLegPda;
  }

  public getStakeDepositAuthority():PublicKey{
    return this.stakeDepositAuthority;
  }

  public getStakeWithdrawAuthority():PublicKey{
    return this.stakeWithdrawAuthority;
  }

  public getTreasuryStaderSolAccount():PublicKey{
    return this.treasuryStaderSolAccount;
  }

  public getStaderSolLeg():PublicKey{
    return this.staderSolLeg;
  }
}