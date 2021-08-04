import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Account, AccountDocument, Currency } from './account.model';
import { Model } from 'mongoose';
import { AccountController } from './account.controller';

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

  async createAccount(id, account: Account): Promise<Account> {
    const newAccount = new this.accountModel({ ...account, _id: id });
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
