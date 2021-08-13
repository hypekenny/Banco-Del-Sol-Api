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
      const succeeded = await this.transactionService.createTransaction(body);
      return res.status(HttpStatus.OK).send(succeeded);
    } catch (error) {
      console.error(error);
      return res.status(400);
    }
  }
}
