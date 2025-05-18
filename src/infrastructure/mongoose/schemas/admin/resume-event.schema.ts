import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ResumeEventDocument = ResumeEvent & Document;

@Schema()
export class ResumeEvent {
  @Prop({ required: true })
  state: string;
}

export const ResumeEventSchema = SchemaFactory.createForClass(ResumeEvent);
