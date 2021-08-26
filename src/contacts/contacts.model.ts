import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ContactsDocument = Contacts & Document;

@Schema()
export class Contacts {
  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  lastName: string;

  @Prop({ required: true })
  cvu: string;
}

export const ContactsSchema = SchemaFactory.createForClass(Contacts);
