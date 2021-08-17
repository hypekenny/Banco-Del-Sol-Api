import { Injectable } from '@nestjs/common';
import { Accounts, AccountDocument, transactionType } from './account.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, getConnection, QueryBuilder, Connection } from 'typeorm';

const createCvu = () => {
  const a = Math.random() * 10 ** 23;
  const b = a.toLocaleString('fullwide', { useGrouping: false });
  return b;
};

@Injectable()
export class AccountService {
  constructor(
    @InjectRepository(Accounts)
    private readonly accountRepository: Repository<AccountDocument>,
    private readonly connection: Connection,
  ) {}

  async getAccount(email: string): Promise<Accounts> {
    try {
      const findAccount = await this.accountRepository.findOne({
        email: email,
      });
      return findAccount;
    } catch (error) {
      console.log(error);
    }
  }

  async createAccount(account: Accounts) {
    try {
      console.log(account);
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

  async updateAccount(tran: transactionType) {
    const queryRunner = this.connection.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      if (tran.receiverEmail === tran.senderEmail) {
        const findSender = await this.accountRepository.findOne({
          email: tran.senderEmail,
        });
        findSender.balance.amount += tran.value;
        findSender.balance.history.push(tran);
        await queryRunner.manager.save(findSender);
        // throw new Error();
        return findSender;
      } else {
        const findSender = await this.accountRepository.findOne({
          email: tran.senderEmail,
        });
        findSender.balance.amount -= tran.value;
        findSender.balance.history.push(tran);
        await queryRunner.manager.save(findSender);
        const findReceiver = await this.accountRepository.findOne({
          email: tran.receiverEmail,
        });
        findReceiver.balance.amount += tran.value;
        findReceiver.balance.history.push(tran);
        await queryRunner.manager.save(findReceiver);
        await queryRunner.commitTransaction();
        // throw new Error();
        return findSender;
      }
    } catch (error) {
      console.log(error);
      await queryRunner.rollbackTransaction();
    } finally {
      await queryRunner.release();
    }
  }

  // async updateAccount(tran: transactionType) {
  //   const connection = getConnection();
  //   const queryRunner = connection.createQueryRunner();
  //   await queryRunner.connect();
  //   await queryRunner.startTransaction();
  //   const senderAcc = await this.accountRepository.findOne({
  //     email: tran.senderEmail,
  //   });
  //   senderAcc.balance.amount -= tran.value;
  //   senderAcc.balance.history.push(tran);
  //   const receiverAcc = await this.accountRepository.findOne({
  //     email: tran.receiverEmail,
  //   });
  //   receiverAcc.balance.amount += tran.value;
  //   receiverAcc.balance.history.push(tran);
  //   try {
  //     await queryRunner.manager.save(senderAcc);
  //     await queryRunner.manager.save(receiverAcc);
  //     await queryRunner.commitTransaction();
  //   } catch (error) {
  //     console.log('rollback', error);
  //     await queryRunner.rollbackTransaction();
  //   } finally {
  //     await queryRunner.release();
  //   }
  // }
}
