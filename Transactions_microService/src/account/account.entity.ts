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
  date: string;
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
