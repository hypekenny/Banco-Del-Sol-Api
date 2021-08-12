import {
  Controller,
  Get,
  Res,
  HttpStatus,
  Put,
  Body,
  UseGuards,
  Req,
  Post,
} from '@nestjs/common';
import { TransactionsService } from './transactions.service';
import { AccountService } from '../account/account.service';

@Controller('transactions')
export class TransactionsController {
  constructor(
    private transactionService: TransactionsService,
    private accountService: AccountService,
  ) {}

  @Get()
  async getTransactions(@Res() res, @Body() body) {
    try {
      const transactions = await this.transactionService.getTransactions(
        body.email,
      );
      return res.status(HttpStatus.OK).json(transactions);
    } catch (error) {
      console.error(error);
      return res.status(500);
    }
  }

  @Post()
  async newTransaction(@Res() res, @Body() body) {
    try {
      const newTransaction = await this.transactionService.createTransaction(
        body,
      );
      return res.status(HttpStatus.OK).send({
        message: 'Transaction completed',
        transaction: newTransaction,
      });
    } catch (error) {
      console.error(error);
      return res.status(400);
    }
  }

  @Post()
  async updateAccount(transaction) {
    const updated = await this.accountService.updateAccount;
  }
  /*     const findAccount = await this.accountModel.findOne({ email });
      findAccount.balance.amount += newTransaction.value;
      findAccount.balance.history.push(newTransaction);
      const updated = await this.accountModel.findOneAndUpdate(
        { email },
        findAccount,
        {
          new: true,
          useFindAndModify: false,
        },
      );
      return updated;
}  */
}
