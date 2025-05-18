import {
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  Column,
} from 'typeorm';

@Entity('stakedelegation')
export class StakeDelegation {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 255 })
  stakeAccount: string;

  @Column({ type: 'int' })
  stakeAcIndex: number;

  @Column({ type: 'varchar', length: 255 })
  validatorAccount: string;

  @Column({ type: 'int' })
  validatorAcIndex: number;

  @Column({
    type: 'bigint',
    nullable: true,
    transformer: {
      to: (value: bigint) => value.toString(),
      from: (value: string) => BigInt(value),
    },
  })
  stakedAmount: bigint;

  @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @UpdateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
    onUpdate: 'CURRENT_TIMESTAMP',
  })
  updatedAt: Date;
}
