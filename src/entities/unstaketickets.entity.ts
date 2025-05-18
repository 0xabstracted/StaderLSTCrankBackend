import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('unstake_tickets')
export class UnstakeTickets {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 255 })
  state: string;

  @Column({ type: 'varchar', length: 255 })
  ticket: string;

  @Column({ type: 'bigint' })
  ticketCreatedEpoch: number;

  @Column({ type: 'varchar', length: 255 })
  beneficiary: string;

  @Column({
    type: 'bigint',
    transformer: {
      to: (value: bigint) => value.toString(),
      from: (value: string) => BigInt(value),
    },
  })
  solAmount: bigint;

  @Column({
    type: 'bigint',
    transformer: {
      to: (value: bigint) => value.toString(),
      from: (value: string) => BigInt(value),
    },
  })
  claimableTime: bigint;

  @Column({ type: 'boolean', default: false })
  claimed: boolean;

  @Column({
    type: 'timestamp',
    nullable: true,
    default: null,
    comment: 'Timestamp when the ticket was claimed',
  })
  claimedTime: Date | null;

  @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;

  @UpdateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
    onUpdate: 'CURRENT_TIMESTAMP',
  })
  updated_at: Date;
}
