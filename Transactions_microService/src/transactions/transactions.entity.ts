import { Column, Entity, ObjectIdColumn, ObjectID } from 'typeorm';

export type TransactionDocument = Transactions & Document;

@Entity()
export class Transactions {
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
