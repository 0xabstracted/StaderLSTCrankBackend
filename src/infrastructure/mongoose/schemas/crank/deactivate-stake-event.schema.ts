import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type DeactivateStakeEventDocument = DeactivateStakeEvent & Document;

class StakeAccount {
  account: string;
  index: number;
}

@Schema()
export class DeactivateStakeEvent {
  @Prop({ required: true })
  state: string;

  @Prop({ required: true })
  epoch: number;

  @Prop({ required: true })
  stakeIndex: number;

  @Prop({ required: true })
  stakeAccount: string;

  @Prop({ required: true })
  lastUpdateStakeDelegation: number;

  @Prop({ type: StakeAccount, required: false })
  splitStakeAccount: StakeAccount | null;

  @Prop({ required: true })
  validatorIndex: number;

  @Prop({ required: true })
  validatorVote: string;

  @Prop({ required: true })
  totalStakeTarget: number;

  @Prop({ required: true })
  validatorStakeTarget: number;

  @Prop({ required: true })
  totalActiveBalance: number;

  @Prop({ required: true })
  delayedUnstakeCoolingDown: number;

  @Prop({ required: true })
  validatorActiveBalance: number;

  @Prop({ required: true })
  totalUnstakeDelta: number;

  @Prop({ required: true })
  unstakedAmount: number;
}

export const DeactivateStakeEventSchema =
  SchemaFactory.createForClass(DeactivateStakeEvent);
