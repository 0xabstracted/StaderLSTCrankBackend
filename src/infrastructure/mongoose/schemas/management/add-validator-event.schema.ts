import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type AddValidatorEventDocument = AddValidatorEvent & Document;

@Schema()
export class AddValidatorEvent {
  @Prop({ required: true })
  validatorId: string;

  @Prop({ required: true })
  timestamp: Date;

  @Prop({ required: true })
  state: string;

  @Prop({ required: true })
  validator: string;

  @Prop({ required: true })
  index: number;

  @Prop({ required: true })
  score: number;
}

export const AddValidatorEventSchema = SchemaFactory.createForClass(AddValidatorEvent);