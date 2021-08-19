import { Controller, Get, Res, Body, Post } from '@nestjs/common';
import { TransactionsService } from './transactions.service';

@Controller('transactions')
export class TransactionsController {
  constructor(private transactionService: TransactionsService) {}

  @Get()
  async getTransactions(@Res() res) {
    try {
      const transaction = await this.transactionService.getAllTransactions();
      if (!transaction) throw new Error();
      return res.send(transaction);
    } catch (error) {
      console.error(error);
      return res.status(400);
    }
  }

  @Post()
  async newTransaction(@Res() res, @Body() body) {
    try {
      const succeeded = await this.transactionService.createTransaction(body);
      if (!succeeded) throw new Error();
      return res.send(succeeded);
    } catch (error) {
      console.error(error);
      return res.status(400);
    }
  }
}
