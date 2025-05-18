import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ClaimEventDocument = ClaimEvent & Document;

@Schema()
export class ClaimEvent {
  @Prop({ required: true })
  state: string;

  @Prop({ required: true })
  epoch: number;

  @Prop({ required: true })
  ticket: string;

  @Prop({ required: true })
  beneficiary: string;

  @Prop({ required: true })
  circulatingTicketBalance: number;

  @Prop({ required: true })
  circulatingTicketCount: number;

  @Prop({ required: true })
  reserveBalance: number;

  @Prop({ required: true })
  userBalance: number;

  @Prop({ required: true })
  amount: number;
}

export const ClaimEventSchema = SchemaFactory.createForClass(ClaimEvent);
