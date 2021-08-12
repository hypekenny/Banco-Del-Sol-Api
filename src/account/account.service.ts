import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Account, AccountDocument, transactionType } from './account.model';
import { Model } from 'mongoose';

interface newTransactionType {
  value: number;
  transaction: transactionType;
}

const createCvu = () => {
  const a = Math.random() * 10 ** 23;
  const b = a.toLocaleString('fullwide', { useGrouping: false });
  return b;
};

@Injectable()
export class AccountService {
  constructor(
    @InjectModel('Account')
    private readonly accountModel: Model<AccountDocument>,
  ) {}

  async getAccount(email: string): Promise<Account> {
    try {
      const findAccount = await this.accountModel.findOne({
        email: email,
      });
      return findAccount;
    } catch (error) {
      console.log(error);
    }
  }

  async createAccount(user: Account): Promise<Account> {
    try {
      const newAccount = new this.accountModel({
        email: user.email,
        cvu: createCvu(),
        balance: { amount: 0, history: [] },
      });
      return await newAccount.save();
    } catch (error) {
      console.log(error);
    }
  }

  async updateAccount(email: string, newTransaction: newTransactionType) {
    try {
      const findAccount = await this.accountModel.findOneAndUpdate(
        {
          email,
        },
        {
          amount: newTransaction.value,
          $push: {
            history: newTransaction.transaction,
          },
        },
        {
          new: true,
          useFindAndModify: false,
        },
      );
      return findAccount;
    } catch (error) {
      console.log(error);
    }
  }
}

// balance: { amount: newTransaction.balance },
// $push: { history: newTransaction.transaction },
