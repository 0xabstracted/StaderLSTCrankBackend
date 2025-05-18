import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
} from 'typeorm';

@Entity('state_metrics')
export class StateMetrics {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  state: string;

  @Column()
  currentEpoch: number;

  @Column({
    type: 'bigint',
    transformer: {
      to: (value: bigint) => value.toString(),
      from: (value: string) => BigInt(value),
    },
  })
  delayedUnstakeCoolingDown: bigint;

  @Column({
    type: 'bigint',
    transformer: {
      to: (value: bigint) => value.toString(),
      from: (value: string) => BigInt(value),
    },
  })
  emergencyCoolingDown: bigint;

  @Column({
    type: 'bigint',
    transformer: {
      to: (value: bigint) => value.toString(),
      from: (value: string) => BigInt(value),
    },
  })
  availableReserveBalance: bigint;

  @Column()
  validatorIndex: number;

  @Column()
  validatorVote: string;

  @Column({
    type: 'bigint',
    transformer: {
      to: (value: bigint) => value.toString(),
      from: (value: string) => BigInt(value),
    },
  })
  validatorActiveBalance: bigint;

  @Column({
    type: 'bigint',
    transformer: {
      to: (value: bigint) => value.toString(),
      from: (value: string) => BigInt(value),
    },
  })
  totalActiveBalance: bigint;

  @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;
}
