import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

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

  @Prop()
  address: address;
}

export const UserSchema = SchemaFactory.createForClass(User);
