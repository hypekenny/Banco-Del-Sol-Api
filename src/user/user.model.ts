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
  @Prop()
  dni: number;

  @Prop()
  name: string;

  @Prop()
  lastName: string;

  @Prop()
  birthdate: string;

  @Prop()
  phoneNumber: string;

  @Prop({ type: Object })
  address: address;
}

export const UserSchema = SchemaFactory.createForClass(User);
