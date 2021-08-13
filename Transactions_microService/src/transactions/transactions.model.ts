import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type TransactionDocument = Transaction & Document;

@Schema()
export class Transaction {
  @Prop({ required: true })
  senderEmail: string;

  @Prop({ required: true })
  receiverEmail: string;

  @Prop({ required: true })
  value: number;

  @Prop({ required: true })
  type: string;

  @Prop({ required: true })
  date: Date;
}

export const TransactionSchema = SchemaFactory.createForClass(Transaction);
