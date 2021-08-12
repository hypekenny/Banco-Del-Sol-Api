import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type AccountDocument = Account & Document;

export interface balanceType {
  amount: number;
  history: transactionType[];
}

export interface transactionType {
  email: string;
  type: string;
  value: number;
  date: Date;
}

@Schema()
export class Account {
  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true })
  balance: balanceType;

  @Prop({ required: true })
  cvu: string;
}

export const AccountSchema = SchemaFactory.createForClass(Account);
