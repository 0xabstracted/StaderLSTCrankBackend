import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UpdateDeactivatedEventDocument = UpdateDeactivatedEvent & Document;

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
export class UpdateDeactivatedEvent {
  @Prop({ required: true })
  state: string;

  @Prop({ required: true })
  epoch: number;

  @Prop({ required: true })
  stakeIndex: number;

  @Prop({ required: true })
  stakeAccount: string;

  @Prop({ required: true })
  balanceWithoutRentExempt: number;

  @Prop({ required: true })
  lastUpdateDelegatedLamports: number;

  @Prop({ required: false })
  staderSolFees: number | null;

  @Prop({ type: NumberChange, required: true })
  staderSolPriceChange: NumberChange | null;

  @Prop({ type: FractionChange, required: true })
  rewardFeeUsed: FractionChange | null;

  @Prop({ required: true })
  operationalSolBalance: number;

  @Prop({ required: true })
  totalVirtualStakedLamports: number;

  @Prop({ required: true })
  staderSolSupply: number;
}

export const UpdateDeactivatedEventSchema = SchemaFactory.createForClass(
  UpdateDeactivatedEvent,
);
