import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type StakeReserveEventDocument = StakeReserveEvent & Document;

@Schema()
export class StakeReserveEvent {
  @Prop({ required: true })
  state: string;

  @Prop({ required: true })
  epoch: number;

  @Prop({ required: true })
  stakeIndex: number;

  @Prop({ required: true })
  stakeAccount: string;

  @Prop({ required: true })
  validatorIndex: number;

  @Prop({ required: true })
  validatorVote: string;

  @Prop({ required: true })
  totalStakeTarget: number;

  @Prop({ required: true })
  validatorStakeTarget: number;

  @Prop({ required: true })
  reserveBalance: number;

  @Prop({ required: true })
  totalActiveBalance: number;

  @Prop({ required: true })
  validatorActiveBalance: number;

  @Prop({ required: true })
  totalStakeDelta: number;

  @Prop({ required: true })
  amount: number;
}

export const StakeReserveEventSchema = SchemaFactory.createForClass(StakeReserveEvent);