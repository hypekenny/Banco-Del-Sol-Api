import { Controller, Get, Res, HttpStatus, Body, Post } from '@nestjs/common';
import { AccountService } from './account.service';

@Controller('account')
export class AccountController {
  constructor(private accountService: AccountService) {}

  @Get()
  async getAccount(@Res() res) {
    try {
      const findAccount = await this.accountService.getAllAccounts();
      return res.status(HttpStatus.OK).json(findAccount);
    } catch (error) {
      console.log(error);
      return res.status(400);
    }
  }

  @Post()
  async cheat(@Res() res, @Body() body) {
    try {
      const created = await this.accountService.createAccount(body);
      return res.send(created);
    } catch (error) {
      console.log(error);
      return res.status(400);
    }
  }
}
