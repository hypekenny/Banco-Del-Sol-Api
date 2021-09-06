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
        } else throw 'No se pudo encontrar el balance';
        if (auxSenderAmount + tran.value !== senderAcc.balance.amount)
          throw 'Intercambio de dinero incorrecto';
        senderAcc.balance.history.push(tran);
        await this.accountRepository.save(senderAcc);
        return true;
      } else {
        senderAcc = await this.accountRepository.findOne({
          email: tran.senderEmail,
        });
        if (senderAcc.balance) {
          auxSenderAmount = senderAcc.balance.amount;
          senderAcc.balance.amount -= tran.value;
        } else throw 'No se pudo encontrar el balance';
        if (
          auxSenderAmount - tran.value !== senderAcc.balance.amount ||
          senderAcc.balance.amount < 0
        )
          throw 'Intercambio de dinero incorrecto';
        receiverAcc = await this.accountRepository.findOne({
          email: tran.receiverEmail,
        });
        if (receiverAcc.balance) {
          auxReceiverAmount = receiverAcc.balance.amount;
          receiverAcc.balance.amount += tran.value;
        } else throw 'No se pudo encontrar el balance';
        if (auxReceiverAmount + tran.value !== receiverAcc.balance.amount)
          throw 'Intercambio de dinero incorrecto';
        senderAcc.balance.history.push(tran);
        receiverAcc.balance.history.push(tran);
        await this.accountRepository.save(senderAcc);
        await this.accountRepository.save(receiverAcc);
        return true;
      }
    } catch (error) {
      if (senderAcc) {
        senderAcc.balance.amount = auxSenderAmount;
        tran.condition = 'failed';
        tran.failCause = error;
        senderAcc.balance.history.push(tran);
        await this.accountRepository.save(senderAcc);
      }
      if (receiverAcc) {
        receiverAcc.balance.amount = auxReceiverAmount;
        await this.accountRepository.save(receiverAcc);
      }
      return false;
    }
  }
}
