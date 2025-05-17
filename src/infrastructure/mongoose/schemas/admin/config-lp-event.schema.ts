import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ConfigLpEventDocument = ConfigLpEvent & Document;

class Fraction{
  @Prop({required:true})
  numerator:number;
  @Prop({required:true})
  denominator:number;
}

class FractionChange{
  @Prop({required:true})
  oldValue:Fraction;

  @Prop({required:true})
  newValue:Fraction;
}

class NumberChange{
  @Prop({required:true})
  oldValue:number;

  @Prop({required:true})
  newValue:number;
}

@Schema()
export class ConfigLpEvent {
  @Prop({ required: true })
  state: string;

  @Prop({ type:FractionChange,required: false })
  minFeeChange: FractionChange | null;

  @Prop({ type:FractionChange,required: false })
  maxFeeChange:FractionChange | null;

  @Prop({ type:NumberChange,required: false })
  liquidityTargetChange: NumberChange | null;

  @Prop({ type:FractionChange,required: false })
  treasuryCutChange: FractionChange| null;
}

export const ConfigLpEventSchema = SchemaFactory.createForClass(ConfigLpEvent); 