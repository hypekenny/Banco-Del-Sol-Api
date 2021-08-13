import {
  Controller,
  Get,
  Res,
  HttpStatus,
  Put,
  Body,
  Post,
  UseGuards,
  Req,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AccountService } from './account.service';

@Controller('account')
@UseGuards(AuthGuard('jwt'))
export class AccountController {
  constructor(private accountService: AccountService) {}

  @Get()
  async getAccount(@Res() res, @Req() req) {
    try {
      const findAccount = await this.accountService.getAccount(req.user.email);
      return res.status(HttpStatus.OK).json(findAccount);
    } catch (error) {
      console.log(error);
      return null;
    }
  }

  @Put()
  async updateAccount(@Res() res, @Body() body, @Req() req) {
    try {
      console.log('dd', body);
      const findAccount = await this.accountService.getAccount(req.user.email);
      const transaction = {
        email: findAccount.email,
        type: 'recarga',
        value: body.value,
        date: 'a',
      };
      const updatedAccount = await this.accountService.updateAccount(
        req.user.email,
        transaction,
      );
      return res.status(HttpStatus.OK).json({
        message: 'Balance updated',
        account: updatedAccount,
      });
    } catch (error) {
      console.log(error);
      return null;
    }
  }
}
