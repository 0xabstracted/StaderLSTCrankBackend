export type StaderLiquidStaking = {
  version: '0.1.0';
  name: 'stader_liquid_staking';
  instructions: [
    {
      name: 'initialize';
      accounts: [
        {
          name: 'state';
          isMut: true;
          isSigner: false;
        },
        {
          name: 'reservePda';
          isMut: false;
          isSigner: false;
        },
        {
          name: 'stakeList';
          isMut: true;
          isSigner: false;
        },
        {
          name: 'validatorList';
          isMut: true;
          isSigner: false;
        },
        {
          name: 'staderSolMint';
          isMut: false;
          isSigner: false;
        },
        {
          name: 'operationalSolAccount';
          isMut: false;
          isSigner: false;
        },
        {
          name: 'lpMint';
          isMut: false;
          isSigner: false;
        },
        {
          name: 'solLegPda';
          isMut: false;
          isSigner: false;
        },
        {
          name: 'staderSolLeg';
          isMut: false;
          isSigner: false;
        },
        {
          name: 'treasuryStaderSolAccount';
          isMut: false;
          isSigner: false;
        },
        {
          name: 'clock';
          isMut: false;
          isSigner: false;
        },
        {
          name: 'rent';
          isMut: false;
          isSigner: false;
        },
      ];
      args: [
        {
          name: 'data';
          type: {
            defined: 'InitializeData';
          };
        },
      ];
    },
    {
      name: 'changeAuthority';
      accounts: [
        {
          name: 'state';
          isMut: true;
          isSigner: false;
        },
        {
          name: 'adminAuthority';
          isMut: false;
          isSigner: true;
        },
      ];
      args: [
        {
          name: 'data';
          type: {
            defined: 'ChangeAuthorityData';
          };
        },
      ];
    },
    {
      name: 'addValidator';
      accounts: [
        {
          name: 'state';
          isMut: true;
          isSigner: false;
        },
        {
          name: 'managerAuthority';
          isMut: false;
          isSigner: true;
        },
        {
          name: 'validatorList';
          isMut: true;
          isSigner: false;
        },
        {
          name: 'validatorVote';
          isMut: false;
          isSigner: false;
        },
        {
          name: 'duplicationFlag';
          isMut: true;
          isSigner: false;
          docs: ['by initializing this account we mark the validator as added'];
        },
        {
          name: 'rentPayer';
          isMut: true;
          isSigner: true;
        },
        {
          name: 'clock';
          isMut: false;
          isSigner: false;
        },
        {
          name: 'rent';
          isMut: false;
          isSigner: false;
        },
        {
          name: 'systemProgram';
          isMut: false;
          isSigner: false;
        },
      ];
      args: [
        {
          name: 'score';
          type: 'u32';
        },
      ];
    },
    {
      name: 'removeValidator';
      accounts: [
        {
          name: 'state';
          isMut: true;
          isSigner: false;
        },
        {
          name: 'managerAuthority';
          isMut: false;
          isSigner: true;
        },
        {
          name: 'validatorList';
          isMut: true;
          isSigner: false;
        },
        {
          name: 'duplicationFlag';
          isMut: true;
          isSigner: false;
        },
        {
          name: 'operationalSolAccount';
          isMut: true;
          isSigner: false;
        },
      ];
      args: [
        {
          name: 'index';
          type: 'u32';
        },
        {
          name: 'validatorVote';
          type: 'publicKey';
        },
      ];
    },
    {
      name: 'setValidatorScore';
      accounts: [
        {
          name: 'state';
          isMut: true;
          isSigner: false;
        },
        {
          name: 'managerAuthority';
          isMut: false;
          isSigner: true;
        },
        {
          name: 'validatorList';
          isMut: true;
          isSigner: false;
        },
      ];
      args: [
        {
          name: 'index';
          type: 'u32';
        },
        {
          name: 'validatorVote';
          type: 'publicKey';
        },
        {
          name: 'score';
          type: 'u32';
        },
      ];
    },
    {
      name: 'configValidatorSystem';
      accounts: [
        {
          name: 'state';
          isMut: true;
          isSigner: false;
        },
        {
          name: 'managerAuthority';
          isMut: false;
          isSigner: true;
        },
      ];
      args: [
        {
          name: 'extraRuns';
          type: 'u32';
        },
      ];
    },
    {
      name: 'deposit';
      accounts: [
        {
          name: 'state';
          isMut: true;
          isSigner: false;
        },
        {
          name: 'staderSolMint';
          isMut: true;
          isSigner: false;
        },
        {
          name: 'liqPoolSolLegPda';
          isMut: true;
          isSigner: false;
        },
        {
          name: 'liqPoolStaderSolLeg';
          isMut: true;
          isSigner: false;
        },
        {
          name: 'liqPoolStaderSolLegAuthority';
          isMut: false;
          isSigner: false;
        },
        {
          name: 'reservePda';
          isMut: true;
          isSigner: false;
        },
        {
          name: 'transferFrom';
          isMut: true;
          isSigner: true;
        },
        {
          name: 'mintTo';
          isMut: true;
          isSigner: false;
          docs: ['user staderSOL Token account to send the staderSOL'];
        },
        {
          name: 'staderSolMintAuthority';
          isMut: false;
          isSigner: false;
        },
        {
          name: 'systemProgram';
          isMut: false;
          isSigner: false;
        },
        {
          name: 'tokenProgram';
          isMut: false;
          isSigner: false;
        },
      ];
      args: [
        {
          name: 'lamports';
          type: 'u64';
        },
      ];
    },
    {
      name: 'depositStakeAccount';
      accounts: [
        {
          name: 'state';
          isMut: true;
          isSigner: false;
        },
        {
          name: 'validatorList';
          isMut: true;
          isSigner: false;
        },
        {
          name: 'stakeList';
          isMut: true;
          isSigner: false;
        },
        {
          name: 'stakeAccount';
          isMut: true;
          isSigner: false;
        },
        {
          name: 'stakeAuthority';
          isMut: false;
          isSigner: true;
        },
        {
          name: 'duplicationFlag';
          isMut: true;
          isSigner: false;
        },
        {
          name: 'rentPayer';
          isMut: true;
          isSigner: true;
        },
        {
          name: 'staderSolMint';
          isMut: true;
          isSigner: false;
        },
        {
          name: 'mintTo';
          isMut: true;
          isSigner: false;
          docs: ['user staderSOL Token account to send the staderSOL'];
        },
        {
          name: 'staderSolMintAuthority';
          isMut: false;
          isSigner: false;
        },
        {
          name: 'clock';
          isMut: false;
          isSigner: false;
        },
        {
          name: 'rent';
          isMut: false;
          isSigner: false;
        },
        {
          name: 'systemProgram';
          isMut: false;
          isSigner: false;
        },
        {
          name: 'tokenProgram';
          isMut: false;
          isSigner: false;
        },
        {
          name: 'stakeProgram';
          isMut: false;
          isSigner: false;
        },
      ];
      args: [
        {
          name: 'validatorIndex';
          type: 'u32';
        },
      ];
    },
    {
      name: 'liquidUnstake';
      accounts: [
        {
          name: 'state';
          isMut: true;
          isSigner: false;
        },
        {
          name: 'staderSolMint';
          isMut: true;
          isSigner: false;
        },
        {
          name: 'liqPoolSolLegPda';
          isMut: true;
          isSigner: false;
        },
        {
          name: 'liqPoolStaderSolLeg';
          isMut: true;
          isSigner: false;
        },
        {
          name: 'treasuryStaderSolAccount';
          isMut: true;
          isSigner: false;
        },
        {
          name: 'getStaderSolFrom';
          isMut: true;
          isSigner: false;
        },
        {
          name: 'getStaderSolFromAuthority';
          isMut: false;
          isSigner: true;
        },
        {
          name: 'transferSolTo';
          isMut: true;
          isSigner: false;
        },
        {
          name: 'systemProgram';
          isMut: false;
          isSigner: false;
        },
        {
          name: 'tokenProgram';
          isMut: false;
          isSigner: false;
        },
      ];
      args: [
        {
          name: 'staderSolAmount';
          type: 'u64';
        },
      ];
    },
    {
      name: 'addLiquidity';
      accounts: [
        {
          name: 'state';
          isMut: true;
          isSigner: false;
        },
        {
          name: 'lpMint';
          isMut: true;
          isSigner: false;
        },
        {
          name: 'lpMintAuthority';
          isMut: false;
          isSigner: false;
        },
        {
          name: 'liqPoolStaderSolLeg';
          isMut: false;
          isSigner: false;
        },
        {
          name: 'liqPoolSolLegPda';
          isMut: true;
          isSigner: false;
        },
        {
          name: 'transferFrom';
          isMut: true;
          isSigner: true;
        },
        {
          name: 'mintTo';
          isMut: true;
          isSigner: false;
        },
        {
          name: 'systemProgram';
          isMut: false;
          isSigner: false;
        },
        {
          name: 'tokenProgram';
          isMut: false;
          isSigner: false;
        },
      ];
      args: [
        {
          name: 'lamports';
          type: 'u64';
        },
      ];
    },
    {
      name: 'removeLiquidity';
      accounts: [
        {
          name: 'state';
          isMut: true;
          isSigner: false;
        },
        {
          name: 'lpMint';
          isMut: true;
          isSigner: false;
        },
        {
          name: 'burnFrom';
          isMut: true;
          isSigner: false;
        },
        {
          name: 'burnFromAuthority';
          isMut: false;
          isSigner: true;
        },
        {
          name: 'transferSolTo';
          isMut: true;
          isSigner: false;
        },
        {
          name: 'transferStaderSolTo';
          isMut: true;
          isSigner: false;
        },
        {
          name: 'liqPoolSolLegPda';
          isMut: true;
          isSigner: false;
        },
        {
          name: 'liqPoolStaderSolLeg';
          isMut: true;
          isSigner: false;
        },
        {
          name: 'liqPoolStaderSolLegAuthority';
          isMut: false;
          isSigner: false;
        },
        {
          name: 'systemProgram';
          isMut: false;
          isSigner: false;
        },
        {
          name: 'tokenProgram';
          isMut: false;
          isSigner: false;
        },
      ];
      args: [
        {
          name: 'tokens';
          type: 'u64';
        },
      ];
    },
    {
      name: 'configLp';
      accounts: [
        {
          name: 'state';
          isMut: true;
          isSigner: false;
        },
        {
          name: 'adminAuthority';
          isMut: false;
          isSigner: true;
        },
      ];
      args: [
        {
          name: 'params';
          type: {
            defined: 'ConfigLpParams';
          };
        },
      ];
    },
    {
      name: 'configStader';
      accounts: [
        {
          name: 'state';
          isMut: true;
          isSigner: false;
        },
        {
          name: 'adminAuthority';
          isMut: false;
          isSigner: true;
        },
      ];
      args: [
        {
          name: 'params';
          type: {
            defined: 'ConfigStaderParams';
          };
        },
      ];
    },
    {
      name: 'updateStaderSolTokenMetadata';
      accounts: [
        {
          name: 'payer';
          isMut: true;
          isSigner: true;
        },
        {
          name: 'state';
          isMut: false;
          isSigner: false;
        },
        {
          name: 'staderSolMint';
          isMut: false;
          isSigner: false;
        },
        {
          name: 'staderSolMintAuthority';
          isMut: false;
          isSigner: false;
        },
        {
          name: 'staderSolMintMetadataAccount';
          isMut: true;
          isSigner: false;
        },
        {
          name: 'rent';
          isMut: false;
          isSigner: false;
          docs: ['Sysvar for token mint and ATA creation'];
        },
        {
          name: 'systemProgram';
          isMut: false;
          isSigner: false;
          docs: ['Program to create the position manager state account'];
        },
        {
          name: 'metadataProgram';
          isMut: false;
          isSigner: false;
          docs: ['Program to create NFT metadata'];
        },
      ];
      args: [
        {
          name: 'name';
          type: 'string';
        },
        {
          name: 'symbol';
          type: 'string';
        },
        {
          name: 'uri';
          type: 'string';
        },
      ];
    },
    {
      name: 'updateLpTokenMetadata';
      accounts: [
        {
          name: 'payer';
          isMut: true;
          isSigner: true;
        },
        {
          name: 'state';
          isMut: false;
          isSigner: false;
        },
        {
          name: 'lpMint';
          isMut: false;
          isSigner: false;
        },
        {
          name: 'lpMintAuthority';
          isMut: false;
          isSigner: false;
        },
        {
          name: 'lpMintMetadataAccount';
          isMut: true;
          isSigner: false;
        },
        {
          name: 'rent';
          isMut: false;
          isSigner: false;
          docs: ['Sysvar for token mint and ATA creation'];
        },
        {
          name: 'systemProgram';
          isMut: false;
          isSigner: false;
          docs: ['Program to create the position manager state account'];
        },
        {
          name: 'metadataProgram';
          isMut: false;
          isSigner: false;
          docs: ['Program to create NFT metadata'];
        },
      ];
      args: [
        {
          name: 'name';
          type: 'string';
        },
        {
          name: 'symbol';
          type: 'string';
        },
        {
          name: 'uri';
          type: 'string';
        },
      ];
    },
    {
      name: 'orderUnstake';
      accounts: [
        {
          name: 'state';
          isMut: true;
          isSigner: false;
        },
        {
          name: 'staderSolMint';
          isMut: true;
          isSigner: false;
        },
        {
          name: 'burnStaderSolFrom';
          isMut: true;
          isSigner: false;
        },
        {
          name: 'burnStaderSolAuthority';
          isMut: false;
          isSigner: true;
        },
        {
          name: 'newTicketAccount';
          isMut: true;
          isSigner: false;
        },
        {
          name: 'clock';
          isMut: false;
          isSigner: false;
        },
        {
          name: 'rent';
          isMut: false;
          isSigner: false;
        },
        {
          name: 'tokenProgram';
          isMut: false;
          isSigner: false;
        },
      ];
      args: [
        {
          name: 'staderSolAmount';
          type: 'u64';
        },
      ];
    },
    {
      name: 'claim';
      accounts: [
        {
          name: 'state';
          isMut: true;
          isSigner: false;
        },
        {
          name: 'reservePda';
          isMut: true;
          isSigner: false;
        },
        {
          name: 'ticketAccount';
          isMut: true;
          isSigner: false;
        },
        {
          name: 'transferSolTo';
          isMut: true;
          isSigner: false;
        },
        {
          name: 'clock';
          isMut: false;
          isSigner: false;
        },
        {
          name: 'systemProgram';
          isMut: false;
          isSigner: false;
        },
      ];
      args: [];
    },
    {
      name: 'stakeReserve';
      accounts: [
        {
          name: 'state';
          isMut: true;
          isSigner: false;
        },
        {
          name: 'validatorList';
          isMut: true;
          isSigner: false;
        },
        {
          name: 'stakeList';
          isMut: true;
          isSigner: false;
        },
        {
          name: 'validatorVote';
          isMut: true;
          isSigner: false;
        },
        {
          name: 'reservePda';
          isMut: true;
          isSigner: false;
        },
        {
          name: 'stakeAccount';
          isMut: true;
          isSigner: true;
        },
        {
          name: 'stakeDepositAuthority';
          isMut: false;
          isSigner: false;
        },
        {
          name: 'rentPayer';
          isMut: true;
          isSigner: true;
        },
        {
          name: 'clock';
          isMut: false;
          isSigner: false;
        },
        {
          name: 'epochSchedule';
          isMut: false;
          isSigner: false;
        },
        {
          name: 'rent';
          isMut: false;
          isSigner: false;
        },
        {
          name: 'stakeHistory';
          isMut: false;
          isSigner: false;
        },
        {
          name: 'stakeConfig';
          isMut: false;
          isSigner: false;
        },
        {
          name: 'systemProgram';
          isMut: false;
          isSigner: false;
        },
        {
          name: 'stakeProgram';
          isMut: false;
          isSigner: false;
        },
      ];
      args: [
        {
          name: 'validatorIndex';
          type: 'u32';
        },
      ];
    },
    {
      name: 'updateActive';
      accounts: [
        {
          name: 'state';
          isMut: true;
          isSigner: false;
        },
        {
          name: 'stakeList';
          isMut: true;
          isSigner: false;
        },
        {
          name: 'validatorList';
          isMut: true;
          isSigner: false;
        },
        {
          name: 'stakeAccount';
          isMut: true;
          isSigner: false;
        },
        {
          name: 'stakeWithdrawAuthority';
          isMut: false;
          isSigner: false;
        },
        {
          name: 'reservePda';
          isMut: true;
          isSigner: false;
        },
        {
          name: 'staderSolMint';
          isMut: true;
          isSigner: false;
        },
        {
          name: 'staderSolMintAuthority';
          isMut: false;
          isSigner: false;
        },
        {
          name: 'treasuryStaderSolAccount';
          isMut: true;
          isSigner: false;
        },
        {
          name: 'clock';
          isMut: false;
          isSigner: false;
        },
        {
          name: 'stakeHistory';
          isMut: false;
          isSigner: false;
        },
        {
          name: 'stakeProgram';
          isMut: false;
          isSigner: false;
        },
        {
          name: 'tokenProgram';
          isMut: false;
          isSigner: false;
        },
      ];
      args: [
        {
          name: 'stakeIndex';
          type: 'u32';
        },
        {
          name: 'validatorIndex';
          type: 'u32';
        },
      ];
    },
    {
      name: 'updateDeactivated';
      accounts: [
        {
          name: 'state';
          isMut: true;
          isSigner: false;
        },
        {
          name: 'stakeList';
          isMut: true;
          isSigner: false;
        },
        {
          name: 'stakeAccount';
          isMut: true;
          isSigner: false;
        },
        {
          name: 'stakeWithdrawAuthority';
          isMut: false;
          isSigner: false;
        },
        {
          name: 'reservePda';
          isMut: true;
          isSigner: false;
        },
        {
          name: 'staderSolMint';
          isMut: true;
          isSigner: false;
        },
        {
          name: 'staderSolMintAuthority';
          isMut: false;
          isSigner: false;
        },
        {
          name: 'treasuryStaderSolAccount';
          isMut: true;
          isSigner: false;
        },
        {
          name: 'operationalSolAccount';
          isMut: true;
          isSigner: false;
        },
        {
          name: 'clock';
          isMut: false;
          isSigner: false;
        },
        {
          name: 'stakeHistory';
          isMut: false;
          isSigner: false;
        },
        {
          name: 'stakeProgram';
          isMut: false;
          isSigner: false;
        },
        {
          name: 'tokenProgram';
          isMut: false;
          isSigner: false;
        },
        {
          name: 'systemProgram';
          isMut: false;
          isSigner: false;
        },
      ];
      args: [
        {
          name: 'stakeIndex';
          type: 'u32';
        },
      ];
    },
    {
      name: 'deactivateStake';
      accounts: [
        {
          name: 'state';
          isMut: true;
          isSigner: false;
        },
        {
          name: 'reservePda';
          isMut: false;
          isSigner: false;
        },
        {
          name: 'validatorList';
          isMut: true;
          isSigner: false;
        },
        {
          name: 'stakeList';
          isMut: true;
          isSigner: false;
        },
        {
          name: 'stakeAccount';
          isMut: true;
          isSigner: false;
        },
        {
          name: 'stakeDepositAuthority';
          isMut: false;
          isSigner: false;
        },
        {
          name: 'splitStakeAccount';
          isMut: true;
          isSigner: true;
        },
        {
          name: 'splitStakeRentPayer';
          isMut: true;
          isSigner: true;
        },
        {
          name: 'clock';
          isMut: false;
          isSigner: false;
        },
        {
          name: 'rent';
          isMut: false;
          isSigner: false;
        },
        {
          name: 'epochSchedule';
          isMut: false;
          isSigner: false;
        },
        {
          name: 'stakeHistory';
          isMut: false;
          isSigner: false;
        },
        {
          name: 'systemProgram';
          isMut: false;
          isSigner: false;
        },
        {
          name: 'stakeProgram';
          isMut: false;
          isSigner: false;
        },
      ];
      args: [
        {
          name: 'stakeIndex';
          type: 'u32';
        },
        {
          name: 'validatorIndex';
          type: 'u32';
        },
      ];
    },
    {
      name: 'emergencyUnstake';
      accounts: [
        {
          name: 'state';
          isMut: true;
          isSigner: false;
        },
        {
          name: 'validatorManagerAuthority';
          isMut: false;
          isSigner: true;
        },
        {
          name: 'validatorList';
          isMut: true;
          isSigner: false;
        },
        {
          name: 'stakeList';
          isMut: true;
          isSigner: false;
        },
        {
          name: 'stakeAccount';
          isMut: true;
          isSigner: false;
        },
        {
          name: 'stakeDepositAuthority';
          isMut: false;
          isSigner: false;
        },
        {
          name: 'clock';
          isMut: false;
          isSigner: false;
        },
        {
          name: 'stakeProgram';
          isMut: false;
          isSigner: false;
        },
      ];
      args: [
        {
          name: 'stakeIndex';
          type: 'u32';
        },
        {
          name: 'validatorIndex';
          type: 'u32';
        },
      ];
    },
    {
      name: 'partialUnstake';
      accounts: [
        {
          name: 'state';
          isMut: true;
          isSigner: false;
        },
        {
          name: 'validatorManagerAuthority';
          isMut: false;
          isSigner: true;
        },
        {
          name: 'validatorList';
          isMut: true;
          isSigner: false;
        },
        {
          name: 'stakeList';
          isMut: true;
          isSigner: false;
        },
        {
          name: 'stakeAccount';
          isMut: true;
          isSigner: false;
        },
        {
          name: 'stakeDepositAuthority';
          isMut: false;
          isSigner: false;
        },
        {
          name: 'reservePda';
          isMut: false;
          isSigner: false;
        },
        {
          name: 'splitStakeAccount';
          isMut: true;
          isSigner: true;
        },
        {
          name: 'splitStakeRentPayer';
          isMut: true;
          isSigner: true;
        },
        {
          name: 'clock';
          isMut: false;
          isSigner: false;
        },
        {
          name: 'rent';
          isMut: false;
          isSigner: false;
        },
        {
          name: 'stakeHistory';
          isMut: false;
          isSigner: false;
        },
        {
          name: 'systemProgram';
          isMut: false;
          isSigner: false;
        },
        {
          name: 'stakeProgram';
          isMut: false;
          isSigner: false;
        },
      ];
      args: [
        {
          name: 'stakeIndex';
          type: 'u32';
        },
        {
          name: 'validatorIndex';
          type: 'u32';
        },
        {
          name: 'desiredUnstakeAmount';
          type: 'u64';
        },
      ];
    },
    {
      name: 'mergeStakes';
      accounts: [
        {
          name: 'state';
          isMut: true;
          isSigner: false;
        },
        {
          name: 'stakeList';
          isMut: true;
          isSigner: false;
        },
        {
          name: 'validatorList';
          isMut: true;
          isSigner: false;
        },
        {
          name: 'destinationStake';
          isMut: true;
          isSigner: false;
        },
        {
          name: 'sourceStake';
          isMut: true;
          isSigner: false;
        },
        {
          name: 'stakeDepositAuthority';
          isMut: false;
          isSigner: false;
        },
        {
          name: 'stakeWithdrawAuthority';
          isMut: false;
          isSigner: false;
        },
        {
          name: 'operationalSolAccount';
          isMut: true;
          isSigner: false;
        },
        {
          name: 'clock';
          isMut: false;
          isSigner: false;
        },
        {
          name: 'stakeHistory';
          isMut: false;
          isSigner: false;
        },
        {
          name: 'stakeProgram';
          isMut: false;
          isSigner: false;
        },
      ];
      args: [
        {
          name: 'destinationStakeIndex';
          type: 'u32';
        },
        {
          name: 'sourceStakeIndex';
          type: 'u32';
        },
        {
          name: 'validatorIndex';
          type: 'u32';
        },
      ];
    },
    {
      name: 'redelegate';
      accounts: [
        {
          name: 'state';
          isMut: true;
          isSigner: false;
        },
        {
          name: 'validatorList';
          isMut: true;
          isSigner: false;
        },
        {
          name: 'stakeList';
          isMut: true;
          isSigner: false;
        },
        {
          name: 'stakeAccount';
          isMut: true;
          isSigner: false;
        },
        {
          name: 'stakeDepositAuthority';
          isMut: false;
          isSigner: false;
        },
        {
          name: 'reservePda';
          isMut: false;
          isSigner: false;
        },
        {
          name: 'splitStakeAccount';
          isMut: true;
          isSigner: true;
        },
        {
          name: 'splitStakeRentPayer';
          isMut: true;
          isSigner: true;
        },
        {
          name: 'destValidatorAccount';
          isMut: false;
          isSigner: false;
        },
        {
          name: 'redelegateStakeAccount';
          isMut: true;
          isSigner: true;
        },
        {
          name: 'clock';
          isMut: false;
          isSigner: false;
        },
        {
          name: 'stakeHistory';
          isMut: false;
          isSigner: false;
        },
        {
          name: 'stakeConfig';
          isMut: false;
          isSigner: false;
        },
        {
          name: 'systemProgram';
          isMut: false;
          isSigner: false;
        },
        {
          name: 'stakeProgram';
          isMut: false;
          isSigner: false;
        },
      ];
      args: [
        {
          name: 'stakeIndex';
          type: 'u32';
        },
        {
          name: 'sourceValidatorIndex';
          type: 'u32';
        },
        {
          name: 'destValidatorIndex';
          type: 'u32';
        },
      ];
    },
    {
      name: 'pause';
      accounts: [
        {
          name: 'state';
          isMut: true;
          isSigner: false;
        },
        {
          name: 'pauseAuthority';
          isMut: false;
          isSigner: true;
        },
      ];
      args: [];
    },
    {
      name: 'resume';
      accounts: [
        {
          name: 'state';
          isMut: true;
          isSigner: false;
        },
        {
          name: 'pauseAuthority';
          isMut: false;
          isSigner: true;
        },
      ];
      args: [];
    },
    {
      name: 'withdrawStakeAccount';
      accounts: [
        {
          name: 'state';
          isMut: true;
          isSigner: false;
        },
        {
          name: 'staderSolMint';
          isMut: true;
          isSigner: false;
        },
        {
          name: 'burnStaderSolFrom';
          isMut: true;
          isSigner: false;
        },
        {
          name: 'burnStaderSolAuthority';
          isMut: true;
          isSigner: true;
        },
        {
          name: 'treasuryStaderSolAccount';
          isMut: true;
          isSigner: false;
        },
        {
          name: 'validatorList';
          isMut: true;
          isSigner: false;
        },
        {
          name: 'stakeList';
          isMut: true;
          isSigner: false;
        },
        {
          name: 'stakeWithdrawAuthority';
          isMut: false;
          isSigner: false;
        },
        {
          name: 'stakeDepositAuthority';
          isMut: false;
          isSigner: false;
        },
        {
          name: 'stakeAccount';
          isMut: true;
          isSigner: false;
        },
        {
          name: 'splitStakeAccount';
          isMut: true;
          isSigner: true;
        },
        {
          name: 'splitStakeRentPayer';
          isMut: true;
          isSigner: true;
        },
        {
          name: 'clock';
          isMut: false;
          isSigner: false;
        },
        {
          name: 'systemProgram';
          isMut: false;
          isSigner: false;
        },
        {
          name: 'tokenProgram';
          isMut: false;
          isSigner: false;
        },
        {
          name: 'stakeProgram';
          isMut: false;
          isSigner: false;
        },
      ];
      args: [
        {
          name: 'stakeIndex';
          type: 'u32';
        },
        {
          name: 'validatorIndex';
          type: 'u32';
        },
        {
          name: 'staderSolAmount';
          type: 'u64';
        },
        {
          name: 'beneficiary';
          type: 'publicKey';
        },
      ];
    },
    {
      name: 'reallocValidatorList';
      accounts: [
        {
          name: 'state';
          isMut: true;
          isSigner: false;
        },
        {
          name: 'adminAuthority';
          isMut: false;
          isSigner: true;
        },
        {
          name: 'validatorList';
          isMut: true;
          isSigner: false;
        },
        {
          name: 'rentFunds';
          isMut: true;
          isSigner: true;
        },
        {
          name: 'systemProgram';
          isMut: false;
          isSigner: false;
        },
      ];
      args: [
        {
          name: 'capacity';
          type: 'u32';
        },
      ];
    },
    {
      name: 'reallocStakeList';
      accounts: [
        {
          name: 'state';
          isMut: true;
          isSigner: false;
        },
        {
          name: 'adminAuthority';
          isMut: false;
          isSigner: true;
        },
        {
          name: 'stakeList';
          isMut: true;
          isSigner: false;
        },
        {
          name: 'rentFunds';
          isMut: true;
          isSigner: true;
        },
        {
          name: 'systemProgram';
          isMut: false;
          isSigner: false;
        },
      ];
      args: [
        {
          name: 'capacity';
          type: 'u32';
        },
      ];
    },
  ];
  accounts: [
    {
      name: 'ticketAccountData';
      type: {
        kind: 'struct';
        fields: [
          {
            name: 'stateAddress';
            type: 'publicKey';
          },
          {
            name: 'beneficiary';
            type: 'publicKey';
          },
          {
            name: 'lamportsAmount';
            type: 'u64';
          },
          {
            name: 'createdEpoch';
            type: 'u64';
          },
        ];
      };
    },
    {
      name: 'state';
      type: {
        kind: 'struct';
        fields: [
          {
            name: 'staderSolMint';
            type: 'publicKey';
          },
          {
            name: 'adminAuthority';
            type: 'publicKey';
          },
          {
            name: 'operationalSolAccount';
            type: 'publicKey';
          },
          {
            name: 'treasuryStaderSolAccount';
            type: 'publicKey';
          },
          {
            name: 'reserveBumpSeed';
            type: 'u8';
          },
          {
            name: 'staderSolMintAuthorityBumpSeed';
            type: 'u8';
          },
          {
            name: 'rentExemptForTokenAcc';
            type: 'u64';
          },
          {
            name: 'rewardFee';
            type: {
              defined: 'Fee';
            };
          },
          {
            name: 'stakeSystem';
            type: {
              defined: 'StakeSystem';
            };
          },
          {
            name: 'validatorSystem';
            type: {
              defined: 'ValidatorSystem';
            };
          },
          {
            name: 'liqPool';
            type: {
              defined: 'LiqPool';
            };
          },
          {
            name: 'availableReserveBalance';
            type: 'u64';
          },
          {
            name: 'staderSolSupply';
            type: 'u64';
          },
          {
            name: 'staderSolPrice';
            type: 'u64';
          },
          {
            name: 'circulatingTicketCount';
            docs: ['count tickets for delayed-unstake'];
            type: 'u64';
          },
          {
            name: 'circulatingTicketBalance';
            docs: [
              'total lamports amount of generated and not claimed yet tickets',
            ];
            type: 'u64';
          },
          {
            name: 'lentFromReserve';
            type: 'u64';
          },
          {
            name: 'minDeposit';
            type: 'u64';
          },
          {
            name: 'minWithdraw';
            type: 'u64';
          },
          {
            name: 'stakingSolCap';
            type: 'u64';
          },
          {
            name: 'emergencyCoolingDown';
            type: 'u64';
          },
          {
            name: 'pauseAuthority';
            docs: ['emergency pause'];
            type: 'publicKey';
          },
          {
            name: 'paused';
            type: 'bool';
          },
          {
            name: 'delayedUnstakeFee';
            type: {
              defined: 'FeeCents';
            };
          },
          {
            name: 'withdrawStakeAccountFee';
            type: {
              defined: 'FeeCents';
            };
          },
          {
            name: 'withdrawStakeAccountEnabled';
            type: 'bool';
          },
          {
            name: 'lastStakeMoveEpoch';
            type: 'u64';
          },
          {
            name: 'stakeMoved';
            type: 'u64';
          },
          {
            name: 'maxStakeMovedPerEpoch';
            type: {
              defined: 'Fee';
            };
          },
        ];
      };
    },
  ];
  types: [
    {
      name: 'SplitStakeAccountInfo';
      type: {
        kind: 'struct';
        fields: [
          {
            name: 'account';
            type: 'publicKey';
          },
          {
            name: 'index';
            type: 'u32';
          },
        ];
      };
    },
    {
      name: 'U64ValueChange';
      type: {
        kind: 'struct';
        fields: [
          {
            name: 'old';
            type: 'u64';
          },
          {
            name: 'new';
            type: 'u64';
          },
        ];
      };
    },
    {
      name: 'U32ValueChange';
      type: {
        kind: 'struct';
        fields: [
          {
            name: 'old';
            type: 'u32';
          },
          {
            name: 'new';
            type: 'u32';
          },
        ];
      };
    },
    {
      name: 'FeeValueChange';
      type: {
        kind: 'struct';
        fields: [
          {
            name: 'old';
            type: {
              defined: 'Fee';
            };
          },
          {
            name: 'new';
            type: {
              defined: 'Fee';
            };
          },
        ];
      };
    },
    {
      name: 'FeeCentsValueChange';
      type: {
        kind: 'struct';
        fields: [
          {
            name: 'old';
            type: {
              defined: 'FeeCents';
            };
          },
          {
            name: 'new';
            type: {
              defined: 'FeeCents';
            };
          },
        ];
      };
    },
    {
      name: 'PubkeyValueChange';
      type: {
        kind: 'struct';
        fields: [
          {
            name: 'old';
            type: 'publicKey';
          },
          {
            name: 'new';
            type: 'publicKey';
          },
        ];
      };
    },
    {
      name: 'BoolValueChange';
      type: {
        kind: 'struct';
        fields: [
          {
            name: 'old';
            type: 'bool';
          },
          {
            name: 'new';
            type: 'bool';
          },
        ];
      };
    },
    {
      name: 'ChangeAuthorityData';
      type: {
        kind: 'struct';
        fields: [
          {
            name: 'admin';
            type: {
              option: 'publicKey';
            };
          },
          {
            name: 'validatorManager';
            type: {
              option: 'publicKey';
            };
          },
          {
            name: 'operationalSolAccount';
            type: {
              option: 'publicKey';
            };
          },
          {
            name: 'treasuryStaderSolAccount';
            type: {
              option: 'publicKey';
            };
          },
          {
            name: 'pauseAuthority';
            type: {
              option: 'publicKey';
            };
          },
        ];
      };
    },
    {
      name: 'ConfigLpParams';
      type: {
        kind: 'struct';
        fields: [
          {
            name: 'minFee';
            type: {
              option: {
                defined: 'Fee';
              };
            };
          },
          {
            name: 'maxFee';
            type: {
              option: {
                defined: 'Fee';
              };
            };
          },
          {
            name: 'liquidityTarget';
            type: {
              option: 'u64';
            };
          },
          {
            name: 'treasuryCut';
            type: {
              option: {
                defined: 'Fee';
              };
            };
          },
        ];
      };
    },
    {
      name: 'ConfigStaderParams';
      type: {
        kind: 'struct';
        fields: [
          {
            name: 'rewardsFee';
            type: {
              option: {
                defined: 'Fee';
              };
            };
          },
          {
            name: 'slotsForStakeDelta';
            type: {
              option: 'u64';
            };
          },
          {
            name: 'minStake';
            type: {
              option: 'u64';
            };
          },
          {
            name: 'minDeposit';
            type: {
              option: 'u64';
            };
          },
          {
            name: 'minWithdraw';
            type: {
              option: 'u64';
            };
          },
          {
            name: 'stakingSolCap';
            type: {
              option: 'u64';
            };
          },
          {
            name: 'liquiditySolCap';
            type: {
              option: 'u64';
            };
          },
          {
            name: 'withdrawStakeAccountEnabled';
            type: {
              option: 'bool';
            };
          },
          {
            name: 'delayedUnstakeFee';
            type: {
              option: {
                defined: 'FeeCents';
              };
            };
          },
          {
            name: 'withdrawStakeAccountFee';
            type: {
              option: {
                defined: 'FeeCents';
              };
            };
          },
          {
            name: 'maxStakeMovedPerEpoch';
            type: {
              option: {
                defined: 'Fee';
              };
            };
          },
        ];
      };
    },
    {
      name: 'InitializeData';
      type: {
        kind: 'struct';
        fields: [
          {
            name: 'adminAuthority';
            type: 'publicKey';
          },
          {
            name: 'validatorManagerAuthority';
            type: 'publicKey';
          },
          {
            name: 'minStake';
            type: 'u64';
          },
          {
            name: 'rewardsFee';
            type: {
              defined: 'Fee';
            };
          },
          {
            name: 'liqPool';
            type: {
              defined: 'LiqPoolInitializeData';
            };
          },
          {
            name: 'additionalStakeRecordSpace';
            type: 'u32';
          },
          {
            name: 'additionalValidatorRecordSpace';
            type: 'u32';
          },
          {
            name: 'slotsForStakeDelta';
            type: 'u64';
          },
          {
            name: 'pauseAuthority';
            type: 'publicKey';
          },
        ];
      };
    },
    {
      name: 'LiqPoolInitializeData';
      type: {
        kind: 'struct';
        fields: [
          {
            name: 'lpLiquidityTarget';
            type: 'u64';
          },
          {
            name: 'lpMaxFee';
            type: {
              defined: 'Fee';
            };
          },
          {
            name: 'lpMinFee';
            type: {
              defined: 'Fee';
            };
          },
          {
            name: 'lpTreasuryCut';
            type: {
              defined: 'Fee';
            };
          },
        ];
      };
    },
    {
      name: 'Fee';
      type: {
        kind: 'struct';
        fields: [
          {
            name: 'basisPoints';
            type: 'u32';
          },
        ];
      };
    },
    {
      name: 'FeeCents';
      docs: [
        'FeeCents, same as Fee but / 1_000_000 instead of 10_000',
        '1 FeeCent = 0.0001%, 10_000 FeeCent = 1%, 1_000_000 FeeCent = 100%',
      ];
      type: {
        kind: 'struct';
        fields: [
          {
            name: 'bpCents';
            type: 'u32';
          },
        ];
      };
    },
    {
      name: 'LiqPool';
      type: {
        kind: 'struct';
        fields: [
          {
            name: 'lpMint';
            type: 'publicKey';
          },
          {
            name: 'lpMintAuthorityBumpSeed';
            type: 'u8';
          },
          {
            name: 'solLegBumpSeed';
            type: 'u8';
          },
          {
            name: 'staderSolLegAuthorityBumpSeed';
            type: 'u8';
          },
          {
            name: 'staderSolLeg';
            type: 'publicKey';
          },
          {
            name: 'lpLiquidityTarget';
            docs: [
              'Liquidity target. If the Liquidity reach this amount, the fee reaches lp_min_discount_fee',
            ];
            type: 'u64';
          },
          {
            name: 'lpMaxFee';
            docs: ['Liquidity pool max fee'];
            type: {
              defined: 'Fee';
            };
          },
          {
            name: 'lpMinFee';
            docs: ['SOL/staderSOL Liquidity pool min fee'];
            type: {
              defined: 'Fee';
            };
          },
          {
            name: 'treasuryCut';
            docs: ['Treasury cut'];
            type: {
              defined: 'Fee';
            };
          },
          {
            name: 'lpSupply';
            type: 'u64';
          },
          {
            name: 'lentFromSolLeg';
            type: 'u64';
          },
          {
            name: 'liquiditySolCap';
            type: 'u64';
          },
        ];
      };
    },
    {
      name: 'List';
      type: {
        kind: 'struct';
        fields: [
          {
            name: 'account';
            type: 'publicKey';
          },
          {
            name: 'itemSize';
            type: 'u32';
          },
          {
            name: 'count';
            type: 'u32';
          },
          {
            name: 'reserved1';
            type: 'publicKey';
          },
          {
            name: 'reserved2';
            type: 'u32';
          },
        ];
      };
    },
    {
      name: 'StakeRecord';
      type: {
        kind: 'struct';
        fields: [
          {
            name: 'stakeAccount';
            type: 'publicKey';
          },
          {
            name: 'lastUpdateDelegatedLamports';
            type: 'u64';
          },
          {
            name: 'lastUpdateEpoch';
            type: 'u64';
          },
          {
            name: 'isEmergencyUnstaking';
            type: 'u8';
          },
        ];
      };
    },
    {
      name: 'StakeList';
      type: {
        kind: 'struct';
        fields: [];
      };
    },
    {
      name: 'StakeSystem';
      type: {
        kind: 'struct';
        fields: [
          {
            name: 'stakeList';
            type: {
              defined: 'List';
            };
          },
          {
            name: 'delayedUnstakeCoolingDown';
            type: 'u64';
          },
          {
            name: 'stakeDepositBumpSeed';
            type: 'u8';
          },
          {
            name: 'stakeWithdrawBumpSeed';
            type: 'u8';
          },
          {
            name: 'slotsForStakeDelta';
            docs: [
              'set by admin, how much slots before the end of the epoch, stake-delta can start',
            ];
            type: 'u64';
          },
          {
            name: 'lastStakeDeltaEpoch';
            docs: [
              'Marks the start of stake-delta operations, meaning that if somebody starts a delayed-unstake ticket',
              'after this var is set with epoch_num the ticket will have epoch_created = current_epoch+1',
              '(the user must wait one more epoch, because their unstake-delta will be execute in this epoch)',
            ];
            type: 'u64';
          },
          {
            name: 'minStake';
            type: 'u64';
          },
          {
            name: 'extraStakeDeltaRuns';
            docs: [
              'can be set by validator-manager-auth to allow a second run of stake-delta to stake late stakers in the last minute of the epoch',
              "so we maximize user's rewards",
            ];
            type: 'u32';
          },
        ];
      };
    },
    {
      name: 'ValidatorRecord';
      type: {
        kind: 'struct';
        fields: [
          {
            name: 'validatorAccount';
            docs: ['Validator vote pubkey'];
            type: 'publicKey';
          },
          {
            name: 'activeBalance';
            docs: ['Validator total balance in lamports'];
            type: 'u64';
          },
          {
            name: 'score';
            type: 'u32';
          },
          {
            name: 'lastStakeDeltaEpoch';
            type: 'u64';
          },
          {
            name: 'duplicationFlagBumpSeed';
            type: 'u8';
          },
        ];
      };
    },
    {
      name: 'ValidatorList';
      type: {
        kind: 'struct';
        fields: [];
      };
    },
    {
      name: 'ValidatorSystem';
      type: {
        kind: 'struct';
        fields: [
          {
            name: 'validatorList';
            type: {
              defined: 'List';
            };
          },
          {
            name: 'managerAuthority';
            type: 'publicKey';
          },
          {
            name: 'totalValidatorScore';
            type: 'u32';
          },
          {
            name: 'totalActiveBalance';
            docs: ['sum of all active lamports staked'];
            type: 'u64';
          },
          {
            name: 'autoAddValidatorEnabled';
            docs: ['DEPRECATED, no longer used'];
            type: 'u8';
          },
        ];
      };
    },
  ];
  events: [
    {
      name: 'ChangeAuthorityEvent';
      fields: [
        {
          name: 'state';
          type: 'publicKey';
          index: false;
        },
        {
          name: 'adminChange';
          type: {
            option: {
              defined: 'PubkeyValueChange';
            };
          };
          index: false;
        },
        {
          name: 'validatorManagerChange';
          type: {
            option: {
              defined: 'PubkeyValueChange';
            };
          };
          index: false;
        },
        {
          name: 'operationalSolAccountChange';
          type: {
            option: {
              defined: 'PubkeyValueChange';
            };
          };
          index: false;
        },
        {
          name: 'treasuryStaderSolAccountChange';
          type: {
            option: {
              defined: 'PubkeyValueChange';
            };
          };
          index: false;
        },
        {
          name: 'pauseAuthorityChange';
          type: {
            option: {
              defined: 'PubkeyValueChange';
            };
          };
          index: false;
        },
      ];
    },
    {
      name: 'ConfigLpEvent';
      fields: [
        {
          name: 'state';
          type: 'publicKey';
          index: false;
        },
        {
          name: 'minFeeChange';
          type: {
            option: {
              defined: 'FeeValueChange';
            };
          };
          index: false;
        },
        {
          name: 'maxFeeChange';
          type: {
            option: {
              defined: 'FeeValueChange';
            };
          };
          index: false;
        },
        {
          name: 'liquidityTargetChange';
          type: {
            option: {
              defined: 'U64ValueChange';
            };
          };
          index: false;
        },
        {
          name: 'treasuryCutChange';
          type: {
            option: {
              defined: 'FeeValueChange';
            };
          };
          index: false;
        },
      ];
    },
    {
      name: 'ConfigStaderLiquidStakingEvent';
      fields: [
        {
          name: 'state';
          type: 'publicKey';
          index: false;
        },
        {
          name: 'rewardsFeeChange';
          type: {
            option: {
              defined: 'FeeValueChange';
            };
          };
          index: false;
        },
        {
          name: 'slotsForStakeDeltaChange';
          type: {
            option: {
              defined: 'U64ValueChange';
            };
          };
          index: false;
        },
        {
          name: 'minStakeChange';
          type: {
            option: {
              defined: 'U64ValueChange';
            };
          };
          index: false;
        },
        {
          name: 'minDepositChange';
          type: {
            option: {
              defined: 'U64ValueChange';
            };
          };
          index: false;
        },
        {
          name: 'minWithdrawChange';
          type: {
            option: {
              defined: 'U64ValueChange';
            };
          };
          index: false;
        },
        {
          name: 'stakingSolCapChange';
          type: {
            option: {
              defined: 'U64ValueChange';
            };
          };
          index: false;
        },
        {
          name: 'liquiditySolCapChange';
          type: {
            option: {
              defined: 'U64ValueChange';
            };
          };
          index: false;
        },
        {
          name: 'withdrawStakeAccountEnabledChange';
          type: {
            option: {
              defined: 'BoolValueChange';
            };
          };
          index: false;
        },
        {
          name: 'delayedUnstakeFeeChange';
          type: {
            option: {
              defined: 'FeeCentsValueChange';
            };
          };
          index: false;
        },
        {
          name: 'withdrawStakeAccountFeeChange';
          type: {
            option: {
              defined: 'FeeCentsValueChange';
            };
          };
          index: false;
        },
        {
          name: 'maxStakeMovedPerEpochChange';
          type: {
            option: {
              defined: 'FeeValueChange';
            };
          };
          index: false;
        },
      ];
    },
    {
      name: 'InitializeEvent';
      fields: [
        {
          name: 'state';
          type: 'publicKey';
          index: false;
        },
        {
          name: 'params';
          type: {
            defined: 'InitializeData';
          };
          index: false;
        },
        {
          name: 'stakeList';
          type: 'publicKey';
          index: false;
        },
        {
          name: 'validatorList';
          type: 'publicKey';
          index: false;
        },
        {
          name: 'staderSolMint';
          type: 'publicKey';
          index: false;
        },
        {
          name: 'operationalSolAccount';
          type: 'publicKey';
          index: false;
        },
        {
          name: 'lpMint';
          type: 'publicKey';
          index: false;
        },
        {
          name: 'lpStaderSolLeg';
          type: 'publicKey';
          index: false;
        },
        {
          name: 'treasuryStaderSolAccount';
          type: 'publicKey';
          index: false;
        },
      ];
    },
    {
      name: 'EmergencyPauseEvent';
      fields: [
        {
          name: 'state';
          type: 'publicKey';
          index: false;
        },
      ];
    },
    {
      name: 'ResumeEvent';
      fields: [
        {
          name: 'state';
          type: 'publicKey';
          index: false;
        },
      ];
    },
    {
      name: 'ReallocValidatorListEvent';
      fields: [
        {
          name: 'state';
          type: 'publicKey';
          index: false;
        },
        {
          name: 'count';
          type: 'u32';
          index: false;
        },
        {
          name: 'newCapacity';
          type: 'u32';
          index: false;
        },
      ];
    },
    {
      name: 'ReallocStakeListEvent';
      fields: [
        {
          name: 'state';
          type: 'publicKey';
          index: false;
        },
        {
          name: 'count';
          type: 'u32';
          index: false;
        },
        {
          name: 'newCapacity';
          type: 'u32';
          index: false;
        },
      ];
    },
    {
      name: 'DeactivateStakeEvent';
      fields: [
        {
          name: 'state';
          type: 'publicKey';
          index: false;
        },
        {
          name: 'epoch';
          type: 'u64';
          index: false;
        },
        {
          name: 'stakeIndex';
          type: 'u32';
          index: false;
        },
        {
          name: 'stakeAccount';
          type: 'publicKey';
          index: false;
        },
        {
          name: 'lastUpdateStakeDelegation';
          type: 'u64';
          index: false;
        },
        {
          name: 'splitStakeAccount';
          type: {
            option: {
              defined: 'SplitStakeAccountInfo';
            };
          };
          index: false;
        },
        {
          name: 'validatorIndex';
          type: 'u32';
          index: false;
        },
        {
          name: 'validatorVote';
          type: 'publicKey';
          index: false;
        },
        {
          name: 'totalStakeTarget';
          type: 'u64';
          index: false;
        },
        {
          name: 'validatorStakeTarget';
          type: 'u64';
          index: false;
        },
        {
          name: 'totalActiveBalance';
          type: 'u64';
          index: false;
        },
        {
          name: 'delayedUnstakeCoolingDown';
          type: 'u64';
          index: false;
        },
        {
          name: 'validatorActiveBalance';
          type: 'u64';
          index: false;
        },
        {
          name: 'totalUnstakeDelta';
          type: 'u64';
          index: false;
        },
        {
          name: 'unstakedAmount';
          type: 'u64';
          index: false;
        },
      ];
    },
    {
      name: 'MergeStakesEvent';
      fields: [
        {
          name: 'state';
          type: 'publicKey';
          index: false;
        },
        {
          name: 'epoch';
          type: 'u64';
          index: false;
        },
        {
          name: 'destinationStakeIndex';
          type: 'u32';
          index: false;
        },
        {
          name: 'destinationStakeAccount';
          type: 'publicKey';
          index: false;
        },
        {
          name: 'lastUpdateDestinationStakeDelegation';
          type: 'u64';
          index: false;
        },
        {
          name: 'sourceStakeIndex';
          type: 'u32';
          index: false;
        },
        {
          name: 'sourceStakeAccount';
          type: 'publicKey';
          index: false;
        },
        {
          name: 'lastUpdateSourceStakeDelegation';
          type: 'u64';
          index: false;
        },
        {
          name: 'validatorIndex';
          type: 'u32';
          index: false;
        },
        {
          name: 'validatorVote';
          type: 'publicKey';
          index: false;
        },
        {
          name: 'extraDelegated';
          type: 'u64';
          index: false;
        },
        {
          name: 'returnedStakeRent';
          type: 'u64';
          index: false;
        },
        {
          name: 'validatorActiveBalance';
          type: 'u64';
          index: false;
        },
        {
          name: 'totalActiveBalance';
          type: 'u64';
          index: false;
        },
        {
          name: 'operationalSolBalance';
          type: 'u64';
          index: false;
        },
      ];
    },
    {
      name: 'RedelegateEvent';
      fields: [
        {
          name: 'state';
          type: 'publicKey';
          index: false;
        },
        {
          name: 'epoch';
          type: 'u64';
          index: false;
        },
        {
          name: 'stakeIndex';
          type: 'u32';
          index: false;
        },
        {
          name: 'stakeAccount';
          type: 'publicKey';
          index: false;
        },
        {
          name: 'lastUpdateDelegation';
          type: 'u64';
          index: false;
        },
        {
          name: 'sourceValidatorIndex';
          type: 'u32';
          index: false;
        },
        {
          name: 'sourceValidatorVote';
          type: 'publicKey';
          index: false;
        },
        {
          name: 'sourceValidatorScore';
          type: 'u32';
          index: false;
        },
        {
          name: 'sourceValidatorBalance';
          type: 'u64';
          index: false;
        },
        {
          name: 'sourceValidatorStakeTarget';
          type: 'u64';
          index: false;
        },
        {
          name: 'destValidatorIndex';
          type: 'u32';
          index: false;
        },
        {
          name: 'destValidatorVote';
          type: 'publicKey';
          index: false;
        },
        {
          name: 'destValidatorScore';
          type: 'u32';
          index: false;
        },
        {
          name: 'destValidatorBalance';
          type: 'u64';
          index: false;
        },
        {
          name: 'destValidatorStakeTarget';
          type: 'u64';
          index: false;
        },
        {
          name: 'redelegateAmount';
          type: 'u64';
          index: false;
        },
        {
          name: 'splitStakeAccount';
          type: {
            option: {
              defined: 'SplitStakeAccountInfo';
            };
          };
          index: false;
        },
        {
          name: 'redelegateStakeIndex';
          type: 'u32';
          index: false;
        },
        {
          name: 'redelegateStakeAccount';
          type: 'publicKey';
          index: false;
        },
      ];
    },
    {
      name: 'StakeReserveEvent';
      fields: [
        {
          name: 'state';
          type: 'publicKey';
          index: false;
        },
        {
          name: 'epoch';
          type: 'u64';
          index: false;
        },
        {
          name: 'stakeIndex';
          type: 'u32';
          index: false;
        },
        {
          name: 'stakeAccount';
          type: 'publicKey';
          index: false;
        },
        {
          name: 'validatorIndex';
          type: 'u32';
          index: false;
        },
        {
          name: 'validatorVote';
          type: 'publicKey';
          index: false;
        },
        {
          name: 'totalStakeTarget';
          type: 'u64';
          index: false;
        },
        {
          name: 'validatorStakeTarget';
          type: 'u64';
          index: false;
        },
        {
          name: 'reserveBalance';
          type: 'u64';
          index: false;
        },
        {
          name: 'totalActiveBalance';
          type: 'u64';
          index: false;
        },
        {
          name: 'validatorActiveBalance';
          type: 'u64';
          index: false;
        },
        {
          name: 'totalStakeDelta';
          type: 'u64';
          index: false;
        },
        {
          name: 'amount';
          type: 'u64';
          index: false;
        },
      ];
    },
    {
      name: 'UpdateActiveEvent';
      fields: [
        {
          name: 'state';
          type: 'publicKey';
          index: false;
        },
        {
          name: 'epoch';
          type: 'u64';
          index: false;
        },
        {
          name: 'stakeIndex';
          type: 'u32';
          index: false;
        },
        {
          name: 'stakeAccount';
          type: 'publicKey';
          index: false;
        },
        {
          name: 'validatorIndex';
          type: 'u32';
          index: false;
        },
        {
          name: 'validatorVote';
          type: 'publicKey';
          index: false;
        },
        {
          name: 'delegationChange';
          type: {
            defined: 'U64ValueChange';
          };
          index: false;
        },
        {
          name: 'delegationGrowthStaderSolFees';
          type: {
            option: 'u64';
          };
          index: false;
        },
        {
          name: 'extraLamports';
          type: 'u64';
          index: false;
        },
        {
          name: 'extraStaderSolFees';
          type: {
            option: 'u64';
          };
          index: false;
        },
        {
          name: 'validatorActiveBalance';
          type: 'u64';
          index: false;
        },
        {
          name: 'totalActiveBalance';
          type: 'u64';
          index: false;
        },
        {
          name: 'staderSolPriceChange';
          type: {
            defined: 'U64ValueChange';
          };
          index: false;
        },
        {
          name: 'rewardFeeUsed';
          type: {
            defined: 'Fee';
          };
          index: false;
        },
        {
          name: 'totalVirtualStakedLamports';
          type: 'u64';
          index: false;
        },
        {
          name: 'staderSolSupply';
          type: 'u64';
          index: false;
        },
      ];
    },
    {
      name: 'UpdateDeactivatedEvent';
      fields: [
        {
          name: 'state';
          type: 'publicKey';
          index: false;
        },
        {
          name: 'epoch';
          type: 'u64';
          index: false;
        },
        {
          name: 'stakeIndex';
          type: 'u32';
          index: false;
        },
        {
          name: 'stakeAccount';
          type: 'publicKey';
          index: false;
        },
        {
          name: 'balanceWithoutRentExempt';
          type: 'u64';
          index: false;
        },
        {
          name: 'lastUpdateDelegatedLamports';
          type: 'u64';
          index: false;
        },
        {
          name: 'staderSolFees';
          type: {
            option: 'u64';
          };
          index: false;
        },
        {
          name: 'staderSolPriceChange';
          type: {
            defined: 'U64ValueChange';
          };
          index: false;
        },
        {
          name: 'rewardFeeUsed';
          type: {
            defined: 'Fee';
          };
          index: false;
        },
        {
          name: 'operationalSolBalance';
          type: 'u64';
          index: false;
        },
        {
          name: 'totalVirtualStakedLamports';
          type: 'u64';
          index: false;
        },
        {
          name: 'staderSolSupply';
          type: 'u64';
          index: false;
        },
      ];
    },
    {
      name: 'ClaimEvent';
      fields: [
        {
          name: 'state';
          type: 'publicKey';
          index: false;
        },
        {
          name: 'epoch';
          type: 'u64';
          index: false;
        },
        {
          name: 'ticket';
          type: 'publicKey';
          index: false;
        },
        {
          name: 'beneficiary';
          type: 'publicKey';
          index: false;
        },
        {
          name: 'circulatingTicketBalance';
          type: 'u64';
          index: false;
        },
        {
          name: 'circulatingTicketCount';
          type: 'u64';
          index: false;
        },
        {
          name: 'reserveBalance';
          type: 'u64';
          index: false;
        },
        {
          name: 'userBalance';
          type: 'u64';
          index: false;
        },
        {
          name: 'amount';
          type: 'u64';
          index: false;
        },
      ];
    },
    {
      name: 'OrderUnstakeEvent';
      fields: [
        {
          name: 'state';
          type: 'publicKey';
          index: false;
        },
        {
          name: 'ticketEpoch';
          type: 'u64';
          index: false;
        },
        {
          name: 'ticket';
          type: 'publicKey';
          index: false;
        },
        {
          name: 'beneficiary';
          type: 'publicKey';
          index: false;
        },
        {
          name: 'circulatingTicketBalance';
          type: 'u64';
          index: false;
        },
        {
          name: 'circulatingTicketCount';
          type: 'u64';
          index: false;
        },
        {
          name: 'userStaderSolBalance';
          type: 'u64';
          index: false;
        },
        {
          name: 'burnedStaderSolAmount';
          type: 'u64';
          index: false;
        },
        {
          name: 'solAmount';
          type: 'u64';
          index: false;
        },
        {
          name: 'feeBpCents';
          type: 'u32';
          index: false;
        },
        {
          name: 'totalVirtualStakedLamports';
          type: 'u64';
          index: false;
        },
        {
          name: 'staderSolSupply';
          type: 'u64';
          index: false;
        },
      ];
    },
    {
      name: 'AddLiquidityEvent';
      fields: [
        {
          name: 'state';
          type: 'publicKey';
          index: false;
        },
        {
          name: 'solOwner';
          type: 'publicKey';
          index: false;
        },
        {
          name: 'userSolBalance';
          type: 'u64';
          index: false;
        },
        {
          name: 'userLpBalance';
          type: 'u64';
          index: false;
        },
        {
          name: 'solLegBalance';
          type: 'u64';
          index: false;
        },
        {
          name: 'lpSupply';
          type: 'u64';
          index: false;
        },
        {
          name: 'solAddedAmount';
          type: 'u64';
          index: false;
        },
        {
          name: 'lpMinted';
          type: 'u64';
          index: false;
        },
        {
          name: 'totalVirtualStakedLamports';
          type: 'u64';
          index: false;
        },
        {
          name: 'staderSolSupply';
          type: 'u64';
          index: false;
        },
      ];
    },
    {
      name: 'LiquidUnstakeEvent';
      fields: [
        {
          name: 'state';
          type: 'publicKey';
          index: false;
        },
        {
          name: 'staderSolOwner';
          type: 'publicKey';
          index: false;
        },
        {
          name: 'liqPoolSolBalance';
          type: 'u64';
          index: false;
        },
        {
          name: 'liqPoolStaderSolBalance';
          type: 'u64';
          index: false;
        },
        {
          name: 'treasuryStaderSolBalance';
          type: {
            option: 'u64';
          };
          index: false;
        },
        {
          name: 'userStaderSolBalance';
          type: 'u64';
          index: false;
        },
        {
          name: 'userSolBalance';
          type: 'u64';
          index: false;
        },
        {
          name: 'staderSolAmount';
          type: 'u64';
          index: false;
        },
        {
          name: 'staderSolFee';
          type: 'u64';
          index: false;
        },
        {
          name: 'treasuryStaderSolCut';
          type: 'u64';
          index: false;
        },
        {
          name: 'solAmount';
          type: 'u64';
          index: false;
        },
        {
          name: 'lpLiquidityTarget';
          type: 'u64';
          index: false;
        },
        {
          name: 'lpMaxFee';
          type: {
            defined: 'Fee';
          };
          index: false;
        },
        {
          name: 'lpMinFee';
          type: {
            defined: 'Fee';
          };
          index: false;
        },
        {
          name: 'treasuryCut';
          type: {
            defined: 'Fee';
          };
          index: false;
        },
      ];
    },
    {
      name: 'RemoveLiquidityEvent';
      fields: [
        {
          name: 'state';
          type: 'publicKey';
          index: false;
        },
        {
          name: 'solLegBalance';
          type: 'u64';
          index: false;
        },
        {
          name: 'staderSolLegBalance';
          type: 'u64';
          index: false;
        },
        {
          name: 'userLpBalance';
          type: 'u64';
          index: false;
        },
        {
          name: 'userSolBalance';
          type: 'u64';
          index: false;
        },
        {
          name: 'userStaderSolBalance';
          type: 'u64';
          index: false;
        },
        {
          name: 'lpMintSupply';
          type: 'u64';
          index: false;
        },
        {
          name: 'lpBurned';
          type: 'u64';
          index: false;
        },
        {
          name: 'solOutAmount';
          type: 'u64';
          index: false;
        },
        {
          name: 'staderSolOutAmount';
          type: 'u64';
          index: false;
        },
      ];
    },
    {
      name: 'AddValidatorEvent';
      fields: [
        {
          name: 'state';
          type: 'publicKey';
          index: false;
        },
        {
          name: 'validator';
          type: 'publicKey';
          index: false;
        },
        {
          name: 'index';
          type: 'u32';
          index: false;
        },
        {
          name: 'score';
          type: 'u32';
          index: false;
        },
      ];
    },
    {
      name: 'RemoveValidatorEvent';
      fields: [
        {
          name: 'state';
          type: 'publicKey';
          index: false;
        },
        {
          name: 'validator';
          type: 'publicKey';
          index: false;
        },
        {
          name: 'index';
          type: 'u32';
          index: false;
        },
        {
          name: 'operationalSolBalance';
          type: 'u64';
          index: false;
        },
      ];
    },
    {
      name: 'SetValidatorScoreEvent';
      fields: [
        {
          name: 'state';
          type: 'publicKey';
          index: false;
        },
        {
          name: 'validator';
          type: 'publicKey';
          index: false;
        },
        {
          name: 'index';
          type: 'u32';
          index: false;
        },
        {
          name: 'scoreChange';
          type: {
            defined: 'U32ValueChange';
          };
          index: false;
        },
      ];
    },
    {
      name: 'DepositStakeAccountEvent';
      fields: [
        {
          name: 'state';
          type: 'publicKey';
          index: false;
        },
        {
          name: 'stake';
          type: 'publicKey';
          index: false;
        },
        {
          name: 'delegated';
          type: 'u64';
          index: false;
        },
        {
          name: 'withdrawer';
          type: 'publicKey';
          index: false;
        },
        {
          name: 'stakeIndex';
          type: 'u32';
          index: false;
        },
        {
          name: 'validator';
          type: 'publicKey';
          index: false;
        },
        {
          name: 'validatorIndex';
          type: 'u32';
          index: false;
        },
        {
          name: 'validatorActiveBalance';
          type: 'u64';
          index: false;
        },
        {
          name: 'totalActiveBalance';
          type: 'u64';
          index: false;
        },
        {
          name: 'userStaderSolBalance';
          type: 'u64';
          index: false;
        },
        {
          name: 'staderSolMinted';
          type: 'u64';
          index: false;
        },
        {
          name: 'totalVirtualStakedLamports';
          type: 'u64';
          index: false;
        },
        {
          name: 'staderSolSupply';
          type: 'u64';
          index: false;
        },
      ];
    },
    {
      name: 'DepositEvent';
      fields: [
        {
          name: 'state';
          type: 'publicKey';
          index: false;
        },
        {
          name: 'solOwner';
          type: 'publicKey';
          index: false;
        },
        {
          name: 'userSolBalance';
          type: 'u64';
          index: false;
        },
        {
          name: 'userStaderSolBalance';
          type: 'u64';
          index: false;
        },
        {
          name: 'solLegBalance';
          type: 'u64';
          index: false;
        },
        {
          name: 'staderSolLegBalance';
          type: 'u64';
          index: false;
        },
        {
          name: 'reserveBalance';
          type: 'u64';
          index: false;
        },
        {
          name: 'solSwapped';
          type: 'u64';
          index: false;
        },
        {
          name: 'staderSolSwapped';
          type: 'u64';
          index: false;
        },
        {
          name: 'solDeposited';
          type: 'u64';
          index: false;
        },
        {
          name: 'staderSolMinted';
          type: 'u64';
          index: false;
        },
        {
          name: 'totalVirtualStakedLamports';
          type: 'u64';
          index: false;
        },
        {
          name: 'staderSolSupply';
          type: 'u64';
          index: false;
        },
      ];
    },
    {
      name: 'WithdrawStakeAccountEvent';
      fields: [
        {
          name: 'state';
          type: 'publicKey';
          index: false;
        },
        {
          name: 'epoch';
          type: 'u64';
          index: false;
        },
        {
          name: 'stake';
          type: 'publicKey';
          index: false;
        },
        {
          name: 'lastUpdateStakeDelegation';
          type: 'u64';
          index: false;
        },
        {
          name: 'stakeIndex';
          type: 'u32';
          index: false;
        },
        {
          name: 'validator';
          type: 'publicKey';
          index: false;
        },
        {
          name: 'validatorIndex';
          type: 'u32';
          index: false;
        },
        {
          name: 'userStaderSolBalance';
          type: 'u64';
          index: false;
        },
        {
          name: 'userStaderSolAuth';
          type: 'publicKey';
          index: false;
        },
        {
          name: 'staderSolBurned';
          type: 'u64';
          index: false;
        },
        {
          name: 'staderSolFees';
          type: 'u64';
          index: false;
        },
        {
          name: 'splitStake';
          type: 'publicKey';
          index: false;
        },
        {
          name: 'beneficiary';
          type: 'publicKey';
          index: false;
        },
        {
          name: 'splitLamports';
          type: 'u64';
          index: false;
        },
        {
          name: 'feeBpCents';
          type: 'u32';
          index: false;
        },
        {
          name: 'totalVirtualStakedLamports';
          type: 'u64';
          index: false;
        },
        {
          name: 'staderSolSupply';
          type: 'u64';
          index: false;
        },
      ];
    },
  ];
  errors: [
    {
      code: 6000;
      name: 'WrongReserveOwner';
      msg: 'Wrong reserve owner. Must be a system account';
    },
    {
      code: 6001;
      name: 'NonEmptyReserveData';
      msg: 'Reserve must have no data, but has data';
    },
    {
      code: 6002;
      name: 'InvalidInitialReserveLamports';
      msg: 'Invalid initial reserve lamports';
    },
    {
      code: 6003;
      name: 'ZeroValidatorChunkSize';
      msg: 'Zero validator chunk size';
    },
    {
      code: 6004;
      name: 'TooBigValidatorChunkSize';
      msg: 'Too big validator chunk size';
    },
    {
      code: 6005;
      name: 'ZeroCreditChunkSize';
      msg: 'Zero credit chunk size';
    },
    {
      code: 6006;
      name: 'TooBigCreditChunkSize';
      msg: 'Too big credit chunk size';
    },
    {
      code: 6007;
      name: 'TooLowCreditFee';
      msg: 'Too low credit fee';
    },
    {
      code: 6008;
      name: 'InvalidMintAuthority';
      msg: 'Invalid mint authority';
    },
    {
      code: 6009;
      name: 'MintHasInitialSupply';
      msg: 'Non empty initial mint supply';
    },
    {
      code: 6010;
      name: 'InvalidOwnerFeeState';
      msg: 'Invalid owner fee state';
    },
    {
      code: 6011;
      name: 'InvalidProgramId';
      msg: 'Invalid program id. For using program from another account please update id in the code';
    },
    {
      code: 6012;
      name: 'UnexpectedAccount';
      msg: 'Unexpected account';
    },
    {
      code: 6013;
      name: 'CalculationFailure';
      msg: 'Calculation failure';
    },
    {
      code: 6014;
      name: 'StakeAccountWithLockup';
      msg: "You can't deposit a stake-account with lockup";
    },
    {
      code: 6015;
      name: 'MinStakeIsTooLow';
      msg: 'Min stake is too low';
    },
    {
      code: 6016;
      name: 'LpMaxFeeIsTooHigh';
      msg: 'Lp max fee is too high';
    },
    {
      code: 6017;
      name: 'BasisPointsOverflow';
      msg: 'Basis points overflow';
    },
    {
      code: 6018;
      name: 'LpFeesAreWrongWayRound';
      msg: 'LP min fee > LP max fee';
    },
    {
      code: 6019;
      name: 'LiquidityTargetTooLow';
      msg: 'Liquidity target too low';
    },
    {
      code: 6020;
      name: 'TicketNotDue';
      msg: 'Ticket not due. Wait more epochs';
    },
    {
      code: 6021;
      name: 'TicketNotReady';
      msg: 'Ticket not ready. Wait a few hours and try again';
    },
    {
      code: 6022;
      name: 'WrongBeneficiary';
      msg: 'Wrong Ticket Beneficiary';
    },
    {
      code: 6023;
      name: 'StakeAccountNotUpdatedYet';
      msg: 'Stake Account not updated yet';
    },
    {
      code: 6024;
      name: 'StakeNotDelegated';
      msg: 'Stake Account not delegated';
    },
    {
      code: 6025;
      name: 'StakeAccountIsEmergencyUnstaking';
      msg: 'Stake Account is emergency unstaking';
    },
    {
      code: 6026;
      name: 'InsufficientLiquidity';
      msg: 'Insufficient Liquidity in the Liquidity Pool';
    },
    {
      code: 6027;
      name: 'NotUsed6027';
    },
    {
      code: 6028;
      name: 'InvalidAdminAuthority';
      msg: 'Invalid admin authority';
    },
    {
      code: 6029;
      name: 'InvalidValidatorManager';
      msg: 'Invalid validator system manager';
    },
    {
      code: 6030;
      name: 'InvalidStakeListDiscriminator';
      msg: 'Invalid stake list account discriminator';
    },
    {
      code: 6031;
      name: 'InvalidValidatorListDiscriminator';
      msg: 'Invalid validator list account discriminator';
    },
    {
      code: 6032;
      name: 'TreasuryCutIsTooHigh';
      msg: 'Treasury cut is too high';
    },
    {
      code: 6033;
      name: 'RewardsFeeIsTooHigh';
      msg: 'Reward fee is too high';
    },
    {
      code: 6034;
      name: 'StakingIsCapped';
      msg: 'Staking is capped';
    },
    {
      code: 6035;
      name: 'LiquidityIsCapped';
      msg: 'Liquidity is capped';
    },
    {
      code: 6036;
      name: 'UpdateWindowIsTooLow';
      msg: 'Update window is too low';
    },
    {
      code: 6037;
      name: 'MinWithdrawIsTooHigh';
      msg: 'Min withdraw is too high';
    },
    {
      code: 6038;
      name: 'WithdrawAmountIsTooLow';
      msg: 'Withdraw amount is too low';
    },
    {
      code: 6039;
      name: 'DepositAmountIsTooLow';
      msg: 'Deposit amount is too low';
    },
    {
      code: 6040;
      name: 'NotEnoughUserFunds';
      msg: 'Not enough user funds';
    },
    {
      code: 6041;
      name: 'WrongTokenOwnerOrDelegate';
      msg: 'Wrong token owner or delegate';
    },
    {
      code: 6042;
      name: 'TooEarlyForStakeDelta';
      msg: 'Too early for stake delta';
    },
    {
      code: 6043;
      name: 'RequiredDelegatedStake';
      msg: 'Required delegated stake';
    },
    {
      code: 6044;
      name: 'RequiredActiveStake';
      msg: 'Required active stake';
    },
    {
      code: 6045;
      name: 'RequiredDeactivatingStake';
      msg: 'Required deactivating stake';
    },
    {
      code: 6046;
      name: 'DepositingNotActivatedStake';
      msg: 'Depositing not activated stake';
    },
    {
      code: 6047;
      name: 'TooLowDelegationInDepositingStake';
      msg: 'Too low delegation in the depositing stake';
    },
    {
      code: 6048;
      name: 'WrongStakeBalance';
      msg: 'Wrong deposited stake balance';
    },
    {
      code: 6049;
      name: 'WrongValidatorAccountOrIndex';
      msg: 'Wrong validator account or index';
    },
    {
      code: 6050;
      name: 'WrongStakeAccountOrIndex';
      msg: 'Wrong stake account or index';
    },
    {
      code: 6051;
      name: 'UnstakingOnPositiveDelta';
      msg: 'Delta stake is positive so we must stake instead of unstake';
    },
    {
      code: 6052;
      name: 'StakingOnNegativeDelta';
      msg: 'Delta stake is negative so we must unstake instead of stake';
    },
    {
      code: 6053;
      name: 'MovingStakeIsCapped';
      msg: 'Moving stake during an epoch is capped';
    },
    {
      code: 6054;
      name: 'StakeMustBeUninitialized';
      msg: 'Stake must be uninitialized';
    },
    {
      code: 6055;
      name: 'DestinationStakeMustBeDelegated';
      msg: 'Destination stake must be delegated';
    },
    {
      code: 6056;
      name: 'DestinationStakeMustNotBeDeactivating';
      msg: 'Destination stake must not be deactivating';
    },
    {
      code: 6057;
      name: 'DestinationStakeMustBeUpdated';
      msg: 'Destination stake must be updated';
    },
    {
      code: 6058;
      name: 'InvalidDestinationStakeDelegation';
      msg: 'Invalid destination stake delegation';
    },
    {
      code: 6059;
      name: 'SourceStakeMustBeDelegated';
      msg: 'Source stake must be delegated';
    },
    {
      code: 6060;
      name: 'SourceStakeMustNotBeDeactivating';
      msg: 'Source stake must not be deactivating';
    },
    {
      code: 6061;
      name: 'SourceStakeMustBeUpdated';
      msg: 'Source stake must be updated';
    },
    {
      code: 6062;
      name: 'InvalidSourceStakeDelegation';
      msg: 'Invalid source stake delegation';
    },
    {
      code: 6063;
      name: 'InvalidDelayedUnstakeTicket';
      msg: 'Invalid delayed unstake ticket';
    },
    {
      code: 6064;
      name: 'ReusingDelayedUnstakeTicket';
      msg: 'Reusing delayed unstake ticket';
    },
    {
      code: 6065;
      name: 'EmergencyUnstakingFromNonZeroScoredValidator';
      msg: 'Emergency unstaking from non zero scored validator';
    },
    {
      code: 6066;
      name: 'WrongValidatorDuplicationFlag';
      msg: 'Wrong validator duplication flag';
    },
    {
      code: 6067;
      name: 'RedepositingStaderStake';
      msg: 'Redepositing stader-stake';
    },
    {
      code: 6068;
      name: 'RemovingValidatorWithBalance';
      msg: 'Removing validator with balance';
    },
    {
      code: 6069;
      name: 'RedelegateOverTarget';
      msg: 'Redelegate will put validator over stake target';
    },
    {
      code: 6070;
      name: 'SourceAndDestValidatorsAreTheSame';
      msg: 'Source and Dest Validators are the same';
    },
    {
      code: 6071;
      name: 'UnregisteredStaderSolMinted';
      msg: 'Some staderSOL tokens was minted outside of stader liquid staking contract';
    },
    {
      code: 6072;
      name: 'UnregisteredLPMinted';
      msg: 'Some LP tokens was minted outside of stader liquid staking contract';
    },
    {
      code: 6073;
      name: 'ListIndexOutOfBounds';
      msg: 'List index out of bounds';
    },
    {
      code: 6074;
      name: 'ListOverflow';
      msg: 'List overflow';
    },
    {
      code: 6075;
      name: 'AlreadyPaused';
      msg: 'Requested pause and already Paused';
    },
    {
      code: 6076;
      name: 'NotPaused';
      msg: 'Requested resume, but not Paused';
    },
    {
      code: 6077;
      name: 'ProgramIsPaused';
      msg: 'Emergency Pause is Active';
    },
    {
      code: 6078;
      name: 'InvalidPauseAuthority';
      msg: 'Invalid pause authority';
    },
    {
      code: 6079;
      name: 'SelectedStakeAccountHasNotEnoughFunds';
      msg: 'Selected Stake account has not enough funds';
    },
    {
      code: 6080;
      name: 'BasisPointCentsOverflow';
      msg: 'Basis point CENTS overflow';
    },
    {
      code: 6081;
      name: 'WithdrawStakeAccountIsNotEnabled';
      msg: 'Withdraw stake account is not enabled';
    },
    {
      code: 6082;
      name: 'WithdrawStakeAccountFeeIsTooHigh';
      msg: 'Withdraw stake account fee is too high';
    },
    {
      code: 6083;
      name: 'DelayedUnstakeFeeIsTooHigh';
      msg: 'Delayed unstake fee is too high';
    },
    {
      code: 6084;
      name: 'WithdrawStakeLamportsIsTooLow';
      msg: 'Withdraw stake account value is too low';
    },
    {
      code: 6085;
      name: 'StakeAccountRemainderTooLow';
      msg: 'Stake account remainder too low';
    },
    {
      code: 6086;
      name: 'ShrinkingListWithDeletingContents';
      msg: "Capacity of the list must be not less than it's current size";
    },
  ];
};

