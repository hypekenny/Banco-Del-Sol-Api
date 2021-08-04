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

  @Get('/detail/:id')
  async getAccount(@Res() res, @Param('id') id: string) {
    const account = await this.accountService.getAccount(id);
    return res.status(HttpStatus.OK).json(account);
  }

  @Get('/:id')
  async getBalance(@Res() res, @Param('id') id: string) {
    const balance = await this.accountService.getBalance(id);
    return res.status(HttpStatus.OK).json(balance);
  }

  @Get('/cvu/:id')
  async getCvu(@Res() res, @Param('id') id: string) {
    const cvu = await this.accountService.getCvu(id);
    return res.status(HttpStatus.OK).json(cvu);
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

  @Put('/balance/:id')
  async modifyBalance(
    @Res() res,
    @Param('id') id: string,
    @Body() body: Account,
  ) {
    const newBalance = await this.accountService.modifyBalance(
      id,
      body.balance,
    );
    return res.status(HttpStatus.OK).json({
      message: 'Balance updated',
      account: newBalance,
    });
  }
}
