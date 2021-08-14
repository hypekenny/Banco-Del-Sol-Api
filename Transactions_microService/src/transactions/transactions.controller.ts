import { Controller, Get, Res, HttpStatus, Body, Post } from '@nestjs/common';
import { TransactionsService } from './transactions.service';

@Controller('transactions')
export class TransactionsController {
  constructor(private transactionService: TransactionsService) {}

  @Get()
  async getTransactions(@Res() res, @Body() body) {
    try {
      const transactions = await this.transactionService.getTransactions(
        body.email.toLowerCase(),
      );
      return res.status(HttpStatus.OK).json(transactions);
    } catch (error) {
      console.error(error);
      return res.status(400);
    }
  }

  @Post()
  async newTransaction(@Res() res, @Body() body) {
    try {
      console.log('newTransaction -> ', body);
      const succeeded = await this.transactionService.createTransaction(body);
      console.log('newTransaction response -> ', succeeded);
      return res.send(succeeded);
    } catch (error) {
      console.error(error);
      return res.status(400);
    }
  }
}
