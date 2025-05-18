import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type EmergencyPauseEventDocument = EmergencyPauseEvent & Document;

@Schema()
export class EmergencyPauseEvent {
  @Prop({ required: true })
  state: string;
}

export const EmergencyPauseEventSchema =
  SchemaFactory.createForClass(EmergencyPauseEvent);
