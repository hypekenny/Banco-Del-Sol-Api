import { Controller, Get, Res, Body, Post, Put } from '@nestjs/common';
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
  async newTransaction(@Body() body) {
    await this.transactionService.createTransaction(body);
  }

  @Put()
  async updateTransaction(@Body() body) {
    await this.transactionService.updateTransactionService(
      body.id,
      body.condition,
    );
  }
}
