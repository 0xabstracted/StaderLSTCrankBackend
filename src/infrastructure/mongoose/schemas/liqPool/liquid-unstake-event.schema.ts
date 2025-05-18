import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type LiquidUnstakeEventDocument = LiquidUnstakeEvent & Document;

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

@Schema()
export class LiquidUnstakeEvent {
  @Prop({ required: true })
  state: string;

  @Prop({ required: true })
  staderSolOwner: string;

  @Prop({ required: true })
  liqPoolSolBalance: number;

  @Prop({ required: true })
  liqPoolStaderSolBalance: number;

  @Prop({ required: false })
  treasuryStaderSolBalance: number | null;

  @Prop({ required: true })
  userStaderSolBalance: number;

  @Prop({ required: true })
  userSolBalance: number;

  @Prop({ required: true })
  staderSolAmount: number;

  @Prop({ required: true })
  staderSolFee: number;

  @Prop({ required: true })
  treasuryStaderSolCut: number;

  @Prop({ required: true })
  solAmount: number;

  @Prop({ required: true })
  lpLiquidityTarget: number;

  @Prop({ type: FractionChange, required: true })
  lpMaxFee: FractionChange | null;

  @Prop({ type: FractionChange, required: true })
  lpMinFee: FractionChange | null;

  @Prop({ type: FractionChange, required: true })
  treasuryCut: FractionChange | null;
}

export const LiquidUnstakeEventSchema =
  SchemaFactory.createForClass(LiquidUnstakeEvent);
