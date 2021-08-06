import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Account, AccountDocument, Currency } from './account.model';
import { Model } from 'mongoose';
import { AccountController } from './account.controller';

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

  async getBalance(id: string): Promise<number> {
    try {
      const account = await this.accountModel.findById(id);
      console.log(account);
      return account.balance;
    } catch (error) {
      console.log(error);
    }
  }

  async getAccount(id: string): Promise<Account> {
    try {
      const account = await this.accountModel.findById(id);
      return account;
    } catch (error) {
      console.log(error);
    }
  }

  async createAccount(id, account: Account): Promise<Account> {
    try {
      const newAccount = new this.accountModel({
        ...account,
        _id: id,
        cvu: createCvu(),
      });
      return await newAccount.save();
    } catch (error) {
      console.log(error);
    }
  }

  async modifyBalance(id: string, balance: number): Promise<number> {
    try {
      const updatedBalance = await this.accountModel.findByIdAndUpdate(
        id,
        {
          ...Account,
          balance: balance,
        },
        { new: true },
      );
      return updatedBalance.balance;
    } catch (error) {
      console.log(error);
    }
  }

  async getCvu(id: string): Promise<string> {
    try {
      const account = await this.accountModel.findById(id);
      return account.cvu;
    } catch (error) {
      console.log(error);
    }
  }
}
