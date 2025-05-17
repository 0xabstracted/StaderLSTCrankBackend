import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ReallocStakeListEventDocument = ReallocStakeListEvent & Document;

@Schema()
export class ReallocStakeListEvent {
  @Prop({ required: true })
  state: string;

  @Prop({ required: true })
  count: number;

  @Prop({ required: true })
  newCapacity: number;
}

export const ReallocStakeListEventSchema = SchemaFactory.createForClass(ReallocStakeListEvent); 