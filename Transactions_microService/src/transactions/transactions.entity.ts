import { Column, Entity, ObjectIdColumn, ObjectID } from 'typeorm';

export type TransactionDocument = Transaction & Document;

@Entity()
export class Transaction {
  @ObjectIdColumn()
  id: ObjectID;

  @Column()
  senderEmail: string;

  @Column()
  receiverEmail: string;

  @Column()
  value: number;

  @Column()
  type: string;

  @Column()
  date: Date;
}
