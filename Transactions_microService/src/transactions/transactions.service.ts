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

  async getTransaction(email: string): Promise<Transactions[]> {
    const transactions = await this.transactionRepository.find({
      senderEmail: email,
    });
    return transactions;
  }

  async getAllTransactions(): Promise<Transactions[]> {
    const allTransactions = await this.transactionRepository.find();
    return allTransactions;
  }

  async createTransaction(newTransaction: Transactions) {
    try {
      const newTran = await this.transactionRepository.insert({
        senderEmail: newTransaction.senderEmail,
        receiverEmail: newTransaction.receiverEmail,
        value: newTransaction.value,
        type: newTransaction.type,
        comment: newTransaction.comment,
        date: Date(),
        condition: 'pending',
      });
      const response = await this.updateTransactionService(
        newTran.identifiers[0].id,
        'accepted',
        true,
      );
      return response;
    } catch (error) {
      console.error(error);
    }
  }

  async updateTransactionService(
    id: string,
    condition: string,
    cheat: boolean,
  ) {
    try {
      if (condition === 'accepted') {
        const foundTransaction = await this.transactionRepository.findOne(id);
        foundTransaction.condition = 'completed';
        const transactionResponse = await this.accountService.updateAccount(
          foundTransaction,
        );
        if (transactionResponse === undefined) throw new Error();
        let succeeded = 'failed';
        if (transactionResponse) succeeded = 'completed';
        foundTransaction.condition = succeeded;
        await this.transactionRepository.save(foundTransaction);
        if (succeeded === 'failed' && cheat) return 'Transacción fallida';
        if (succeeded === 'completed' && cheat) return 'Transacción realizada';
        const allTransactions = await this.getAllTransactions();
        return allTransactions;
      }
      if (condition === 'declined') {
        const foundTransaction = await this.transactionRepository.findOne(id);
        foundTransaction.condition = 'declined';
        await this.transactionRepository.save(foundTransaction);
        if (cheat) return 'Transacción rechazada';
        const allTransactions = await this.getAllTransactions();
        return allTransactions;
      }
    } catch (error) {
      console.error(error);
    }
  }
}
