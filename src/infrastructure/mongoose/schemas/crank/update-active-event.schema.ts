import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UpdateActiveEventDocument = UpdateActiveEvent & Document;
class Fraction {
  @Prop({ required: true })
  numerator: number;
  @Prop({ required: true })
  denominator: number;
}

class FractionChange {
  @Prop({ required: true })
  oldValue: Fraction;

  @Prop({ required: true })
  newValue: Fraction;
}

class NumberChange {
  @Prop({ required: true })
  oldValue: number;

  @Prop({ required: true })
  newValue: number;
}

@Schema()
export class UpdateActiveEvent {
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

  @Prop({ type: FractionChange, required: true })
  delegationChange: FractionChange | null;

  @Prop({ required: false })
  delegationGrowthStaderSolFees: number | null;

  @Prop({ required: true })
  extraLamports: number;

  @Prop({ required: false })
  extraStaderSolFees: number | null;

  @Prop({ required: true })
  validatorActiveBalance: number;

  @Prop({ required: true })
  totalActiveBalance: number;

  @Prop({ type: NumberChange, required: true })
  staderSolPriceChange: NumberChange | null;

  @Prop({ type: FractionChange, required: true })
  rewardFeeUsed: FractionChange | null;

  @Prop({ required: true })
  totalVirtualStakedLamports: number;

  @Prop({ required: true })
  staderSolSupply: number;
}

export const UpdateActiveEventSchema =
  SchemaFactory.createForClass(UpdateActiveEvent);
