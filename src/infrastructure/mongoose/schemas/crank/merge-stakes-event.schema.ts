import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type MergeStakesEventDocument = MergeStakesEvent & Document;

@Schema()
export class MergeStakesEvent {
  @Prop({ required: true })
  state: string;

  @Prop({ required: true })
  epoch: number;

  @Prop({ required: true })
  destinationStakeIndex: number;

  @Prop({ required: true })
  destinationStakeAccount: string;

  @Prop({ required: true })
  lastUpdateDestinationStakeDelegation: number;

  @Prop({ required: true })
  sourceStakeIndex: number;

  @Prop({ required: true })
  sourceStakeAccount: string;

  @Prop({ required: true })
  lastUpdateSourceStakeDelegation: number;

  @Prop({ required: true })
  validatorIndex: number;

  @Prop({ required: true })
  validatorVote: string;

  @Prop({ required: true })
  extraDelegated: number;

  @Prop({ required: true })
  returnedStakeRent: number;

  @Prop({ required: true })
  validatorActiveBalance: number;

  @Prop({ required: true })
  totalActiveBalance: number;

  @Prop({ required: true })
  operationalSolBalance: number;
}

export const MergeStakesEventSchema =
  SchemaFactory.createForClass(MergeStakesEvent);
