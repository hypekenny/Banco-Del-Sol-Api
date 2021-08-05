import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UserDocument = User & Document;

interface address {
  street: string;
  number: number;
  zipCode: number;
  city: string;
  province: string;
  country: string;
}

@Schema()
export class User {
  @Prop({ required: true, unique: true })
  dni: number;

  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  lastName: string;

  @Prop({ required: true })
  birthdate: string;

  @Prop({ required: true, unique: true })
  phoneNumber: string;

  @Prop({ type: Object })
  address: address;
}

export const UserSchema = SchemaFactory.createForClass(User);
