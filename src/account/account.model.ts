import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type AccountDocument = Account & Document;

interface balanceType {
  amount: number;
  history: Array<transactionType>;
}

interface transactionType {
  email: string;
  type: string;
  value: number;
  date: Date;
}

@Schema()
export class Account {
  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true, default: 0 })
  balance: balanceType;

  @Prop({ required: true })
  cvu: string;
}

export const AccountSchema = SchemaFactory.createForClass(Account);
