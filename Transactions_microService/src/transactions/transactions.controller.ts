import {
  Controller,
  Get,
  Res,
  HttpStatus,
  Put,
  Body,
  UseGuards,
  Req,
} from '@nestjs/common';
import { TransactionsService } from './transactions.service';

@Controller('transactions')
export class TransactionsController {
  constructor(private transactionService: TransactionsService) {}


@Get()
async getTransactions(@Res() res, @Req req) {
    try {
        const transactions = await this.transactionService.
    }
}


@Put()


}
