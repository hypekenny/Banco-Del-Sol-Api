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
    try {
      const account = await this.accountService.getAccount(id);
      return res.status(HttpStatus.OK).json(account);
    } catch (error) {
      console.log(error);
    }
  }

  @Get('/:id')
  async getBalance(@Res() res, @Param('id') id: string) {
    try {
      const balance = await this.accountService.getBalance(id);
      return res.status(HttpStatus.OK).json(balance);
    } catch (error) {
      console.log(error);
    }
  }

  @Get('/cvu/:id')
  async getCvu(@Res() res, @Param('id') id: string) {
    try {
      const cvu = await this.accountService.getCvu(id);
      return res.status(HttpStatus.OK).json(cvu);
    } catch (error) {
      console.log(error);
    }
  }

  @Post('/:id')
  async createAccount(
    @Res() res,
    @Param('id') id: string,
    @Body() body: Account,
  ) {
    try {
      const newAccount = await this.accountService.createAccount(id, body);
      return res.status(HttpStatus.OK).json({
        message: 'Account created',
        account: newAccount,
      });
    } catch (error) {
      console.log(error);
    }
  }

  @Put('/balance/:id')
  async modifyBalance(
    @Res() res,
    @Param('id') id: string,
    @Body() body: Account,
  ) {
    try {
      const newBalance = await this.accountService.modifyBalance(
        id,
        body.balance,
      );
      return res.status(HttpStatus.OK).json({
        message: 'Balance updated',
        account: newBalance,
      });
    } catch (error) {
      console.log(error);
    }
  }
}
