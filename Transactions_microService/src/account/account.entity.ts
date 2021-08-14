import {
  Column,
  Entity,
  ObjectID,
  ObjectIdColumn,
  PrimaryColumn,
} from 'typeorm';

export type AccountDocument = Accounts & Document;

export type balanceType = {
  amount: number;
  history: Array<transactionType>;
};

export type transactionType = {
  senderEmail: string;
  receiverEmail: string;
  type: string;
  value: number;
  date: Date;
};

@Entity()
export class Accounts {
  @ObjectIdColumn()
  public _id: ObjectID;

  @PrimaryColumn()
  email: string;

  @Column()
  balance: balanceType;

  @Column()
  cvu: string;
}

// import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
// import { Document } from 'mongoose';

// export type AccountDocument = Account & Document;

// export type balanceType = {
//   amount: number;
//   history: Array<transactionType>;
// };

// export type transactionType = {
//   senderEmail: string;
//   receiverEmail: string;
//   type: string;
//   value: number;
//   date: Date;
// };

// @Schema()
// export class Account {
//   @Prop({ required: true, unique: true })
//   email: string;

//   @Prop({ required: true, type: Object })
//   balance: balanceType;

//   @Prop({ required: true })
//   cvu: string;
// }

// export const AccountSchema = SchemaFactory.createForClass(Account);