export const IDL: StaderLiquidStaking = {
  version: '0.1.0',
  name: 'stader_liquid_staking',
  instructions: [
    {
      name: 'initialize',
      accounts: [
        {
          name: 'state',
          isMut: true,
          isSigner: false,
        },
        {
          name: 'reservePda',
          isMut: false,
          isSigner: false,
        },
        {
          name: 'stakeList',
          isMut: true,
          isSigner: false,
        },
        {
          name: 'validatorList',
          isMut: true,
          isSigner: false,
        },
        {
          name: 'staderSolMint',
          isMut: false,
          isSigner: false,
        },
        {
          name: 'operationalSolAccount',
          isMut: false,
          isSigner: false,
        },
        {
          name: 'lpMint',
          isMut: false,
          isSigner: false,
        },
        {
          name: 'solLegPda',
          isMut: false,
          isSigner: false,
        },
        {
          name: 'staderSolLeg',
          isMut: false,
          isSigner: false,
        },
        {
          name: 'treasuryStaderSolAccount',
          isMut: false,
          isSigner: false,
        },
        {
          name: 'clock',
          isMut: false,
          isSigner: false,
        },
        {
          name: 'rent',
          isMut: false,
          isSigner: false,
        },
      ],
      args: [
        {
          name: 'data',
          type: {
            defined: 'InitializeData',
          },
        },
      ],
    },
    {
      name: 'changeAuthority',
      accounts: [
        {
          name: 'state',
          isMut: true,
          isSigner: false,
        },
        {
          name: 'adminAuthority',
          isMut: false,
          isSigner: true,
        },
      ],
      args: [
        {
          name: 'data',
          type: {
            defined: 'ChangeAuthorityData',
          },
        },
      ],
    },
    {
      name: 'addValidator',
      accounts: [
        {
          name: 'state',
          isMut: true,
          isSigner: false,
        },
        {
          name: 'managerAuthority',
          isMut: false,
          isSigner: true,
        },
        {
          name: 'validatorList',
          isMut: true,
          isSigner: false,
        },
        {
          name: 'validatorVote',
          isMut: false,
          isSigner: false,
        },
        {
          name: 'duplicationFlag',
          isMut: true,
          isSigner: false,
          docs: ['by initializing this account we mark the validator as added'],
        },
        {
          name: 'rentPayer',
          isMut: true,
          isSigner: true,
        },
        {
          name: 'clock',
          isMut: false,
          isSigner: false,
        },
        {
          name: 'rent',
          isMut: false,
          isSigner: false,
        },
        {
          name: 'systemProgram',
          isMut: false,
          isSigner: false,
        },
      ],
      args: [
        {
          name: 'score',
          type: 'u32',
        },
      ],
    },
    {
      name: 'removeValidator',
      accounts: [
        {
          name: 'state',
          isMut: true,
          isSigner: false,
        },
        {
          name: 'managerAuthority',
          isMut: false,
          isSigner: true,
        },
        {
          name: 'validatorList',
          isMut: true,
          isSigner: false,
        },
        {
          name: 'duplicationFlag',
          isMut: true,
          isSigner: false,
        },
        {
          name: 'operationalSolAccount',
          isMut: true,
          isSigner: false,
        },
      ],
      args: [
        {
          name: 'index',
          type: 'u32',
        },
        {
          name: 'validatorVote',
          type: 'publicKey',
        },
      ],
    },
    {
      name: 'setValidatorScore',
      accounts: [
        {
          name: 'state',
          isMut: true,
          isSigner: false,
        },
        {
          name: 'managerAuthority',
          isMut: false,
          isSigner: true,
        },
        {
          name: 'validatorList',
          isMut: true,
          isSigner: false,
        },
      ],
      args: [
        {
          name: 'index',
          type: 'u32',
        },
        {
          name: 'validatorVote',
          type: 'publicKey',
        },
        {
          name: 'score',
          type: 'u32',
        },
      ],
    },
    {
      name: 'configValidatorSystem',
      accounts: [
        {
          name: 'state',
          isMut: true,
          isSigner: false,
        },
        {
          name: 'managerAuthority',
          isMut: false,
          isSigner: true,
        },
      ],
      args: [
        {
          name: 'extraRuns',
          type: 'u32',
        },
      ],
    },
    {
      name: 'deposit',
      accounts: [
        {
          name: 'state',
          isMut: true,
          isSigner: false,
        },
        {
          name: 'staderSolMint',
          isMut: true,
          isSigner: false,
        },
        {
          name: 'liqPoolSolLegPda',
          isMut: true,
          isSigner: false,
        },
        {
          name: 'liqPoolStaderSolLeg',
          isMut: true,
          isSigner: false,
        },
        {
          name: 'liqPoolStaderSolLegAuthority',
          isMut: false,
          isSigner: false,
        },
        {
          name: 'reservePda',
          isMut: true,
          isSigner: false,
        },
        {
          name: 'transferFrom',
          isMut: true,
          isSigner: true,
        },
        {
          name: 'mintTo',
          isMut: true,
          isSigner: false,
          docs: ['user staderSOL Token account to send the staderSOL'],
        },
        {
          name: 'staderSolMintAuthority',
          isMut: false,
          isSigner: false,
        },
        {
          name: 'systemProgram',
          isMut: false,
          isSigner: false,
        },
        {
          name: 'tokenProgram',
          isMut: false,
          isSigner: false,
        },
      ],
      args: [
        {
          name: 'lamports',
          type: 'u64',
        },
      ],
    },
    {
      name: 'depositStakeAccount',
      accounts: [
        {
          name: 'state',
          isMut: true,
          isSigner: false,
        },
        {
          name: 'validatorList',
          isMut: true,
          isSigner: false,
        },
        {
          name: 'stakeList',
          isMut: true,
          isSigner: false,
        },
        {
          name: 'stakeAccount',
          isMut: true,
          isSigner: false,
        },
        {
          name: 'stakeAuthority',
          isMut: false,
          isSigner: true,
        },
        {
          name: 'duplicationFlag',
          isMut: true,
          isSigner: false,
        },
        {
          name: 'rentPayer',
          isMut: true,
          isSigner: true,
        },
        {
          name: 'staderSolMint',
          isMut: true,
          isSigner: false,
        },
        {
          name: 'mintTo',
          isMut: true,
          isSigner: false,
          docs: ['user staderSOL Token account to send the staderSOL'],
        },
        {
          name: 'staderSolMintAuthority',
          isMut: false,
          isSigner: false,
        },
        {
          name: 'clock',
          isMut: false,
          isSigner: false,
        },
        {
          name: 'rent',
          isMut: false,
          isSigner: false,
        },
        {
          name: 'systemProgram',
          isMut: false,
          isSigner: false,
        },
        {
          name: 'tokenProgram',
          isMut: false,
          isSigner: false,
        },
        {
          name: 'stakeProgram',
          isMut: false,
          isSigner: false,
        },
      ],
      args: [
        {
          name: 'validatorIndex',
          type: 'u32',
        },
      ],
    },
    {
      name: 'liquidUnstake',
      accounts: [
        {
          name: 'state',
          isMut: true,
          isSigner: false,
        },
        {
          name: 'staderSolMint',
          isMut: true,
          isSigner: false,
        },
        {
          name: 'liqPoolSolLegPda',
          isMut: true,
          isSigner: false,
        },
        {
          name: 'liqPoolStaderSolLeg',
          isMut: true,
          isSigner: false,
        },
        {
          name: 'treasuryStaderSolAccount',
          isMut: true,
          isSigner: false,
        },
        {
          name: 'getStaderSolFrom',
          isMut: true,
          isSigner: false,
        },
        {
          name: 'getStaderSolFromAuthority',
          isMut: false,
          isSigner: true,
        },
        {
          name: 'transferSolTo',
          isMut: true,
          isSigner: false,
        },
        {
          name: 'systemProgram',
          isMut: false,
          isSigner: false,
        },
        {
          name: 'tokenProgram',
          isMut: false,
          isSigner: false,
        },
      ],
      args: [
        {
          name: 'staderSolAmount',
          type: 'u64',
        },
      ],
    },
    {
      name: 'addLiquidity',
      accounts: [
        {
          name: 'state',
          isMut: true,
          isSigner: false,
        },
        {
          name: 'lpMint',
          isMut: true,
          isSigner: false,
        },
        {
          name: 'lpMintAuthority',
          isMut: false,
          isSigner: false,
        },
        {
          name: 'liqPoolStaderSolLeg',
          isMut: false,
          isSigner: false,
        },
        {
          name: 'liqPoolSolLegPda',
          isMut: true,
          isSigner: false,
        },
        {
          name: 'transferFrom',
          isMut: true,
          isSigner: true,
        },
        {
          name: 'mintTo',
          isMut: true,
          isSigner: false,
        },
        {
          name: 'systemProgram',
          isMut: false,
          isSigner: false,
        },
        {
          name: 'tokenProgram',
          isMut: false,
          isSigner: false,
        },
      ],
      args: [
        {
          name: 'lamports',
          type: 'u64',
        },
      ],
    },
    {
      name: 'removeLiquidity',
      accounts: [
        {
          name: 'state',
          isMut: true,
          isSigner: false,
        },
        {
          name: 'lpMint',
          isMut: true,
          isSigner: false,
        },
        {
          name: 'burnFrom',
          isMut: true,
          isSigner: false,
        },
        {
          name: 'burnFromAuthority',
          isMut: false,
          isSigner: true,
        },
        {
          name: 'transferSolTo',
          isMut: true,
          isSigner: false,
        },
        {
          name: 'transferStaderSolTo',
          isMut: true,
          isSigner: false,
        },
        {
          name: 'liqPoolSolLegPda',
          isMut: true,
          isSigner: false,
        },
        {
          name: 'liqPoolStaderSolLeg',
          isMut: true,
          isSigner: false,
        },
        {
          name: 'liqPoolStaderSolLegAuthority',
          isMut: false,
          isSigner: false,
        },
        {
          name: 'systemProgram',
          isMut: false,
          isSigner: false,
        },
        {
          name: 'tokenProgram',
          isMut: false,
          isSigner: false,
        },
      ],
      args: [
        {
          name: 'tokens',
          type: 'u64',
        },
      ],
    },
    {
      name: 'configLp',
      accounts: [
        {
          name: 'state',
          isMut: true,
          isSigner: false,
        },
        {
          name: 'adminAuthority',
          isMut: false,
          isSigner: true,
        },
      ],
      args: [
        {
          name: 'params',
          type: {
            defined: 'ConfigLpParams',
          },
        },
      ],
    },
    {
      name: 'configStader',
      accounts: [
        {
          name: 'state',
          isMut: true,
          isSigner: false,
        },
        {
          name: 'adminAuthority',
          isMut: false,
          isSigner: true,
        },
      ],
      args: [
        {
          name: 'params',
          type: {
            defined: 'ConfigStaderParams',
          },
        },
      ],
    },
    {
      name: 'updateStaderSolTokenMetadata',
      accounts: [
        {
          name: 'payer',
          isMut: true,
          isSigner: true,
        },
        {
          name: 'state',
          isMut: false,
          isSigner: false,
        },
        {
          name: 'staderSolMint',
          isMut: false,
          isSigner: false,
        },
        {
          name: 'staderSolMintAuthority',
          isMut: false,
          isSigner: false,
        },
        {
          name: 'staderSolMintMetadataAccount',
          isMut: true,
          isSigner: false,
        },
        {
          name: 'rent',
          isMut: false,
          isSigner: false,
          docs: ['Sysvar for token mint and ATA creation'],
        },
        {
          name: 'systemProgram',
          isMut: false,
          isSigner: false,
          docs: ['Program to create the position manager state account'],
        },
        {
          name: 'metadataProgram',
          isMut: false,
          isSigner: false,
          docs: ['Program to create NFT metadata'],
        },
      ],
      args: [
        {
          name: 'name',
          type: 'string',
        },
        {
          name: 'symbol',
          type: 'string',
        },
        {
          name: 'uri',
          type: 'string',
        },
      ],
    },
    {
      name: 'updateLpTokenMetadata',
      accounts: [
        {
          name: 'payer',
          isMut: true,
          isSigner: true,
        },
        {
          name: 'state',
          isMut: false,
          isSigner: false,
        },
        {
          name: 'lpMint',
          isMut: false,
          isSigner: false,
        },
        {
          name: 'lpMintAuthority',
          isMut: false,
          isSigner: false,
        },
        {
          name: 'lpMintMetadataAccount',
          isMut: true,
          isSigner: false,
        },
        {
          name: 'rent',
          isMut: false,
          isSigner: false,
          docs: ['Sysvar for token mint and ATA creation'],
        },
        {
          name: 'systemProgram',
          isMut: false,
          isSigner: false,
          docs: ['Program to create the position manager state account'],
        },
        {
          name: 'metadataProgram',
          isMut: false,
          isSigner: false,
          docs: ['Program to create NFT metadata'],
        },
      ],
      args: [
        {
          name: 'name',
          type: 'string',
        },
        {
          name: 'symbol',
          type: 'string',
        },
        {
          name: 'uri',
          type: 'string',
        },
      ],
    },
    {
      name: 'orderUnstake',
      accounts: [
        {
          name: 'state',
          isMut: true,
          isSigner: false,
        },
        {
          name: 'staderSolMint',
          isMut: true,
          isSigner: false,
        },
        {
          name: 'burnStaderSolFrom',
          isMut: true,
          isSigner: false,
        },
        {
          name: 'burnStaderSolAuthority',
          isMut: false,
          isSigner: true,
        },
        {
          name: 'newTicketAccount',
          isMut: true,
          isSigner: false,
        },
        {
          name: 'clock',
          isMut: false,
          isSigner: false,
        },
        {
          name: 'rent',
          isMut: false,
          isSigner: false,
        },
        {
          name: 'tokenProgram',
          isMut: false,
          isSigner: false,
        },
      ],
      args: [
        {
          name: 'staderSolAmount',
          type: 'u64',
        },
      ],
    },
    {
      name: 'claim',
      accounts: [
        {
          name: 'state',
          isMut: true,
          isSigner: false,
        },
        {
          name: 'reservePda',
          isMut: true,
          isSigner: false,
        },
        {
          name: 'ticketAccount',
          isMut: true,
          isSigner: false,
        },
        {
          name: 'transferSolTo',
          isMut: true,
          isSigner: false,
        },
        {
          name: 'clock',
          isMut: false,
          isSigner: false,
        },
        {
          name: 'systemProgram',
          isMut: false,
          isSigner: false,
        },
      ],
      args: [],
    },
    {
      name: 'stakeReserve',
      accounts: [
        {
          name: 'state',
          isMut: true,
          isSigner: false,
        },
        {
          name: 'validatorList',
          isMut: true,
          isSigner: false,
        },
        {
          name: 'stakeList',
          isMut: true,
          isSigner: false,
        },
        {
          name: 'validatorVote',
          isMut: true,
          isSigner: false,
        },
        {
          name: 'reservePda',
          isMut: true,
          isSigner: false,
        },
        {
          name: 'stakeAccount',
          isMut: true,
          isSigner: true,
        },
        {
          name: 'stakeDepositAuthority',
          isMut: false,
          isSigner: false,
        },
        {
          name: 'rentPayer',
          isMut: true,
          isSigner: true,
        },
        {
          name: 'clock',
          isMut: false,
          isSigner: false,
        },
        {
          name: 'epochSchedule',
          isMut: false,
          isSigner: false,
        },
        {
          name: 'rent',
          isMut: false,
          isSigner: false,
        },
        {
          name: 'stakeHistory',
          isMut: false,
          isSigner: false,
        },
        {
          name: 'stakeConfig',
          isMut: false,
          isSigner: false,
        },
        {
          name: 'systemProgram',
          isMut: false,
          isSigner: false,
        },
        {
          name: 'stakeProgram',
          isMut: false,
          isSigner: false,
        },
      ],
      args: [
        {
          name: 'validatorIndex',
          type: 'u32',
        },
      ],
    },
    {
      name: 'updateActive',
      accounts: [
        {
          name: 'state',
          isMut: true,
          isSigner: false,
        },
        {
          name: 'stakeList',
          isMut: true,
          isSigner: false,
        },
        {
          name: 'validatorList',
          isMut: true,
          isSigner: false,
        },
        {
          name: 'stakeAccount',
          isMut: true,
          isSigner: false,
        },
        {
          name: 'stakeWithdrawAuthority',
          isMut: false,
          isSigner: false,
        },
        {
          name: 'reservePda',
          isMut: true,
          isSigner: false,
        },
        {
          name: 'staderSolMint',
          isMut: true,
          isSigner: false,
        },
        {
          name: 'staderSolMintAuthority',
          isMut: false,
          isSigner: false,
        },
        {
          name: 'treasuryStaderSolAccount',
          isMut: true,
          isSigner: false,
        },
        {
          name: 'clock',
          isMut: false,
          isSigner: false,
        },
        {
          name: 'stakeHistory',
          isMut: false,
          isSigner: false,
        },
        {
          name: 'stakeProgram',
          isMut: false,
          isSigner: false,
        },
        {
          name: 'tokenProgram',
          isMut: false,
          isSigner: false,
        },
      ],
      args: [
        {
          name: 'stakeIndex',
          type: 'u32',
        },
        {
          name: 'validatorIndex',
          type: 'u32',
        },
      ],
    },
    {
      name: 'updateDeactivated',
      accounts: [
        {
          name: 'state',
          isMut: true,
          isSigner: false,
        },
        {
          name: 'stakeList',
          isMut: true,
          isSigner: false,
        },
        {
          name: 'stakeAccount',
          isMut: true,
          isSigner: false,
        },
        {
          name: 'stakeWithdrawAuthority',
          isMut: false,
          isSigner: false,
        },
        {
          name: 'reservePda',
          isMut: true,
          isSigner: false,
        },
        {
          name: 'staderSolMint',
          isMut: true,
          isSigner: false,
        },
        {
          name: 'staderSolMintAuthority',
          isMut: false,
          isSigner: false,
        },
        {
          name: 'treasuryStaderSolAccount',
          isMut: true,
          isSigner: false,
        },
        {
          name: 'operationalSolAccount',
          isMut: true,
          isSigner: false,
        },
        {
          name: 'clock',
          isMut: false,
          isSigner: false,
        },
        {
          name: 'stakeHistory',
          isMut: false,
          isSigner: false,
        },
        {
          name: 'stakeProgram',
          isMut: false,
          isSigner: false,
        },
        {
          name: 'tokenProgram',
          isMut: false,
          isSigner: false,
        },
        {
          name: 'systemProgram',
          isMut: false,
          isSigner: false,
        },
      ],
      args: [
        {
          name: 'stakeIndex',
          type: 'u32',
        },
      ],
    },
    {
      name: 'deactivateStake',
      accounts: [
        {
          name: 'state',
          isMut: true,
          isSigner: false,
        },
        {
          name: 'reservePda',
          isMut: false,
          isSigner: false,
        },
        {
          name: 'validatorList',
          isMut: true,
          isSigner: false,
        },
        {
          name: 'stakeList',
          isMut: true,
          isSigner: false,
        },
        {
          name: 'stakeAccount',
          isMut: true,
          isSigner: false,
        },
        {
          name: 'stakeDepositAuthority',
          isMut: false,
          isSigner: false,
        },
        {
          name: 'splitStakeAccount',
          isMut: true,
          isSigner: true,
        },
        {
          name: 'splitStakeRentPayer',
          isMut: true,
          isSigner: true,
        },
        {
          name: 'clock',
          isMut: false,
          isSigner: false,
        },
        {
          name: 'rent',
          isMut: false,
          isSigner: false,
        },
        {
          name: 'epochSchedule',
          isMut: false,
          isSigner: false,
        },
        {
          name: 'stakeHistory',
          isMut: false,
          isSigner: false,
        },
        {
          name: 'systemProgram',
          isMut: false,
          isSigner: false,
        },
        {
          name: 'stakeProgram',
          isMut: false,
          isSigner: false,
        },
      ],
      args: [
        {
          name: 'stakeIndex',
          type: 'u32',
        },
        {
          name: 'validatorIndex',
          type: 'u32',
        },
      ],
    },
    {
      name: 'emergencyUnstake',
      accounts: [
        {
          name: 'state',
          isMut: true,
          isSigner: false,
        },
        {
          name: 'validatorManagerAuthority',
          isMut: false,
          isSigner: true,
        },
        {
          name: 'validatorList',
          isMut: true,
          isSigner: false,
        },
        {
          name: 'stakeList',
          isMut: true,
          isSigner: false,
        },
        {
          name: 'stakeAccount',
          isMut: true,
          isSigner: false,
        },
        {
          name: 'stakeDepositAuthority',
          isMut: false,
          isSigner: false,
        },
        {
          name: 'clock',
          isMut: false,
          isSigner: false,
        },
        {
          name: 'stakeProgram',
          isMut: false,
          isSigner: false,
        },
      ],
      args: [
        {
          name: 'stakeIndex',
          type: 'u32',
        },
        {
          name: 'validatorIndex',
          type: 'u32',
        },
      ],
    },
    {
      name: 'partialUnstake',
      accounts: [
        {
          name: 'state',
          isMut: true,
          isSigner: false,
        },
        {
          name: 'validatorManagerAuthority',
          isMut: false,
          isSigner: true,
        },
        {
          name: 'validatorList',
          isMut: true,
          isSigner: false,
        },
        {
          name: 'stakeList',
          isMut: true,
          isSigner: false,
        },
        {
          name: 'stakeAccount',
          isMut: true,
          isSigner: false,
        },
        {
          name: 'stakeDepositAuthority',
          isMut: false,
          isSigner: false,
        },
        {
          name: 'reservePda',
          isMut: false,
          isSigner: false,
        },
        {
          name: 'splitStakeAccount',
          isMut: true,
          isSigner: true,
        },
        {
          name: 'splitStakeRentPayer',
          isMut: true,
          isSigner: true,
        },
        {
          name: 'clock',
          isMut: false,
          isSigner: false,
        },
        {
          name: 'rent',
          isMut: false,
          isSigner: false,
        },
        {
          name: 'stakeHistory',
          isMut: false,
          isSigner: false,
        },
        {
          name: 'systemProgram',
          isMut: false,
          isSigner: false,
        },
        {
          name: 'stakeProgram',
          isMut: false,
          isSigner: false,
        },
      ],
      args: [
        {
          name: 'stakeIndex',
          type: 'u32',
        },
        {
          name: 'validatorIndex',
          type: 'u32',
        },
        {
          name: 'desiredUnstakeAmount',
          type: 'u64',
        },
      ],
    },
    {
      name: 'mergeStakes',
      accounts: [
        {
          name: 'state',
          isMut: true,
          isSigner: false,
        },
        {
          name: 'stakeList',
          isMut: true,
          isSigner: false,
        },
        {
          name: 'validatorList',
          isMut: true,
          isSigner: false,
        },
        {
          name: 'destinationStake',
          isMut: true,
          isSigner: false,
        },
        {
          name: 'sourceStake',
          isMut: true,
          isSigner: false,
        },
        {
          name: 'stakeDepositAuthority',
          isMut: false,
          isSigner: false,
        },
        {
          name: 'stakeWithdrawAuthority',
          isMut: false,
          isSigner: false,
        },
        {
          name: 'operationalSolAccount',
          isMut: true,
          isSigner: false,
        },
        {
          name: 'clock',
          isMut: false,
          isSigner: false,
        },
        {
          name: 'stakeHistory',
          isMut: false,
          isSigner: false,
        },
        {
          name: 'stakeProgram',
          isMut: false,
          isSigner: false,
        },
      ],
      args: [
        {
          name: 'destinationStakeIndex',
          type: 'u32',
        },
        {
          name: 'sourceStakeIndex',
          type: 'u32',
        },
        {
          name: 'validatorIndex',
          type: 'u32',
        },
      ],
    },
    {
      name: 'redelegate',
      accounts: [
        {
          name: 'state',
          isMut: true,
          isSigner: false,
        },
        {
          name: 'validatorList',
          isMut: true,
          isSigner: false,
        },
        {
          name: 'stakeList',
          isMut: true,
          isSigner: false,
        },
        {
          name: 'stakeAccount',
          isMut: true,
          isSigner: false,
        },
        {
          name: 'stakeDepositAuthority',
          isMut: false,
          isSigner: false,
        },
        {
          name: 'reservePda',
          isMut: false,
          isSigner: false,
        },
        {
          name: 'splitStakeAccount',
          isMut: true,
          isSigner: true,
        },
        {
          name: 'splitStakeRentPayer',
          isMut: true,
          isSigner: true,
        },
        {
          name: 'destValidatorAccount',
          isMut: false,
          isSigner: false,
        },
        {
          name: 'redelegateStakeAccount',
          isMut: true,
          isSigner: true,
        },
        {
          name: 'clock',
          isMut: false,
          isSigner: false,
        },
        {
          name: 'stakeHistory',
          isMut: false,
          isSigner: false,
        },
        {
          name: 'stakeConfig',
          isMut: false,
          isSigner: false,
        },
        {
          name: 'systemProgram',
          isMut: false,
          isSigner: false,
        },
        {
          name: 'stakeProgram',
          isMut: false,
          isSigner: false,
        },
      ],
      args: [
        {
          name: 'stakeIndex',
          type: 'u32',
        },
        {
          name: 'sourceValidatorIndex',
          type: 'u32',
        },
        {
          name: 'destValidatorIndex',
          type: 'u32',
        },
      ],
    },
    {
      name: 'pause',
      accounts: [
        {
          name: 'state',
          isMut: true,
          isSigner: false,
        },
        {
          name: 'pauseAuthority',
          isMut: false,
          isSigner: true,
        },
      ],
      args: [],
    },
    {
      name: 'resume',
      accounts: [
        {
          name: 'state',
          isMut: true,
          isSigner: false,
        },
        {
          name: 'pauseAuthority',
          isMut: false,
          isSigner: true,
        },
      ],
      args: [],
    },
    {
      name: 'withdrawStakeAccount',
      accounts: [
        {
          name: 'state',
          isMut: true,
          isSigner: false,
        },
        {
          name: 'staderSolMint',
          isMut: true,
          isSigner: false,
        },
        {
          name: 'burnStaderSolFrom',
          isMut: true,
          isSigner: false,
        },
        {
          name: 'burnStaderSolAuthority',
          isMut: true,
          isSigner: true,
        },
        {
          name: 'treasuryStaderSolAccount',
          isMut: true,
          isSigner: false,
        },
        {
          name: 'validatorList',
          isMut: true,
          isSigner: false,
        },
        {
          name: 'stakeList',
          isMut: true,
          isSigner: false,
        },
        {
          name: 'stakeWithdrawAuthority',
          isMut: false,
          isSigner: false,
        },
        {
          name: 'stakeDepositAuthority',
          isMut: false,
          isSigner: false,
        },
        {
          name: 'stakeAccount',
          isMut: true,
          isSigner: false,
        },
        {
          name: 'splitStakeAccount',
          isMut: true,
          isSigner: true,
        },
        {
          name: 'splitStakeRentPayer',
          isMut: true,
          isSigner: true,
        },
        {
          name: 'clock',
          isMut: false,
          isSigner: false,
        },
        {
          name: 'systemProgram',
          isMut: false,
          isSigner: false,
        },
        {
          name: 'tokenProgram',
          isMut: false,
          isSigner: false,
        },
        {
          name: 'stakeProgram',
          isMut: false,
          isSigner: false,
        },
      ],
      args: [
        {
          name: 'stakeIndex',
          type: 'u32',
        },
        {
          name: 'validatorIndex',
          type: 'u32',
        },
        {
          name: 'staderSolAmount',
          type: 'u64',
        },
        {
          name: 'beneficiary',
          type: 'publicKey',
        },
      ],
    },
    {
      name: 'reallocValidatorList',
      accounts: [
        {
          name: 'state',
          isMut: true,
          isSigner: false,
        },
        {
          name: 'adminAuthority',
          isMut: false,
          isSigner: true,
        },
        {
          name: 'validatorList',
          isMut: true,
          isSigner: false,
        },
        {
          name: 'rentFunds',
          isMut: true,
          isSigner: true,
        },
        {
          name: 'systemProgram',
          isMut: false,
          isSigner: false,
        },
      ],
      args: [
        {
          name: 'capacity',
          type: 'u32',
        },
      ],
    },
    {
      name: 'reallocStakeList',
      accounts: [
        {
          name: 'state',
          isMut: true,
          isSigner: false,
        },
        {
          name: 'adminAuthority',
          isMut: false,
          isSigner: true,
        },
        {
          name: 'stakeList',
          isMut: true,
          isSigner: false,
        },
        {
          name: 'rentFunds',
          isMut: true,
          isSigner: true,
        },
        {
          name: 'systemProgram',
          isMut: false,
          isSigner: false,
        },
      ],
      args: [
        {
          name: 'capacity',
          type: 'u32',
        },
      ],
    },
  ],
  accounts: [
    {
      name: 'ticketAccountData',
      type: {
        kind: 'struct',
        fields: [
          {
            name: 'stateAddress',
            type: 'publicKey',
          },
          {
            name: 'beneficiary',
            type: 'publicKey',
          },
          {
            name: 'lamportsAmount',
            type: 'u64',
          },
          {
            name: 'createdEpoch',
            type: 'u64',
          },
        ],
      },
    },
    {
      name: 'state',
      type: {
        kind: 'struct',
        fields: [
          {
            name: 'staderSolMint',
            type: 'publicKey',
          },
          {
            name: 'adminAuthority',
            type: 'publicKey',
          },
          {
            name: 'operationalSolAccount',
            type: 'publicKey',
          },
          {
            name: 'treasuryStaderSolAccount',
            type: 'publicKey',
          },
          {
            name: 'reserveBumpSeed',
            type: 'u8',
          },
          {
            name: 'staderSolMintAuthorityBumpSeed',
            type: 'u8',
          },
          {
            name: 'rentExemptForTokenAcc',
            type: 'u64',
          },
          {
            name: 'rewardFee',
            type: {
              defined: 'Fee',
            },
          },
          {
            name: 'stakeSystem',
            type: {
              defined: 'StakeSystem',
            },
          },
          {
            name: 'validatorSystem',
            type: {
              defined: 'ValidatorSystem',
            },
          },
          {
            name: 'liqPool',
            type: {
              defined: 'LiqPool',
            },
          },
          {
            name: 'availableReserveBalance',
            type: 'u64',
          },
          {
            name: 'staderSolSupply',
            type: 'u64',
          },
          {
            name: 'staderSolPrice',
            type: 'u64',
          },
          {
            name: 'circulatingTicketCount',
            docs: ['count tickets for delayed-unstake'],
            type: 'u64',
          },
          {
            name: 'circulatingTicketBalance',
            docs: [
              'total lamports amount of generated and not claimed yet tickets',
            ],
            type: 'u64',
          },
          {
            name: 'lentFromReserve',
            type: 'u64',
          },
          {
            name: 'minDeposit',
            type: 'u64',
          },
          {
            name: 'minWithdraw',
            type: 'u64',
          },
          {
            name: 'stakingSolCap',
            type: 'u64',
          },
          {
            name: 'emergencyCoolingDown',
            type: 'u64',
          },
          {
            name: 'pauseAuthority',
            docs: ['emergency pause'],
            type: 'publicKey',
          },
          {
            name: 'paused',
            type: 'bool',
          },
          {
            name: 'delayedUnstakeFee',
            type: {
              defined: 'FeeCents',
            },
          },
          {
            name: 'withdrawStakeAccountFee',
            type: {
              defined: 'FeeCents',
            },
          },
          {
            name: 'withdrawStakeAccountEnabled',
            type: 'bool',
          },
          {
            name: 'lastStakeMoveEpoch',
            type: 'u64',
          },
          {
            name: 'stakeMoved',
            type: 'u64',
          },
          {
            name: 'maxStakeMovedPerEpoch',
            type: {
              defined: 'Fee',
            },
          },
        ],
      },
    },
  ],
  types: [
    {
      name: 'SplitStakeAccountInfo',
      type: {
        kind: 'struct',
        fields: [
          {
            name: 'account',
            type: 'publicKey',
          },
          {
            name: 'index',
            type: 'u32',
          },
        ],
      },
    },
    {
      name: 'U64ValueChange',
      type: {
        kind: 'struct',
        fields: [
          {
            name: 'old',
            type: 'u64',
          },
          {
            name: 'new',
            type: 'u64',
          },
        ],
      },
    },
    {
      name: 'U32ValueChange',
      type: {
        kind: 'struct',
        fields: [
          {
            name: 'old',
            type: 'u32',
          },
          {
            name: 'new',
            type: 'u32',
          },
        ],
      },
    },
    {
      name: 'FeeValueChange',
      type: {
        kind: 'struct',
        fields: [
          {
            name: 'old',
            type: {
              defined: 'Fee',
            },
          },
          {
            name: 'new',
            type: {
              defined: 'Fee',
            },
          },
        ],
      },
    },
    {
      name: 'FeeCentsValueChange',
      type: {
        kind: 'struct',
        fields: [
          {
            name: 'old',
            type: {
              defined: 'FeeCents',
            },
          },
          {
            name: 'new',
            type: {
              defined: 'FeeCents',
            },
          },
        ],
      },
    },
    {
      name: 'PubkeyValueChange',
      type: {
        kind: 'struct',
        fields: [
          {
            name: 'old',
            type: 'publicKey',
          },
          {
            name: 'new',
            type: 'publicKey',
          },
        ],
      },
    },
    {
      name: 'BoolValueChange',
      type: {
        kind: 'struct',
        fields: [
          {
            name: 'old',
            type: 'bool',
          },
          {
            name: 'new',
            type: 'bool',
          },
        ],
      },
    },
    {
      name: 'ChangeAuthorityData',
      type: {
        kind: 'struct',
        fields: [
          {
            name: 'admin',
            type: {
              option: 'publicKey',
            },
          },
          {
            name: 'validatorManager',
            type: {
              option: 'publicKey',
            },
          },
          {
            name: 'operationalSolAccount',
            type: {
              option: 'publicKey',
            },
          },
          {
            name: 'treasuryStaderSolAccount',
            type: {
              option: 'publicKey',
            },
          },
          {
            name: 'pauseAuthority',
            type: {
              option: 'publicKey',
            },
          },
        ],
      },
    },
    {
      name: 'ConfigLpParams',
      type: {
        kind: 'struct',
        fields: [
          {
            name: 'minFee',
            type: {
              option: {
                defined: 'Fee',
              },
            },
          },
          {
            name: 'maxFee',
            type: {
              option: {
                defined: 'Fee',
              },
            },
          },
          {
            name: 'liquidityTarget',
            type: {
              option: 'u64',
            },
          },
          {
            name: 'treasuryCut',
            type: {
              option: {
                defined: 'Fee',
              },
            },
          },
        ],
      },
    },
    {
      name: 'ConfigStaderParams',
      type: {
        kind: 'struct',
        fields: [
          {
            name: 'rewardsFee',
            type: {
              option: {
                defined: 'Fee',
              },
            },
          },
          {
            name: 'slotsForStakeDelta',
            type: {
              option: 'u64',
            },
          },
          {
            name: 'minStake',
            type: {
              option: 'u64',
            },
          },
          {
            name: 'minDeposit',
            type: {
              option: 'u64',
            },
          },
          {
            name: 'minWithdraw',
            type: {
              option: 'u64',
            },
          },
          {
            name: 'stakingSolCap',
            type: {
              option: 'u64',
            },
          },
          {
            name: 'liquiditySolCap',
            type: {
              option: 'u64',
            },
          },
          {
            name: 'withdrawStakeAccountEnabled',
            type: {
              option: 'bool',
            },
          },
          {
            name: 'delayedUnstakeFee',
            type: {
              option: {
                defined: 'FeeCents',
              },
            },
          },
          {
            name: 'withdrawStakeAccountFee',
            type: {
              option: {
                defined: 'FeeCents',
              },
            },
          },
          {
            name: 'maxStakeMovedPerEpoch',
            type: {
              option: {
                defined: 'Fee',
              },
            },
          },
        ],
      },
    },
    {
      name: 'InitializeData',
      type: {
        kind: 'struct',
        fields: [
          {
            name: 'adminAuthority',
            type: 'publicKey',
          },
          {
            name: 'validatorManagerAuthority',
            type: 'publicKey',
          },
          {
            name: 'minStake',
            type: 'u64',
          },
          {
            name: 'rewardsFee',
            type: {
              defined: 'Fee',
            },
          },
          {
            name: 'liqPool',
            type: {
              defined: 'LiqPoolInitializeData',
            },
          },
          {
            name: 'additionalStakeRecordSpace',
            type: 'u32',
          },
          {
            name: 'additionalValidatorRecordSpace',
            type: 'u32',
          },
          {
            name: 'slotsForStakeDelta',
            type: 'u64',
          },
          {
            name: 'pauseAuthority',
            type: 'publicKey',
          },
        ],
      },
    },
    {
      name: 'LiqPoolInitializeData',
      type: {
        kind: 'struct',
        fields: [
          {
            name: 'lpLiquidityTarget',
            type: 'u64',
          },
          {
            name: 'lpMaxFee',
            type: {
              defined: 'Fee',
            },
          },
          {
            name: 'lpMinFee',
            type: {
              defined: 'Fee',
            },
          },
          {
            name: 'lpTreasuryCut',
            type: {
              defined: 'Fee',
            },
          },
        ],
      },
    },
    {
      name: 'Fee',
      type: {
        kind: 'struct',
        fields: [
          {
            name: 'basisPoints',
            type: 'u32',
          },
        ],
      },
    },
    {
      name: 'FeeCents',
      docs: [
        'FeeCents, same as Fee but / 1_000_000 instead of 10_000',
        '1 FeeCent = 0.0001%, 10_000 FeeCent = 1%, 1_000_000 FeeCent = 100%',
      ],
      type: {
        kind: 'struct',
        fields: [
          {
            name: 'bpCents',
            type: 'u32',
          },
        ],
      },
    },
    {
      name: 'LiqPool',
      type: {
        kind: 'struct',
        fields: [
          {
            name: 'lpMint',
            type: 'publicKey',
          },
          {
            name: 'lpMintAuthorityBumpSeed',
            type: 'u8',
          },
          {
            name: 'solLegBumpSeed',
            type: 'u8',
          },
          {
            name: 'staderSolLegAuthorityBumpSeed',
            type: 'u8',
          },
          {
            name: 'staderSolLeg',
            type: 'publicKey',
          },
          {
            name: 'lpLiquidityTarget',
            docs: [
              'Liquidity target. If the Liquidity reach this amount, the fee reaches lp_min_discount_fee',
            ],
            type: 'u64',
          },
          {
            name: 'lpMaxFee',
            docs: ['Liquidity pool max fee'],
            type: {
              defined: 'Fee',
            },
          },
          {
            name: 'lpMinFee',
            docs: ['SOL/staderSOL Liquidity pool min fee'],
            type: {
              defined: 'Fee',
            },
          },
          {
            name: 'treasuryCut',
            docs: ['Treasury cut'],
            type: {
              defined: 'Fee',
            },
          },
          {
            name: 'lpSupply',
            type: 'u64',
          },
          {
            name: 'lentFromSolLeg',
            type: 'u64',
          },
          {
            name: 'liquiditySolCap',
            type: 'u64',
          },
        ],
      },
    },
    {
      name: 'List',
      type: {
        kind: 'struct',
        fields: [
          {
            name: 'account',
            type: 'publicKey',
          },
          {
            name: 'itemSize',
            type: 'u32',
          },
          {
            name: 'count',
            type: 'u32',
          },
          {
            name: 'reserved1',
            type: 'publicKey',
          },
          {
            name: 'reserved2',
            type: 'u32',
          },
        ],
      },
    },
    {
      name: 'StakeRecord',
      type: {
        kind: 'struct',
        fields: [
          {
            name: 'stakeAccount',
            type: 'publicKey',
          },
          {
            name: 'lastUpdateDelegatedLamports',
            type: 'u64',
          },
          {
            name: 'lastUpdateEpoch',
            type: 'u64',
          },
          {
            name: 'isEmergencyUnstaking',
            type: 'u8',
          },
        ],
      },
    },
    {
      name: 'StakeList',
      type: {
        kind: 'struct',
        fields: [],
      },
    },
    {
      name: 'StakeSystem',
      type: {
        kind: 'struct',
        fields: [
          {
            name: 'stakeList',
            type: {
              defined: 'List',
            },
          },
          {
            name: 'delayedUnstakeCoolingDown',
            type: 'u64',
          },
          {
            name: 'stakeDepositBumpSeed',
            type: 'u8',
          },
          {
            name: 'stakeWithdrawBumpSeed',
            type: 'u8',
          },
          {
            name: 'slotsForStakeDelta',
            docs: [
              'set by admin, how much slots before the end of the epoch, stake-delta can start',
            ],
            type: 'u64',
          },
          {
            name: 'lastStakeDeltaEpoch',
            docs: [
              'Marks the start of stake-delta operations, meaning that if somebody starts a delayed-unstake ticket',
              'after this var is set with epoch_num the ticket will have epoch_created = current_epoch+1',
              '(the user must wait one more epoch, because their unstake-delta will be execute in this epoch)',
            ],
            type: 'u64',
          },
          {
            name: 'minStake',
            type: 'u64',
          },
          {
            name: 'extraStakeDeltaRuns',
            docs: [
              'can be set by validator-manager-auth to allow a second run of stake-delta to stake late stakers in the last minute of the epoch',
              "so we maximize user's rewards",
            ],
            type: 'u32',
          },
        ],
      },
    },
    {
      name: 'ValidatorRecord',
      type: {
        kind: 'struct',
        fields: [
          {
            name: 'validatorAccount',
            docs: ['Validator vote pubkey'],
            type: 'publicKey',
          },
          {
            name: 'activeBalance',
            docs: ['Validator total balance in lamports'],
            type: 'u64',
          },
          {
            name: 'score',
            type: 'u32',
          },
          {
            name: 'lastStakeDeltaEpoch',
            type: 'u64',
          },
          {
            name: 'duplicationFlagBumpSeed',
            type: 'u8',
          },
        ],
      },
    },
    {
      name: 'ValidatorList',
      type: {
        kind: 'struct',
        fields: [],
      },
    },
    {
      name: 'ValidatorSystem',
      type: {
        kind: 'struct',
        fields: [
          {
            name: 'validatorList',
            type: {
              defined: 'List',
            },
          },
          {
            name: 'managerAuthority',
            type: 'publicKey',
          },
          {
            name: 'totalValidatorScore',
            type: 'u32',
          },
          {
            name: 'totalActiveBalance',
            docs: ['sum of all active lamports staked'],
            type: 'u64',
          },
          {
            name: 'autoAddValidatorEnabled',
            docs: ['DEPRECATED, no longer used'],
            type: 'u8',
          },
        ],
      },
    },
  ],
  events: [
    {
      name: 'ChangeAuthorityEvent',
      fields: [
        {
          name: 'state',
          type: 'publicKey',
          index: false,
        },
        {
          name: 'adminChange',
          type: {
            option: {
              defined: 'PubkeyValueChange',
            },
          },
          index: false,
        },
        {
          name: 'validatorManagerChange',
          type: {
            option: {
              defined: 'PubkeyValueChange',
            },
          },
          index: false,
        },
        {
          name: 'operationalSolAccountChange',
          type: {
            option: {
              defined: 'PubkeyValueChange',
            },
          },
          index: false,
        },
        {
          name: 'treasuryStaderSolAccountChange',
          type: {
            option: {
              defined: 'PubkeyValueChange',
            },
          },
          index: false,
        },
        {
          name: 'pauseAuthorityChange',
          type: {
            option: {
              defined: 'PubkeyValueChange',
            },
          },
          index: false,
        },
      ],
    },
    {
      name: 'ConfigLpEvent',
      fields: [
        {
          name: 'state',
          type: 'publicKey',
          index: false,
        },
        {
          name: 'minFeeChange',
          type: {
            option: {
              defined: 'FeeValueChange',
            },
          },
          index: false,
        },
        {
          name: 'maxFeeChange',
          type: {
            option: {
              defined: 'FeeValueChange',
            },
          },
          index: false,
        },
        {
          name: 'liquidityTargetChange',
          type: {
            option: {
              defined: 'U64ValueChange',
            },
          },
          index: false,
        },
        {
          name: 'treasuryCutChange',
          type: {
            option: {
              defined: 'FeeValueChange',
            },
          },
          index: false,
        },
      ],
    },
    {
      name: 'ConfigStaderLiquidStakingEvent',
      fields: [
        {
          name: 'state',
          type: 'publicKey',
          index: false,
        },
        {
          name: 'rewardsFeeChange',
          type: {
            option: {
              defined: 'FeeValueChange',
            },
          },
          index: false,
        },
        {
          name: 'slotsForStakeDeltaChange',
          type: {
            option: {
              defined: 'U64ValueChange',
            },
          },
          index: false,
        },
        {
          name: 'minStakeChange',
          type: {
            option: {
              defined: 'U64ValueChange',
            },
          },
          index: false,
        },
        {
          name: 'minDepositChange',
          type: {
            option: {
              defined: 'U64ValueChange',
            },
          },
          index: false,
        },
        {
          name: 'minWithdrawChange',
          type: {
            option: {
              defined: 'U64ValueChange',
            },
          },
          index: false,
        },
        {
          name: 'stakingSolCapChange',
          type: {
            option: {
              defined: 'U64ValueChange',
            },
          },
          index: false,
        },
        {
          name: 'liquiditySolCapChange',
          type: {
            option: {
              defined: 'U64ValueChange',
            },
          },
          index: false,
        },
        {
          name: 'withdrawStakeAccountEnabledChange',
          type: {
            option: {
              defined: 'BoolValueChange',
            },
          },
          index: false,
        },
        {
          name: 'delayedUnstakeFeeChange',
          type: {
            option: {
              defined: 'FeeCentsValueChange',
            },
          },
          index: false,
        },
        {
          name: 'withdrawStakeAccountFeeChange',
          type: {
            option: {
              defined: 'FeeCentsValueChange',
            },
          },
          index: false,
        },
        {
          name: 'maxStakeMovedPerEpochChange',
          type: {
            option: {
              defined: 'FeeValueChange',
            },
          },
          index: false,
        },
      ],
    },
    {
      name: 'InitializeEvent',
      fields: [
        {
          name: 'state',
          type: 'publicKey',
          index: false,
        },
        {
          name: 'params',
          type: {
            defined: 'InitializeData',
          },
          index: false,
        },
        {
          name: 'stakeList',
          type: 'publicKey',
          index: false,
        },
        {
          name: 'validatorList',
          type: 'publicKey',
          index: false,
        },
        {
          name: 'staderSolMint',
          type: 'publicKey',
          index: false,
        },
        {
          name: 'operationalSolAccount',
          type: 'publicKey',
          index: false,
        },
        {
          name: 'lpMint',
          type: 'publicKey',
          index: false,
        },
        {
          name: 'lpStaderSolLeg',
          type: 'publicKey',
          index: false,
        },
        {
          name: 'treasuryStaderSolAccount',
          type: 'publicKey',
          index: false,
        },
      ],
    },
    {
      name: 'EmergencyPauseEvent',
      fields: [
        {
          name: 'state',
          type: 'publicKey',
          index: false,
        },
      ],
    },
    {
      name: 'ResumeEvent',
      fields: [
        {
          name: 'state',
          type: 'publicKey',
          index: false,
        },
      ],
    },
    {
      name: 'ReallocValidatorListEvent',
      fields: [
        {
          name: 'state',
          type: 'publicKey',
          index: false,
        },
        {
          name: 'count',
          type: 'u32',
          index: false,
        },
        {
          name: 'newCapacity',
          type: 'u32',
          index: false,
        },
      ],
    },
    {
      name: 'ReallocStakeListEvent',
      fields: [
        {
          name: 'state',
          type: 'publicKey',
          index: false,
        },
        {
          name: 'count',
          type: 'u32',
          index: false,
        },
        {
          name: 'newCapacity',
          type: 'u32',
          index: false,
        },
      ],
    },
    {
      name: 'DeactivateStakeEvent',
      fields: [
        {
          name: 'state',
          type: 'publicKey',
          index: false,
        },
        {
          name: 'epoch',
          type: 'u64',
          index: false,
        },
        {
          name: 'stakeIndex',
          type: 'u32',
          index: false,
        },
        {
          name: 'stakeAccount',
          type: 'publicKey',
          index: false,
        },
        {
          name: 'lastUpdateStakeDelegation',
          type: 'u64',
          index: false,
        },
        {
          name: 'splitStakeAccount',
          type: {
            option: {
              defined: 'SplitStakeAccountInfo',
            },
          },
          index: false,
        },
        {
          name: 'validatorIndex',
          type: 'u32',
          index: false,
        },
        {
          name: 'validatorVote',
          type: 'publicKey',
          index: false,
        },
        {
          name: 'totalStakeTarget',
          type: 'u64',
          index: false,
        },
        {
          name: 'validatorStakeTarget',
          type: 'u64',
          index: false,
        },
        {
          name: 'totalActiveBalance',
          type: 'u64',
          index: false,
        },
        {
          name: 'delayedUnstakeCoolingDown',
          type: 'u64',
          index: false,
        },
        {
          name: 'validatorActiveBalance',
          type: 'u64',
          index: false,
        },
        {
          name: 'totalUnstakeDelta',
          type: 'u64',
          index: false,
        },
        {
          name: 'unstakedAmount',
          type: 'u64',
          index: false,
        },
      ],
    },
    {
      name: 'MergeStakesEvent',
      fields: [
        {
          name: 'state',
          type: 'publicKey',
          index: false,
        },
        {
          name: 'epoch',
          type: 'u64',
          index: false,
        },
        {
          name: 'destinationStakeIndex',
          type: 'u32',
          index: false,
        },
        {
          name: 'destinationStakeAccount',
          type: 'publicKey',
          index: false,
        },
        {
          name: 'lastUpdateDestinationStakeDelegation',
          type: 'u64',
          index: false,
        },
        {
          name: 'sourceStakeIndex',
          type: 'u32',
          index: false,
        },
        {
          name: 'sourceStakeAccount',
          type: 'publicKey',
          index: false,
        },
        {
          name: 'lastUpdateSourceStakeDelegation',
          type: 'u64',
          index: false,
        },
        {
          name: 'validatorIndex',
          type: 'u32',
          index: false,
        },
        {
          name: 'validatorVote',
          type: 'publicKey',
          index: false,
        },
        {
          name: 'extraDelegated',
          type: 'u64',
          index: false,
        },
        {
          name: 'returnedStakeRent',
          type: 'u64',
          index: false,
        },
        {
          name: 'validatorActiveBalance',
          type: 'u64',
          index: false,
        },
        {
          name: 'totalActiveBalance',
          type: 'u64',
          index: false,
        },
        {
          name: 'operationalSolBalance',
          type: 'u64',
          index: false,
        },
      ],
    },
    {
      name: 'RedelegateEvent',
      fields: [
        {
          name: 'state',
          type: 'publicKey',
          index: false,
        },
        {
          name: 'epoch',
          type: 'u64',
          index: false,
        },
        {
          name: 'stakeIndex',
          type: 'u32',
          index: false,
        },
        {
          name: 'stakeAccount',
          type: 'publicKey',
          index: false,
        },
        {
          name: 'lastUpdateDelegation',
          type: 'u64',
          index: false,
        },
        {
          name: 'sourceValidatorIndex',
          type: 'u32',
          index: false,
        },
        {
          name: 'sourceValidatorVote',
          type: 'publicKey',
          index: false,
        },
        {
          name: 'sourceValidatorScore',
          type: 'u32',
          index: false,
        },
        {
          name: 'sourceValidatorBalance',
          type: 'u64',
          index: false,
        },
        {
          name: 'sourceValidatorStakeTarget',
          type: 'u64',
          index: false,
        },
        {
          name: 'destValidatorIndex',
          type: 'u32',
          index: false,
        },
        {
          name: 'destValidatorVote',
          type: 'publicKey',
          index: false,
        },
        {
          name: 'destValidatorScore',
          type: 'u32',
          index: false,
        },
        {
          name: 'destValidatorBalance',
          type: 'u64',
          index: false,
        },
        {
          name: 'destValidatorStakeTarget',
          type: 'u64',
          index: false,
        },
        {
          name: 'redelegateAmount',
          type: 'u64',
          index: false,
        },
        {
          name: 'splitStakeAccount',
          type: {
            option: {
              defined: 'SplitStakeAccountInfo',
            },
          },
          index: false,
        },
        {
          name: 'redelegateStakeIndex',
          type: 'u32',
          index: false,
        },
        {
          name: 'redelegateStakeAccount',
          type: 'publicKey',
          index: false,
        },
      ],
    },
    {
      name: 'StakeReserveEvent',
      fields: [
        {
          name: 'state',
          type: 'publicKey',
          index: false,
        },
        {
          name: 'epoch',
          type: 'u64',
          index: false,
        },
        {
          name: 'stakeIndex',
          type: 'u32',
          index: false,
        },
        {
          name: 'stakeAccount',
          type: 'publicKey',
          index: false,
        },
        {
          name: 'validatorIndex',
          type: 'u32',
          index: false,
        },
        {
          name: 'validatorVote',
          type: 'publicKey',
          index: false,
        },
        {
          name: 'totalStakeTarget',
          type: 'u64',
          index: false,
        },
        {
          name: 'validatorStakeTarget',
          type: 'u64',
          index: false,
        },
        {
          name: 'reserveBalance',
          type: 'u64',
          index: false,
        },
        {
          name: 'totalActiveBalance',
          type: 'u64',
          index: false,
        },
        {
          name: 'validatorActiveBalance',
          type: 'u64',
          index: false,
        },
        {
          name: 'totalStakeDelta',
          type: 'u64',
          index: false,
        },
        {
          name: 'amount',
          type: 'u64',
          index: false,
        },
      ],
    },
    {
      name: 'UpdateActiveEvent',
      fields: [
        {
          name: 'state',
          type: 'publicKey',
          index: false,
        },
        {
          name: 'epoch',
          type: 'u64',
          index: false,
        },
        {
          name: 'stakeIndex',
          type: 'u32',
          index: false,
        },
        {
          name: 'stakeAccount',
          type: 'publicKey',
          index: false,
        },
        {
          name: 'validatorIndex',
          type: 'u32',
          index: false,
        },
        {
          name: 'validatorVote',
          type: 'publicKey',
          index: false,
        },
        {
          name: 'delegationChange',
          type: {
            defined: 'U64ValueChange',
          },
          index: false,
        },
        {
          name: 'delegationGrowthStaderSolFees',
          type: {
            option: 'u64',
          },
          index: false,
        },
        {
          name: 'extraLamports',
          type: 'u64',
          index: false,
        },
        {
          name: 'extraStaderSolFees',
          type: {
            option: 'u64',
          },
          index: false,
        },
        {
          name: 'validatorActiveBalance',
          type: 'u64',
          index: false,
        },
        {
          name: 'totalActiveBalance',
          type: 'u64',
          index: false,
        },
        {
          name: 'staderSolPriceChange',
          type: {
            defined: 'U64ValueChange',
          },
          index: false,
        },
        {
          name: 'rewardFeeUsed',
          type: {
            defined: 'Fee',
          },
          index: false,
        },
        {
          name: 'totalVirtualStakedLamports',
          type: 'u64',
          index: false,
        },
        {
          name: 'staderSolSupply',
          type: 'u64',
          index: false,
        },
      ],
    },
    {
      name: 'UpdateDeactivatedEvent',
      fields: [
        {
          name: 'state',
          type: 'publicKey',
          index: false,
        },
        {
          name: 'epoch',
          type: 'u64',
          index: false,
        },
        {
          name: 'stakeIndex',
          type: 'u32',
          index: false,
        },
        {
          name: 'stakeAccount',
          type: 'publicKey',
          index: false,
        },
        {
          name: 'balanceWithoutRentExempt',
          type: 'u64',
          index: false,
        },
        {
          name: 'lastUpdateDelegatedLamports',
          type: 'u64',
          index: false,
        },
        {
          name: 'staderSolFees',
          type: {
            option: 'u64',
          },
          index: false,
        },
        {
          name: 'staderSolPriceChange',
          type: {
            defined: 'U64ValueChange',
          },
          index: false,
        },
        {
          name: 'rewardFeeUsed',
          type: {
            defined: 'Fee',
          },
          index: false,
        },
        {
          name: 'operationalSolBalance',
          type: 'u64',
          index: false,
        },
        {
          name: 'totalVirtualStakedLamports',
          type: 'u64',
          index: false,
        },
        {
          name: 'staderSolSupply',
          type: 'u64',
          index: false,
        },
      ],
    },
    {
      name: 'ClaimEvent',
      fields: [
        {
          name: 'state',
          type: 'publicKey',
          index: false,
        },
        {
          name: 'epoch',
          type: 'u64',
          index: false,
        },
        {
          name: 'ticket',
          type: 'publicKey',
          index: false,
        },
        {
          name: 'beneficiary',
          type: 'publicKey',
          index: false,
        },
        {
          name: 'circulatingTicketBalance',
          type: 'u64',
          index: false,
        },
        {
          name: 'circulatingTicketCount',
          type: 'u64',
          index: false,
        },
        {
          name: 'reserveBalance',
          type: 'u64',
          index: false,
        },
        {
          name: 'userBalance',
          type: 'u64',
          index: false,
        },
        {
          name: 'amount',
          type: 'u64',
          index: false,
        },
      ],
    },
    {
      name: 'OrderUnstakeEvent',
      fields: [
        {
          name: 'state',
          type: 'publicKey',
          index: false,
        },
        {
          name: 'ticketEpoch',
          type: 'u64',
          index: false,
        },
        {
          name: 'ticket',
          type: 'publicKey',
          index: false,
        },
        {
          name: 'beneficiary',
          type: 'publicKey',
          index: false,
        },
        {
          name: 'circulatingTicketBalance',
          type: 'u64',
          index: false,
        },
        {
          name: 'circulatingTicketCount',
          type: 'u64',
          index: false,
        },
        {
          name: 'userStaderSolBalance',
          type: 'u64',
          index: false,
        },
        {
          name: 'burnedStaderSolAmount',
          type: 'u64',
          index: false,
        },
        {
          name: 'solAmount',
          type: 'u64',
          index: false,
        },
        {
          name: 'feeBpCents',
          type: 'u32',
          index: false,
        },
        {
          name: 'totalVirtualStakedLamports',
          type: 'u64',
          index: false,
        },
        {
          name: 'staderSolSupply',
          type: 'u64',
          index: false,
        },
      ],
    },
    {
      name: 'AddLiquidityEvent',
      fields: [
        {
          name: 'state',
          type: 'publicKey',
          index: false,
        },
        {
          name: 'solOwner',
          type: 'publicKey',
          index: false,
        },
        {
          name: 'userSolBalance',
          type: 'u64',
          index: false,
        },
        {
          name: 'userLpBalance',
          type: 'u64',
          index: false,
        },
        {
          name: 'solLegBalance',
          type: 'u64',
          index: false,
        },
        {
          name: 'lpSupply',
          type: 'u64',
          index: false,
        },
        {
          name: 'solAddedAmount',
          type: 'u64',
          index: false,
        },
        {
          name: 'lpMinted',
          type: 'u64',
          index: false,
        },
        {
          name: 'totalVirtualStakedLamports',
          type: 'u64',
          index: false,
        },
        {
          name: 'staderSolSupply',
          type: 'u64',
          index: false,
        },
      ],
    },
    {
      name: 'LiquidUnstakeEvent',
      fields: [
        {
          name: 'state',
          type: 'publicKey',
          index: false,
        },
        {
          name: 'staderSolOwner',
          type: 'publicKey',
          index: false,
        },
        {
          name: 'liqPoolSolBalance',
          type: 'u64',
          index: false,
        },
        {
          name: 'liqPoolStaderSolBalance',
          type: 'u64',
          index: false,
        },
        {
          name: 'treasuryStaderSolBalance',
          type: {
            option: 'u64',
          },
          index: false,
        },
        {
          name: 'userStaderSolBalance',
          type: 'u64',
          index: false,
        },
        {
          name: 'userSolBalance',
          type: 'u64',
          index: false,
        },
        {
          name: 'staderSolAmount',
          type: 'u64',
          index: false,
        },
        {
          name: 'staderSolFee',
          type: 'u64',
          index: false,
        },
        {
          name: 'treasuryStaderSolCut',
          type: 'u64',
          index: false,
        },
        {
          name: 'solAmount',
          type: 'u64',
          index: false,
        },
        {
          name: 'lpLiquidityTarget',
          type: 'u64',
          index: false,
        },
        {
          name: 'lpMaxFee',
          type: {
            defined: 'Fee',
          },
          index: false,
        },
        {
          name: 'lpMinFee',
          type: {
            defined: 'Fee',
          },
          index: false,
        },
        {
          name: 'treasuryCut',
          type: {
            defined: 'Fee',
          },
          index: false,
        },
      ],
    },
    {
      name: 'RemoveLiquidityEvent',
      fields: [
        {
          name: 'state',
          type: 'publicKey',
          index: false,
        },
        {
          name: 'solLegBalance',
          type: 'u64',
          index: false,
        },
        {
          name: 'staderSolLegBalance',
          type: 'u64',
          index: false,
        },
        {
          name: 'userLpBalance',
          type: 'u64',
          index: false,
        },
        {
          name: 'userSolBalance',
          type: 'u64',
          index: false,
        },
        {
          name: 'userStaderSolBalance',
          type: 'u64',
          index: false,
        },
        {
          name: 'lpMintSupply',
          type: 'u64',
          index: false,
        },
        {
          name: 'lpBurned',
          type: 'u64',
          index: false,
        },
        {
          name: 'solOutAmount',
          type: 'u64',
          index: false,
        },
        {
          name: 'staderSolOutAmount',
          type: 'u64',
          index: false,
        },
      ],
    },
    {
      name: 'AddValidatorEvent',
      fields: [
        {
          name: 'state',
          type: 'publicKey',
          index: false,
        },
        {
          name: 'validator',
          type: 'publicKey',
          index: false,
        },
        {
          name: 'index',
          type: 'u32',
          index: false,
        },
        {
          name: 'score',
          type: 'u32',
          index: false,
        },
      ],
    },
    {
      name: 'RemoveValidatorEvent',
      fields: [
        {
          name: 'state',
          type: 'publicKey',
          index: false,
        },
        {
          name: 'validator',
          type: 'publicKey',
          index: false,
        },
        {
          name: 'index',
          type: 'u32',
          index: false,
        },
        {
          name: 'operationalSolBalance',
          type: 'u64',
          index: false,
        },
      ],
    },
    {
      name: 'SetValidatorScoreEvent',
      fields: [
        {
          name: 'state',
          type: 'publicKey',
          index: false,
        },
        {
          name: 'validator',
          type: 'publicKey',
          index: false,
        },
        {
          name: 'index',
          type: 'u32',
          index: false,
        },
        {
          name: 'scoreChange',
          type: {
            defined: 'U32ValueChange',
          },
          index: false,
        },
      ],
    },
    {
      name: 'DepositStakeAccountEvent',
      fields: [
        {
          name: 'state',
          type: 'publicKey',
          index: false,
        },
        {
          name: 'stake',
          type: 'publicKey',
          index: false,
        },
        {
          name: 'delegated',
          type: 'u64',
          index: false,
        },
        {
          name: 'withdrawer',
          type: 'publicKey',
          index: false,
        },
        {
          name: 'stakeIndex',
          type: 'u32',
          index: false,
        },
        {
          name: 'validator',
          type: 'publicKey',
          index: false,
        },
        {
          name: 'validatorIndex',
          type: 'u32',
          index: false,
        },
        {
          name: 'validatorActiveBalance',
          type: 'u64',
          index: false,
        },
        {
          name: 'totalActiveBalance',
          type: 'u64',
          index: false,
        },
        {
          name: 'userStaderSolBalance',
          type: 'u64',
          index: false,
        },
        {
          name: 'staderSolMinted',
          type: 'u64',
          index: false,
        },
        {
          name: 'totalVirtualStakedLamports',
          type: 'u64',
          index: false,
        },
        {
          name: 'staderSolSupply',
          type: 'u64',
          index: false,
        },
      ],
    },
    {
      name: 'DepositEvent',
      fields: [
        {
          name: 'state',
          type: 'publicKey',
          index: false,
        },
        {
          name: 'solOwner',
          type: 'publicKey',
          index: false,
        },
        {
          name: 'userSolBalance',
          type: 'u64',
          index: false,
        },
        {
          name: 'userStaderSolBalance',
          type: 'u64',
          index: false,
        },
        {
          name: 'solLegBalance',
          type: 'u64',
          index: false,
        },
        {
          name: 'staderSolLegBalance',
          type: 'u64',
          index: false,
        },
        {
          name: 'reserveBalance',
          type: 'u64',
          index: false,
        },
        {
          name: 'solSwapped',
          type: 'u64',
          index: false,
        },
        {
          name: 'staderSolSwapped',
          type: 'u64',
          index: false,
        },
        {
          name: 'solDeposited',
          type: 'u64',
          index: false,
        },
        {
          name: 'staderSolMinted',
          type: 'u64',
          index: false,
        },
        {
          name: 'totalVirtualStakedLamports',
          type: 'u64',
          index: false,
        },
        {
          name: 'staderSolSupply',
          type: 'u64',
          index: false,
        },
      ],
    },
    {
      name: 'WithdrawStakeAccountEvent',
      fields: [
        {
          name: 'state',
          type: 'publicKey',
          index: false,
        },
        {
          name: 'epoch',
          type: 'u64',
          index: false,
        },
        {
          name: 'stake',
          type: 'publicKey',
          index: false,
        },
        {
          name: 'lastUpdateStakeDelegation',
          type: 'u64',
          index: false,
        },
        {
          name: 'stakeIndex',
          type: 'u32',
          index: false,
        },
        {
          name: 'validator',
          type: 'publicKey',
          index: false,
        },
        {
          name: 'validatorIndex',
          type: 'u32',
          index: false,
        },
        {
          name: 'userStaderSolBalance',
          type: 'u64',
          index: false,
        },
        {
          name: 'userStaderSolAuth',
          type: 'publicKey',
          index: false,
        },
        {
          name: 'staderSolBurned',
          type: 'u64',
          index: false,
        },
        {
          name: 'staderSolFees',
          type: 'u64',
          index: false,
        },
        {
          name: 'splitStake',
          type: 'publicKey',
          index: false,
        },
        {
          name: 'beneficiary',
          type: 'publicKey',
          index: false,
        },
        {
          name: 'splitLamports',
          type: 'u64',
          index: false,
        },
        {
          name: 'feeBpCents',
          type: 'u32',
          index: false,
        },
        {
          name: 'totalVirtualStakedLamports',
          type: 'u64',
          index: false,
        },
        {
          name: 'staderSolSupply',
          type: 'u64',
          index: false,
        },
      ],
    },
  ],
  errors: [
    {
      code: 6000,
      name: 'WrongReserveOwner',
      msg: 'Wrong reserve owner. Must be a system account',
    },
    {
      code: 6001,
      name: 'NonEmptyReserveData',
      msg: 'Reserve must have no data, but has data',
    },
    {
      code: 6002,
      name: 'InvalidInitialReserveLamports',
      msg: 'Invalid initial reserve lamports',
    },
    {
      code: 6003,
      name: 'ZeroValidatorChunkSize',
      msg: 'Zero validator chunk size',
    },
    {
      code: 6004,
      name: 'TooBigValidatorChunkSize',
      msg: 'Too big validator chunk size',
    },
    {
      code: 6005,
      name: 'ZeroCreditChunkSize',
      msg: 'Zero credit chunk size',
    },
    {
      code: 6006,
      name: 'TooBigCreditChunkSize',
      msg: 'Too big credit chunk size',
    },
    {
      code: 6007,
      name: 'TooLowCreditFee',
      msg: 'Too low credit fee',
    },
    {
      code: 6008,
      name: 'InvalidMintAuthority',
      msg: 'Invalid mint authority',
    },
    {
      code: 6009,
      name: 'MintHasInitialSupply',
      msg: 'Non empty initial mint supply',
    },
    {
      code: 6010,
      name: 'InvalidOwnerFeeState',
      msg: 'Invalid owner fee state',
    },
    {
      code: 6011,
      name: 'InvalidProgramId',
      msg: 'Invalid program id. For using program from another account please update id in the code',
    },
    {
      code: 6012,
      name: 'UnexpectedAccount',
      msg: 'Unexpected account',
    },
    {
      code: 6013,
      name: 'CalculationFailure',
      msg: 'Calculation failure',
    },
    {
      code: 6014,
      name: 'StakeAccountWithLockup',
      msg: "You can't deposit a stake-account with lockup",
    },
    {
      code: 6015,
      name: 'MinStakeIsTooLow',
      msg: 'Min stake is too low',
    },
    {
      code: 6016,
      name: 'LpMaxFeeIsTooHigh',
      msg: 'Lp max fee is too high',
    },
    {
      code: 6017,
      name: 'BasisPointsOverflow',
      msg: 'Basis points overflow',
    },
    {
      code: 6018,
      name: 'LpFeesAreWrongWayRound',
      msg: 'LP min fee > LP max fee',
    },
    {
      code: 6019,
      name: 'LiquidityTargetTooLow',
      msg: 'Liquidity target too low',
    },
    {
      code: 6020,
      name: 'TicketNotDue',
      msg: 'Ticket not due. Wait more epochs',
    },
    {
      code: 6021,
      name: 'TicketNotReady',
      msg: 'Ticket not ready. Wait a few hours and try again',
    },
    {
      code: 6022,
      name: 'WrongBeneficiary',
      msg: 'Wrong Ticket Beneficiary',
    },
    {
      code: 6023,
      name: 'StakeAccountNotUpdatedYet',
      msg: 'Stake Account not updated yet',
    },
    {
      code: 6024,
      name: 'StakeNotDelegated',
      msg: 'Stake Account not delegated',
    },
    {
      code: 6025,
      name: 'StakeAccountIsEmergencyUnstaking',
      msg: 'Stake Account is emergency unstaking',
    },
    {
      code: 6026,
      name: 'InsufficientLiquidity',
      msg: 'Insufficient Liquidity in the Liquidity Pool',
    },
    {
      code: 6027,
      name: 'NotUsed6027',
    },
    {
      code: 6028,
      name: 'InvalidAdminAuthority',
      msg: 'Invalid admin authority',
    },
    {
      code: 6029,
      name: 'InvalidValidatorManager',
      msg: 'Invalid validator system manager',
    },
    {
      code: 6030,
      name: 'InvalidStakeListDiscriminator',
      msg: 'Invalid stake list account discriminator',
    },
    {
      code: 6031,
      name: 'InvalidValidatorListDiscriminator',
      msg: 'Invalid validator list account discriminator',
    },
    {
      code: 6032,
      name: 'TreasuryCutIsTooHigh',
      msg: 'Treasury cut is too high',
    },
    {
      code: 6033,
      name: 'RewardsFeeIsTooHigh',
      msg: 'Reward fee is too high',
    },
    {
      code: 6034,
      name: 'StakingIsCapped',
      msg: 'Staking is capped',
    },
    {
      code: 6035,
      name: 'LiquidityIsCapped',
      msg: 'Liquidity is capped',
    },
    {
      code: 6036,
      name: 'UpdateWindowIsTooLow',
      msg: 'Update window is too low',
    },
    {
      code: 6037,
      name: 'MinWithdrawIsTooHigh',
      msg: 'Min withdraw is too high',
    },
    {
      code: 6038,
      name: 'WithdrawAmountIsTooLow',
      msg: 'Withdraw amount is too low',
    },
    {
      code: 6039,
      name: 'DepositAmountIsTooLow',
      msg: 'Deposit amount is too low',
    },
    {
      code: 6040,
      name: 'NotEnoughUserFunds',
      msg: 'Not enough user funds',
    },
    {
      code: 6041,
      name: 'WrongTokenOwnerOrDelegate',
      msg: 'Wrong token owner or delegate',
    },
    {
      code: 6042,
      name: 'TooEarlyForStakeDelta',
      msg: 'Too early for stake delta',
    },
    {
      code: 6043,
      name: 'RequiredDelegatedStake',
      msg: 'Required delegated stake',
    },
    {
      code: 6044,
      name: 'RequiredActiveStake',
      msg: 'Required active stake',
    },
    {
      code: 6045,
      name: 'RequiredDeactivatingStake',
      msg: 'Required deactivating stake',
    },
    {
      code: 6046,
      name: 'DepositingNotActivatedStake',
      msg: 'Depositing not activated stake',
    },
    {
      code: 6047,
      name: 'TooLowDelegationInDepositingStake',
      msg: 'Too low delegation in the depositing stake',
    },
    {
      code: 6048,
      name: 'WrongStakeBalance',
      msg: 'Wrong deposited stake balance',
    },
    {
      code: 6049,
      name: 'WrongValidatorAccountOrIndex',
      msg: 'Wrong validator account or index',
    },
    {
      code: 6050,
      name: 'WrongStakeAccountOrIndex',
      msg: 'Wrong stake account or index',
    },
    {
      code: 6051,
      name: 'UnstakingOnPositiveDelta',
      msg: 'Delta stake is positive so we must stake instead of unstake',
    },
    {
      code: 6052,
      name: 'StakingOnNegativeDelta',
      msg: 'Delta stake is negative so we must unstake instead of stake',
    },
    {
      code: 6053,
      name: 'MovingStakeIsCapped',
      msg: 'Moving stake during an epoch is capped',
    },
    {
      code: 6054,
      name: 'StakeMustBeUninitialized',
      msg: 'Stake must be uninitialized',
    },
    {
      code: 6055,
      name: 'DestinationStakeMustBeDelegated',
      msg: 'Destination stake must be delegated',
    },
    {
      code: 6056,
      name: 'DestinationStakeMustNotBeDeactivating',
      msg: 'Destination stake must not be deactivating',
    },
    {
      code: 6057,
      name: 'DestinationStakeMustBeUpdated',
      msg: 'Destination stake must be updated',
    },
    {
      code: 6058,
      name: 'InvalidDestinationStakeDelegation',
      msg: 'Invalid destination stake delegation',
    },
    {
      code: 6059,
      name: 'SourceStakeMustBeDelegated',
      msg: 'Source stake must be delegated',
    },
    {
      code: 6060,
      name: 'SourceStakeMustNotBeDeactivating',
      msg: 'Source stake must not be deactivating',
    },
    {
      code: 6061,
      name: 'SourceStakeMustBeUpdated',
      msg: 'Source stake must be updated',
    },
    {
      code: 6062,
      name: 'InvalidSourceStakeDelegation',
      msg: 'Invalid source stake delegation',
    },
    {
      code: 6063,
      name: 'InvalidDelayedUnstakeTicket',
      msg: 'Invalid delayed unstake ticket',
    },
    {
      code: 6064,
      name: 'ReusingDelayedUnstakeTicket',
      msg: 'Reusing delayed unstake ticket',
    },
    {
      code: 6065,
      name: 'EmergencyUnstakingFromNonZeroScoredValidator',
      msg: 'Emergency unstaking from non zero scored validator',
    },
    {
      code: 6066,
      name: 'WrongValidatorDuplicationFlag',
      msg: 'Wrong validator duplication flag',
    },
    {
      code: 6067,
      name: 'RedepositingStaderStake',
      msg: 'Redepositing stader-stake',
    },
    {
      code: 6068,
      name: 'RemovingValidatorWithBalance',
      msg: 'Removing validator with balance',
    },
    {
      code: 6069,
      name: 'RedelegateOverTarget',
      msg: 'Redelegate will put validator over stake target',
    },
    {
      code: 6070,
      name: 'SourceAndDestValidatorsAreTheSame',
      msg: 'Source and Dest Validators are the same',
    },
    {
      code: 6071,
      name: 'UnregisteredStaderSolMinted',
      msg: 'Some staderSOL tokens was minted outside of stader liquid staking contract',
    },
    {
      code: 6072,
      name: 'UnregisteredLPMinted',
      msg: 'Some LP tokens was minted outside of stader liquid staking contract',
    },
    {
      code: 6073,
      name: 'ListIndexOutOfBounds',
      msg: 'List index out of bounds',
    },
    {
      code: 6074,
      name: 'ListOverflow',
      msg: 'List overflow',
    },
    {
      code: 6075,
      name: 'AlreadyPaused',
      msg: 'Requested pause and already Paused',
    },
    {
      code: 6076,
      name: 'NotPaused',
      msg: 'Requested resume, but not Paused',
    },
    {
      code: 6077,
      name: 'ProgramIsPaused',
      msg: 'Emergency Pause is Active',
    },
    {
      code: 6078,
      name: 'InvalidPauseAuthority',
      msg: 'Invalid pause authority',
    },
    {
      code: 6079,
      name: 'SelectedStakeAccountHasNotEnoughFunds',
      msg: 'Selected Stake account has not enough funds',
    },
    {
      code: 6080,
      name: 'BasisPointCentsOverflow',
      msg: 'Basis point CENTS overflow',
    },
    {
      code: 6081,
      name: 'WithdrawStakeAccountIsNotEnabled',
      msg: 'Withdraw stake account is not enabled',
    },
    {
      code: 6082,
      name: 'WithdrawStakeAccountFeeIsTooHigh',
      msg: 'Withdraw stake account fee is too high',
    },
    {
      code: 6083,
      name: 'DelayedUnstakeFeeIsTooHigh',
      msg: 'Delayed unstake fee is too high',
    },
    {
      code: 6084,
      name: 'WithdrawStakeLamportsIsTooLow',
      msg: 'Withdraw stake account value is too low',
    },
    {
      code: 6085,
      name: 'StakeAccountRemainderTooLow',
      msg: 'Stake account remainder too low',
    },
    {
      code: 6086,
      name: 'ShrinkingListWithDeletingContents',
      msg: "Capacity of the list must be not less than it's current size",
    },
  ],
};
