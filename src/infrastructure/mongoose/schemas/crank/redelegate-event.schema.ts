import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type RedelegateEventDocument = RedelegateEvent & Document;

class SplitStakeAccount{
  @Prop({required:true})
  account:string;
  @Prop({required:true})
  index:number
}

@Schema()
export class RedelegateEvent {
  @Prop({ required: true })
  state: string;

  @Prop({ required: true })
  epoch: number;

  @Prop({ required: true })
  stakeIndex: number;

  @Prop({ required: true })
  stakeAccount: string;

  @Prop({ required: true })
  lastUpdateDelegation: number;

  @Prop({ required: true })
  sourceValidatorIndex: number;

  @Prop({ required: true })
  sourceValidatorVote: string;

  @Prop({ required: true })
  sourceValidatorScore: number;

  @Prop({ required: true })
  sourceValidatorBalance: number;

  @Prop({ required: true })
  sourceValidatorStakeTarget: number;

  @Prop({ required: true })
  destValidatorIndex: number;

  @Prop({ required: true })
  destValidatorVote: string;

  @Prop({ required: true })
  destValidatorScore: number;

  @Prop({ required: true })
  destValidatorBalance: number;

  @Prop({ required: true })
  destValidatorStakeTarget: number;

  @Prop({ required: true })
  redelegateAmount: number;

  @Prop({ required: false })
  splitStakeAccount: SplitStakeAccount | null;

  @Prop({ required: true })
  redelegateStakeIndex: number;

  @Prop({ required: true })
  redelegateStakeAccount: string;
}

export const RedelegateEventSchema = SchemaFactory.createForClass(RedelegateEvent); 