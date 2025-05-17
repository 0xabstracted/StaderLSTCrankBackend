import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type AddLiquidityEventDocument = AddLiquidityEvent & Document;

@Schema()
export class AddLiquidityEvent {
  @Prop({ required: true })
  state: string;

  @Prop({ required: true })
  solOwner: string;

  @Prop({ required: true })
  userSolBalance: number;

  @Prop({ required: true })
  userLpBalance: number;

  @Prop({ required: true })
  solLegBalance: number;

  @Prop({ required: true })
  lpSupply: number;

  @Prop({ required: true })
  solAddedAmount: number;

  @Prop({ required: true })
  lpMinted: number;

  @Prop({ required: true })
  totalVirtualStakedLamports: number;

  @Prop({ required: true })
  staderSolSupply: number;
}

export const AddLiquidityEventSchema = SchemaFactory.createForClass(AddLiquidityEvent); 