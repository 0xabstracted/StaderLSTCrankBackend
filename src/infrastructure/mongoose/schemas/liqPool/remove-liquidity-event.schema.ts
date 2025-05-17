import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type RemoveLiquidityEventDocument = RemoveLiquidityEvent & Document;

@Schema()
export class RemoveLiquidityEvent {
  @Prop({ required: true })
  state: string;

  @Prop({ required: true })
  solLegBalance: number;

  @Prop({ required: true })
  staderSolLegBalance: number;

  @Prop({ required: true })
  userLpBalance: number;

  @Prop({ required: true })
  userSolBalance: number;

  @Prop({ required: true })
  userStaderSolBalance: number;

  @Prop({ required: true })
  lpMintSupply: number;

  @Prop({ required: true })
  lpBurned: number;

  @Prop({ required: true })
  solOutAmount: number;

  @Prop({ required: true })
  staderSolOutAmount: number;
}

export const RemoveLiquidityEventSchema = SchemaFactory.createForClass(RemoveLiquidityEvent); 