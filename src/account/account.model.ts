import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { AnyFilesInterceptor } from '@nestjs/platform-express';
import { Document } from 'mongoose';
import { isObject } from 'util';

export type AccountDocument = Account & Document;

export type balanceType = {
  amount: number;
  history: Array<transactionType>;
};

export type transactionType = {
  email: string;
  type: string;
  value: number;
  date: Date;
};

@Schema()
export class Account {
  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true, type: Object })
  balance: balanceType;

  @Prop({ required: true })
  cvu: string;
}

export const AccountSchema = SchemaFactory.createForClass(Account);
