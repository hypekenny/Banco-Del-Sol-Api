import {
  Controller,
  Get,
  Post,
  Put,
  Body,
  Query,
  Res,
  HttpStatus,
  Param,
  NotFoundException,
} from '@nestjs/common';
import { Account } from './account.model';
import { AccountService } from './account.service';

@Controller('account')
export class AccountController {
  constructor(private accountService: AccountService) {}

  @Get('/:id')
  async getBalance(@Res() res, @Param('id') id: string) {
    console.log('RUTAAAAAAA', id);
    const balance = await this.accountService.getBalance(id);
    return res.status(HttpStatus.OK).json(balance);
  }

  @Post('/:id')
  async createAccount(
    @Res() res,
    @Param('id') id: string,
    @Body() body: Account,
  ) {
    const newAccount = await this.accountService.createAccount(id, body);
    return res.status(HttpStatus.OK).json({
      message: 'Account created',
      account: newAccount,
    });
  }
}
