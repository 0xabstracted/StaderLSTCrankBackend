import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
} from 'typeorm';

@Entity('stader_sol_price_history')
export class StaderSolPriceHistory {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  state: string;

  @Column()
  currentEpoch: number;

  @Column()
  stakeIndex: number;

  @Column()
  stakeAccount: string;

  @Column({
    type: 'bigint',
    transformer: {
      to: (value: bigint) => value.toString(),
      from: (value: string) => BigInt(value),
    },
  })
  oldDelegatedLamports: bigint;

  @Column({
    type: 'bigint',
    transformer: {
      to: (value: bigint) => value.toString(),
      from: (value: string) => BigInt(value),
    },
    nullable: true,
    comment: 'Only present in UpdateActiveEvent',
  })
  newDelegatedLamports: bigint;

  @Column({
    type: 'bigint',
    transformer: {
      to: (value: bigint) => value.toString(),
      from: (value: string) => BigInt(value),
    },
    nullable: true,
    comment:
      'extraLamports + newDelegatedLamports in UpdateActiveEvent, stakeBalanceWithoutRent in UpdateDeactivatedEvent',
  })
  stakeBalanceWithoutRent: bigint;

  @Column({
    type: 'bigint',
    transformer: {
      to: (value: bigint) => value.toString(),
      from: (value: string) => BigInt(value),
    },
    nullable: true,
    comment:
      'delegationGrowthStaderSolFees in UpdateActiveEvent, staderSolFees in UpdateDeactivatedEvent',
  })
  staderSolFees: bigint;

  @Column({
    type: 'bigint',
    transformer: {
      to: (value: bigint) => value.toString(),
      from: (value: string) => BigInt(value),
    },
    nullable: true,
    comment: 'Only present in UpdateActiveEvent',
  })
  extraLamports: bigint;

  @Column({
    type: 'bigint',
    transformer: {
      to: (value: bigint) => value.toString(),
      from: (value: string) => BigInt(value),
    },
    nullable: true,
    comment: 'Only present in UpdateActiveEvent',
  })
  extraStaderSolFees: bigint;

  @Column({
    type: 'decimal',
    precision: 20,
    scale: 10,
    transformer: {
      to: (value: number) => value,
      from: (value: string) => Number(value),
    },
  })
  oldStaderSolPrice: number;

  @Column({
    type: 'decimal',
    precision: 20,
    scale: 10,
    transformer: {
      to: (value: number) => value,
      from: (value: string) => Number(value),
    },
  })
  newStaderSolPrice: number;

  @Column({
    type: 'bigint',
    transformer: {
      to: (value: bigint | null) => (value === null ? null : value.toString()),
      from: (value: string | null) => (value === null ? null : BigInt(value)),
    },
  })
  rewardFeeUsed: bigint;

  @Column({
    type: 'bigint',
    transformer: {
      to: (value: bigint | null) => (value === null ? null : value.toString()),
      from: (value: string | null) => (value === null ? null : BigInt(value)),
    },
  })
  staderSolSupply: bigint;

  @Column({
    type: 'bigint',
    transformer: {
      to: (value: bigint | null) => (value === null ? null : value.toString()),
      from: (value: string | null) => (value === null ? null : BigInt(value)),
    },
  })
  totalVirtualStakedLamports: bigint;

  @Column({
    type: 'bigint',
    nullable: true,
    transformer: {
      to: (value: bigint | null) => (value === null ? null : value.toString()),
      from: (value: string | null) => (value === null ? null : BigInt(value)),
    },
  })
  operationalSolBalance: bigint | null;

  @Column({ default: false })
  isDeactivateEvent: boolean;

  @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;
}
