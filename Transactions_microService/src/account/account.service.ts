import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Account, AccountDocument, transactionType } from './account.model';
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

  async updateAccount(tran: transactionType) {
    try {
      let updateSender = {};
      if (tran.receiver_email === tran.sender_email) {
        const findSender = await this.accountModel.findOne({
          email: tran.sender_email,
        });
        findSender.balance.amount += tran.value;
        findSender.balance.history.push(tran);
        updateSender = await this.accountModel.findOneAndUpdate(
          { email: tran.sender_email },
          findSender,
          {
            new: true,
            useFindAndModify: false,
          },
        );
      } else {
        const findSender = await this.accountModel.findOne({
          email: tran.sender_email,
        });
        findSender.balance.amount -= tran.value;
        findSender.balance.history.push(tran);
        updateSender = await this.accountModel.findOneAndUpdate(
          { email: tran.sender_email },
          findSender,
          {
            new: true,
            useFindAndModify: false,
          },
        );
      }
      const findReceiver = await this.accountModel.findOne({
        email: tran.receiver_email,
      });
      findReceiver.balance.amount += tran.value;
      findReceiver.balance.history.push(tran);
      const updateReceiver = await this.accountModel.findOneAndUpdate(
        { email: tran.receiver_email },
        findReceiver,
        {
          new: true,
          useFindAndModify: false,
        },
      );
      return {
        message: 'Transaction succeeded',
        updateReceiver,
        updateSender,
      };
    } catch (error) {
      console.log(error);
    }
  }

  async createAccountCheat(email: string): Promise<Account> {
    try {
      const newAccount = new this.accountModel({
        email,
        cvu: createCvu(),
        balance: { amount: 0, history: [] },
      });
      return await newAccount.save();
    } catch (error) {
      console.log(error);
    }
  }
}
