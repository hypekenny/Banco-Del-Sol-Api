import { Injectable } from '@nestjs/common';
import { Accounts, AccountDocument, transactionType } from './account.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

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
  ) {}

  async getAllAccounts() {
    try {
      const allAccounts = await this.accountRepository.find();
      return allAccounts;
    } catch (error) {
      console.log(error);
    }
  }

  async createAccount(account: Accounts) {
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

  async updateAmount(email: string, amount: number) {
    try {
      const findAccount = await this.accountRepository.findOne({ email });
      findAccount.balance.amount = amount;
      this.accountRepository.save(findAccount);
    } catch (error) {
      console.log(error);
    }
  }

  async updateAccount(tran: transactionType) {
    let senderAcc: Accounts;
    let receiverAcc: Accounts;

    let auxSenderAmount: number;
    let auxReceiverAmount: number;
    try {
      if (tran.receiverEmail === tran.senderEmail) {
        senderAcc = await this.accountRepository.findOne({
          email: tran.senderEmail,
        });
        if (senderAcc.balance) {
          auxSenderAmount = senderAcc.balance.amount;
          senderAcc.balance.amount += tran.value;
          senderAcc.balance.history.push(tran);
          await this.accountRepository.save(senderAcc);
          // throw new Error();
        } else throw new Error();
        if (auxSenderAmount + tran.value !== senderAcc.balance.amount)
          throw new Error();
        return true;
      } else {
        senderAcc = await this.accountRepository.findOne({
          email: tran.senderEmail,
        });
        if (senderAcc.balance) {
          auxSenderAmount = senderAcc.balance.amount;
          senderAcc.balance.amount -= tran.value;
          senderAcc.balance.history.push(tran);
          await this.accountRepository.save(senderAcc);
        } else throw new Error();
        if (
          auxSenderAmount - tran.value !== senderAcc.balance.amount ||
          senderAcc.balance.amount < 0
        )
          throw new Error();
        receiverAcc = await this.accountRepository.findOne({
          email: tran.receiverEmail,
        });
        if (receiverAcc.balance) {
          auxReceiverAmount = receiverAcc.balance.amount;
          receiverAcc.balance.amount += tran.value;
          receiverAcc.balance.history.push(tran);
          await this.accountRepository.save(receiverAcc);
          // throw new Error();
        } else throw new Error();
        if (auxReceiverAmount + tran.value !== receiverAcc.balance.amount)
          throw new Error();
        return true;
      }
    } catch (error) {
      // console.error(error);
      if (senderAcc) {
        senderAcc.balance.amount = auxSenderAmount;
        senderAcc.balance.history.pop();
        await this.accountRepository.save(senderAcc);
      }
      if (receiverAcc) {
        receiverAcc.balance.amount = auxReceiverAmount;
        receiverAcc.balance.history.pop();
        await this.accountRepository.save(receiverAcc);
      }
      return false;
    }
  }
}

// const queryRunner = this.connection.createQueryRunner();
// await queryRunner.connect();
// await queryRunner.startTransaction();
// try {
//   if (tran.receiverEmail === tran.senderEmail) {
//     const findSender = await this.accountRepository.findOne({
//       email: tran.senderEmail,
//     });
//     if (findSender && findSender.balance) {
//       findSender.balance.amount += tran.value;
//       findSender.balance.history.push(tran);
//       await queryRunner.manager.save(findSender);
//       // throw new Error();
//       return findSender;
//     }
//   } else {
//     const findSender = await this.accountRepository.findOne({
//       email: tran.senderEmail,
//     });
//     if (findSender && findSender.balance) {
//       findSender.balance.amount -= tran.value;
//       findSender.balance.history.push(tran);
//       await queryRunner.manager.save(findSender);
//     }
//     const findReceiver = await this.accountRepository.findOne({
//       email: tran.receiverEmail,
//     });
//     if (findReceiver && findReceiver.balance) {
//       findReceiver.balance.amount += tran.value;
//       findReceiver.balance.history.push(tran);
//       await queryRunner.manager.save(findReceiver);
//       await queryRunner.commitTransaction();
//       // throw new Error();
//       return findSender;
//     }
//   }
// } catch (error) {
//   console.error(error);
//   await queryRunner.rollbackTransaction();
//   return error;
// } finally {
//   await queryRunner.release();
// }

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
