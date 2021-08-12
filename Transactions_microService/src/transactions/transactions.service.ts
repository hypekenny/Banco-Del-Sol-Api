import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { TransactionDocument } from './transactions.model';

@Injectable()
export class TransactionsService {
  constructor(
    @InjectModel('Transactions')
    private readonly transactionModel: Model<TransactionDocument>,
  ) {}

  // async getTransactions(email: string);
}
