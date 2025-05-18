import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ConfigStaderLiquidStakingEventDocument =
  ConfigStaderLiquidStakingEvent & Document;
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
export class ConfigStaderLiquidStakingEvent {
  @Prop({ required: true })
  state: string;

  @Prop({ type: FractionChange, required: false })
  rewardsFeeChange: FractionChange | null;

  @Prop({ type: NumberChange, required: false })
  slotsForStakeDeltaChange: NumberChange | null;

  @Prop({ type: NumberChange, required: false })
  minStakeChange: NumberChange | null;

  @Prop({ type: NumberChange, required: false })
  minDepositChange: NumberChange | null;

  @Prop({ type: NumberChange, required: false })
  minWithdrawChange: NumberChange | null;

  @Prop({ type: NumberChange, required: false })
  stakingSolCapChange: NumberChange | null;

  @Prop({ type: NumberChange, required: false })
  liquiditySolCapChange: NumberChange | null;

  @Prop({ type: NumberChange, required: false })
  withdrawStakeAccountEnabledChange: NumberChange | null;

  @Prop({ type: NumberChange, required: false })
  delayedUnstakeFeeChange: NumberChange | null;

  @Prop({ type: NumberChange, required: false })
  withdrawStakeAccountFeeChange: NumberChange | null;

  @Prop({ type: FractionChange, required: false })
  maxStakeMovedPerEpochChange: FractionChange | null;
}

export const ConfigStaderLiquidStakingEventSchema =
  SchemaFactory.createForClass(ConfigStaderLiquidStakingEvent);
