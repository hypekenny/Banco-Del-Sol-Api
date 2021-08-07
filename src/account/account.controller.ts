import { Controller, Get, Res, HttpStatus, Put, Body } from '@nestjs/common';
import { Account } from './account.model';
import { AccountService } from './account.service';

@Controller('account')
export class AccountController {
  constructor(private accountService: AccountService) {}

  @Get('/')
  async getAccount(@Res() res, @Body() account: Account) {
    try {
      const findAccount = await this.accountService.getAccount(account);
      return res.status(HttpStatus.OK).json(findAccount);
      // return res.send(findAccount);
    } catch (error) {
      console.log(error);
    }
  }

  @Put('/')
  async updateBalance(@Res() res, @Body() account: Account) {
    try {
      const newBalance = await this.accountService.updateAccount(account);
      return res.status(HttpStatus.OK).json({
        message: 'Balance updated',
        account: newBalance,
      });
    } catch (error) {
      console.log(error);
    }
  }
}
