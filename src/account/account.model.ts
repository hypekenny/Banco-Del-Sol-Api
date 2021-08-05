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
  @Prop({ required: true })
  _id: string;

  @Prop({ required: true, default: 0 })
  balance: number;

  @Prop({ required: true })
  cvu: string;

  @Prop({ default: 'peso', enum: Currency })
  currency: Currency;
}

export const AccountSchema = SchemaFactory.createForClass(Account);
