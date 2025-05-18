import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ChangeAuthorityEventDocument = ChangeAuthorityEvent & Document;

class AuthorityChange {
  old: string;
  new: string;
}

@Schema()
export class ChangeAuthorityEvent {
  @Prop({ required: true })
  state: string;

  @Prop({ type: AuthorityChange, required: false })
  adminChange: AuthorityChange | null;

  @Prop({ type: AuthorityChange, required: false })
  validatorManagerChange: AuthorityChange | null;

  @Prop({ type: AuthorityChange, required: false })
  operationalSolAccountChange: AuthorityChange | null;

  @Prop({ type: AuthorityChange, required: false })
  treasuryStaderSolAccountChange: AuthorityChange | null;

  @Prop({ type: AuthorityChange, required: false })
  pauseAuthorityChange: AuthorityChange | null;
}

export const ChangeAuthorityEventSchema =
  SchemaFactory.createForClass(ChangeAuthorityEvent);
