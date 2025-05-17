import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type RemoveValidatorEventDocument = RemoveValidatorEvent & Document;

@Schema()
export class RemoveValidatorEvent {
  @Prop({ required: true })
  state: string; // Represents Pubkey as a string

  @Prop({ required: true })
  validator: string; // Represents Pubkey as a string

  @Prop({ required: true })
  index: number; // u32 mapped to number

  @Prop({ required: true })
  operationalSolBalance: number; // u64 mapped to number

  // Add other relevant fields if necessary
}

export const RemoveValidatorEventSchema = SchemaFactory.createForClass(RemoveValidatorEvent);