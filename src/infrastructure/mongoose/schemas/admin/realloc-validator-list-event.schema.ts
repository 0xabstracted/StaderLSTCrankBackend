import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ReallocValidatorListEventDocument = ReallocValidatorListEvent &
  Document;

@Schema()
export class ReallocValidatorListEvent {
  @Prop({ required: true })
  state: string;

  @Prop({ required: true })
  count: number;

  @Prop({ required: true })
  newCapacity: number;
}

export const ReallocValidatorListEventSchema = SchemaFactory.createForClass(
  ReallocValidatorListEvent,
);
