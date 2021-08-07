import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Account, AccountDocument } from './account.model';
import { Model } from 'mongoose';

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

  async getAccount(account: Account): Promise<Account> {
    try {
      const findAccount = await this.accountModel.findOne({
        email: account.email,
      });
      return findAccount;
    } catch (error) {
      console.log(error);
    }
  }

  async createAccount(account: Account): Promise<Account> {
    try {
      const newAccount = new this.accountModel({
        ...account,
        email: account.email,
        cvu: createCvu(),
      });
      return await newAccount.save();
    } catch (error) {
      console.log(error);
    }
  }

  async updateAccount(account: Account) {
    try {
      const findAccount = await this.accountModel.findOneAndUpdate({
        email: account.email,
        account,
      });
      return findAccount;
    } catch (error) {
      console.log(error);
    }
  }
}
