import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AccountService } from '../account/account.service';
import { Repository } from 'typeorm';
import { Transactions, TransactionDocument } from './transactions.entity';

@Injectable()
export class TransactionsService {
  constructor(
    @InjectRepository(Transactions)
    private readonly transactionRepository: Repository<TransactionDocument>,
    private readonly accountService: AccountService,
  ) {}

  async getTransactions(email: string): Promise<Transactions[]> {
    const transactions = await this.transactionRepository.find({
      senderEmail: email,
    });
    return transactions;
  }

  async createTransaction(newTransaction: Transactions) {
    try {
      const response = await this.accountService.updateAccount(newTransaction);
      let succeeded = false;
      if (response) succeeded = true;
      await this.transactionRepository.insert({
        senderEmail: newTransaction.senderEmail,
        receiverEmail: newTransaction.receiverEmail,
        value: newTransaction.value,
        type: newTransaction.type,
        comment: newTransaction.comment,
        date: Date(),
        succeeded,
      });
      return response;
    } catch (error) {
      console.log(error);
    }
  }

  // async createTransaction(newTransaction: Transaction) {
  //   try {
  //     const transaction = await this.transactionModel.create({
  //       senderEmail: newTransaction.senderEmail,
  //       receiverEmail: newTransaction.receiverEmail,
  //       value: newTransaction.value,
  //       type: newTransaction.type,
  //       date: Date(),
  //     });
  //     const response = await this.accountService.updateAccount(transaction);
  //     return response;
  //   } catch (error) {
  //     console.log(error);
  //   }
  // }
}
