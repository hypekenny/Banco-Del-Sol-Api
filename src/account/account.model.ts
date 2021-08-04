import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type AccountDocument = Account & Document;

export enum Currency {
  usd = 'usd',
  peso = 'peso',
  real = 'real',
}

@Schema()
export class Account {
  @Prop()
  _id: string;

  @Prop()
  balance: number;

  @Prop()
  cvu: string;

  @Prop()
  currency: Currency;
}

export const AccountSchema = SchemaFactory.createForClass(Account);
