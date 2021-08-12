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

@Controller('transactions')
export class TransactionsController {
  constructor(private transactionService: TransactionsService) {}

  @Get()
  async getTransactions(@Res() res, @Body() body) {
    try {
      const transactions = await this.transactionService.getTransactions(
        body.email,
      );
      return res.status(HttpStatus.OK).json(transactions);
    } catch (error) {
      console.log(error);
      return null;
    }
  }

  @Post()
  async newTransaction(@Res() res, @Body() body) {
    try {
      const newTransaction = await this.transactionService.createTransaction(
        body,
      );
      console.log('BBBBBBBBBB', newTransaction);
      return res.status(HttpStatus.OK).json({
        message: 'Transaction completed',
        transaction: newTransaction,
      });
    } catch (error) {
      console.error(error);
      return res.status(500);
    }
  }
}
