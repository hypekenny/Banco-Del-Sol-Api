import { Injectable } from '@nestjs/common';
import { Account, AccountDocument } from './account.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Connection } from 'typeorm';

const createCvu = () => {
  const a = Math.random() * 10 ** 23;
  const b = a.toLocaleString('fullwide', { useGrouping: false });
  return b;
};

@Injectable()
export class AccountService {
  constructor(
    @InjectRepository(Account)
    private readonly accountRepository: Repository<AccountDocument>,
  ) {}

  async getAccount(email: string): Promise<Account> {
    try {
      const findAccount = await this.accountRepository.findOne({
        email: email,
      });
      return findAccount;
    } catch (error) {
      console.log(error);
    }
  }

  async createAccount(account: Account) {
    try {
      const newAccount = await this.accountRepository.save({
        ...account,
        email: account.email,
        cvu: createCvu(),
      });
      return newAccount;
    } catch (error) {
      console.log(error);
    }
  }

  // async updateAccount(tran: transactionType) {
  //   const queryRunner = this.connection.createQueryRunner();
  //   await queryRunner.connect();
  //   await queryRunner.startTransaction();
  //   try {
  //     if (tran.receiverEmail === tran.senderEmail) {
  //       const findSender = await this.accountModel.findOne({
  //         email: tran.senderEmail,
  //       });
  //       findSender.balance.amount += tran.value;
  //       findSender.balance.history.push(tran);
  //       await queryRunner.manager.update(
  //         this.accountModel,
  //         tran.senderEmail,
  //         findSender,
  //       );
  //     } else {
  //       const findSender = await this.accountModel.findOne({
  //         email: tran.senderEmail,
  //       });
  //       findSender.balance.amount -= tran.value;
  //       findSender.balance.history.push(tran);
  //       await queryRunner.manager.update(
  //         this.accountModel,
  //         tran.senderEmail,
  //         findSender,
  //       );
  //       const findReceiver = await this.accountModel.findOne({
  //         email: tran.receiverEmail,
  //       });
  //       findReceiver.balance.amount += tran.value;
  //       findReceiver.balance.history.push(tran);
  //       await queryRunner.manager.update(
  //         this.accountModel,
  //         tran.receiverEmail,
  //         findReceiver,
  //       );
  //     }
  //   } catch (err) {
  //     console.log(err);
  //     await queryRunner.rollbackTransaction();
  //   } finally {
  //     await queryRunner.release();
  //   }
  // }
}
