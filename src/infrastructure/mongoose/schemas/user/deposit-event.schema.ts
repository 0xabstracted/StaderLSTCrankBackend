import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type DepositEventDocument = DepositEvent & Document;

@Schema()
export class DepositEvent {
  @Prop({ required: true })
  state: string;

  @Prop({ required: true })
  solOwner: string;

  @Prop({ required: true })
  userSolBalance: number;

  @Prop({ required: true })
  userStaderSolBalance: number;

  @Prop({ required: true })
  solLegBalance: number;

  @Prop({ required: true })
  staderSolLegBalance: number;

  @Prop({ required: true })
  reserveBalance: number;

  @Prop({ required: true })
  solSwapped: number;

  @Prop({ required: true })
  staderSolSwapped: number;

  @Prop({ required: true })
  solDeposited: number;

  @Prop({ required: true })
  staderSolMinted: number;

  @Prop({ required: true })
  totalVirtualStakedLamports: number;

  @Prop({ required: true })
  staderSolSupply: number;
}

export const DepositEventSchema = SchemaFactory.createForClass(DepositEvent);