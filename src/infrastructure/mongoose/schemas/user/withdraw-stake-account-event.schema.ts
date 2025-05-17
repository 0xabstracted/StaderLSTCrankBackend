import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type WithdrawStakeAccountEventDocument = WithdrawStakeAccountEvent & Document;

@Schema()
export class WithdrawStakeAccountEvent {
  @Prop({ required: true })
  state: string;

  @Prop({ required: true })
  epoch: number;

  @Prop({ required: true })
  stake: string;

  @Prop({ required: true })
  lastUpdateStakeDelegation: number;

  @Prop({ required: true })
  stakeIndex: number;

  @Prop({ required: true })
  validator: string;

  @Prop({ required: true })
  validatorIndex: number;

  @Prop({ required: true })
  userStaderSolBalance: number;

  @Prop({ required: true })
  userStaderSolAuth: string;

  @Prop({ required: true })
  staderSolBurned: number;

  @Prop({ required: true })
  staderSolFees: number;

  @Prop({ required: true })
  splitStake: string;

  @Prop({ required: true })
  beneficiary: string;

  @Prop({ required: true })
  splitLamports: number;

  @Prop({ required: true })
  feeBpCents: number;

  @Prop({ required: true })
  totalVirtualStakedLamports: number;

  @Prop({ required: true })
  staderSolSupply: number;
}

export const WithdrawStakeAccountEventSchema = SchemaFactory.createForClass(WithdrawStakeAccountEvent);