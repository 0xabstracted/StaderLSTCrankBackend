import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type InitializeEventDocument = InitializeEvent & Document;

@Schema()
export class InitializeEvent {
  @Prop({ required: true })
  state: string;

  // @Prop({ required: true })
  // params: {
  //   // Define the structure of InitializeData here

  // };

  @Prop({ required: true })
  stakeList: string;

  @Prop({ required: true })
  validatorList: string;

  @Prop({ required: true })
  staderSolMint: string;

  @Prop({ required: true })
  operationalSolAccount: string;

  @Prop({ required: true })
  lpMint: string;

  @Prop({ required: true })
  lpStaderSolLeg: string;

  @Prop({ required: true })
  treasuryStaderSolAccount: string;
}

export const InitializeEventSchema = SchemaFactory.createForClass(InitializeEvent); 