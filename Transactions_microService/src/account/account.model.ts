import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type AccountDocument = Account & Document;

@Schema()
export class Account {
  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true, default: 0 })
  balance: number;

  @Prop({ required: true })
  cvu: string;
}

export const AccountSchema = SchemaFactory.createForClass(Account);
