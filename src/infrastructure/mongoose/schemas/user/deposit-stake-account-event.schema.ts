import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type DepositStakeAccountEventDocument = DepositStakeAccountEvent &
  Document;

@Schema()
export class DepositStakeAccountEvent {
  @Prop({ required: true })
  state: string;

  @Prop({ required: true })
  stake: string;

  @Prop({ required: true })
  delegated: number;

  @Prop({ required: true })
  withdrawer: string;

  @Prop({ required: true })
  stakeIndex: number;

  @Prop({ required: true })
  validator: string;

  @Prop({ required: true })
  validatorIndex: number;

  @Prop({ required: true })
  validatorActiveBalance: number;

  @Prop({ required: true })
  totalActiveBalance: number;

  @Prop({ required: true })
  userStaderSolBalance: number;

  @Prop({ required: true })
  staderSolMinted: number;

  @Prop({ required: true })
  totalVirtualStakedLamports: number;

  @Prop({ required: true })
  staderSolSupply: number;
}

export const DepositStakeAccountEventSchema = SchemaFactory.createForClass(
  DepositStakeAccountEvent,
);
