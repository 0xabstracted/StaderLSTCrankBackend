import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type SetValidatorScoreEventDocument = SetValidatorScoreEvent & Document;

@Schema()
export class SetValidatorScoreEvent {
  @Prop({ required: true })
  state: string; // Represents Pubkey as a string

  @Prop({ required: true })
  validator: string; // Represents Pubkey as a string

  @Prop({ required: true })
  index: number; // u32 mapped to number

  @Prop({ required: true })
  scoreChange: number; // U32ValueChange mapped to number

  // Add other relevant fields if necessary
}

export const SetValidatorScoreEventSchema = SchemaFactory.createForClass(
  SetValidatorScoreEvent,
);
