import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type TransactionDocument = Transaction & Document;

@Schema()
export class Transaction {
  @Prop({ required: true, unique: true })
  sender_email: string;

  @Prop({ required: true })
  receiver_email: string;

  @Prop({ required: true })
  receiver_account: string;

  @Prop({ required: true })
  amount: number;
}

export const TransactiontSchema = SchemaFactory.createForClass(Transaction);
