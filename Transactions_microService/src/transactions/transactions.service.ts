import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { AccountService } from '../account/account.service';
import { TransactionDocument, Transaction } from './transactions.model';

@Injectable()
export class TransactionsService {
  constructor(
    @InjectModel('Transaction')
    private readonly transactionModel: Model<TransactionDocument>,
    private accountService: AccountService,
  ) {}

  async getTransactions(email: string): Promise<Transaction[]> {
    const transactions = await this.transactionModel.find({
      senderEmail: email,
    });
    return transactions;
  }

  async createTransaction(newTransaction: Transaction) {
    try {
      const transaction = await this.transactionModel.create({
        senderEmail: newTransaction.senderEmail,
        receiverEmail: newTransaction.receiverEmail,
        value: newTransaction.value,
        type: newTransaction.type,
        date: Date(),
      });
      const response = await this.accountService.updateAccount(transaction);
      return response;
    } catch (error) {
      console.log(error);
    }
  }
}
