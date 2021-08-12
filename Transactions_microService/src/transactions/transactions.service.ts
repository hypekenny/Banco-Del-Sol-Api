import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { TransactionDocument, Transaction } from './transactions.model';

@Injectable()
export class TransactionsService {
  constructor(
    @InjectModel('Transaction')
    private readonly transactionModel: Model<TransactionDocument>,
  ) {}

  async getTransactions(email: string): Promise<Transaction[]> {
    const transactions = await this.transactionModel.find({
      sender_email: email,
    });
    return transactions;
  }

  async createTransaction(newTransaction: Transaction) {
    try {
      const transaction = await this.transactionModel.create({
        sender_email: newTransaction.sender_email,
        receiver_email: newTransaction.receiver_email,
        amount: newTransaction.amount,
        type: newTransaction.type,
        date: Date(),
      });
      console.log('AAAAAAAAAAA', transaction);
      return transaction;
    } catch (error) {
      console.log(error);
    }
  }
}
