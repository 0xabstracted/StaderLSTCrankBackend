import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('validators')
export class Validator {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 255 })
  account: string;

  @Column({ type: 'varchar', length: 255 })
  voteAccount: string;

  @Column({ type: 'varchar', length: 500, nullable: true })
  wwwUrl: string;

  @Column({ type: 'text', nullable: true })
  details: string;

  @Column({ type: 'boolean', default: false })
  jito: boolean;

  @Column({ type: 'boolean', default: true })
  isActive: boolean;

  @Column({ type: 'varchar', length: 500, nullable: true })
  avatarFileUrl: string;

  @Column({ type: 'bigint', nullable: true })
  activeStake: number;

  @Column({ type: 'smallint', nullable: true })
  commission: number;

  @Column({ type: 'boolean', default: false })
  delinquent: boolean;

  @Column({ type: 'varchar', length: 50, nullable: true })
  softwareVersion: string;

  @Column({ type: 'varchar', length: 50, nullable: true })
  ip: string;

  @Column({ type: 'varchar', length: 100, nullable: true })
  dataCenterKey: string;

  @Column({ type: 'varchar', length: 50, nullable: true })
  latitude: string;

  @Column({ type: 'varchar', length: 50, nullable: true })
  longitude: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  dataCenterHost: string;

  @Column({ type: 'bigint', nullable: true })
  epochCredits: number;

  @Column({ type: 'int', nullable: true })
  skippedSlots: number;

  @Column({ type: 'decimal', precision: 5, scale: 4, nullable: true })
  skippedSlotPercent: number;

  @Column({ type: 'smallint', nullable: true })
  totalScore: number;

  @Column({ type: 'int', nullable: true })
  protocol_vec_index: number;

  @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;

  @UpdateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
    onUpdate: 'CURRENT_TIMESTAMP',
  })
  updated_at: Date;
}
