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
    const account = await this.accountModel.findById(id);
    console.log(account);
    return account.balance;
  }

  async getAccount(id: string): Promise<Account> {
    const account = await this.accountModel.findById(id);
    return account;
  }

  async createAccount(id, account: Account): Promise<Account> {
    const newAccount = new this.accountModel({
      ...account,
      _id: id,
      cvu: createCvu(),
    });
    return await newAccount.save();
  }

  async modifyBalance(id: string, balance: number): Promise<number> {
    const updatedBalance = await this.accountModel.findByIdAndUpdate(
      id,
      {
        ...Account,
        balance: balance,
      },
      { new: true },
    );
    return updatedBalance.balance;
  }

  async getCvu(id: string): Promise<string> {
    const account = await this.accountModel.findById(id);
    return account.cvu;
  }
}
