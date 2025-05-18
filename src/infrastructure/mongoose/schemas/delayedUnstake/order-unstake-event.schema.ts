import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type OrderUnstakeEventDocument = OrderUnstakeEvent & Document;

@Schema()
export class OrderUnstakeEvent {
  @Prop({ required: true })
  state: string;

  @Prop({ required: true })
  ticketEpoch: number;

  @Prop({ required: true })
  ticket: string;

  @Prop({ required: true })
  beneficiary: string;

  @Prop({ required: true })
  circulatingTicketBalance: number;

  @Prop({ required: true })
  circulatingTicketCount: number;

  @Prop({ required: true })
  userStaderSolBalance: number;

  @Prop({ required: true })
  burnedStaderSolAmount: number;

  @Prop({ required: true })
  solAmount: number;

  @Prop({ required: true })
  feeBpCents: number;

  @Prop({ required: true })
  totalVirtualStakedLamports: number;

  @Prop({ required: true })
  staderSolSupply: number;
}

export const OrderUnstakeEventSchema =
  SchemaFactory.createForClass(OrderUnstakeEvent);
