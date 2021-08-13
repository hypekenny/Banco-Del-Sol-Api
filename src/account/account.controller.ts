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
      if (!findAccount)
        throw { error: { message: 'No se ha encontrado el balance' } };
      return res.status(HttpStatus.OK).json(findAccount);
    } catch (error) {
      console.log(error);
      return res.status(HttpStatus.NOT_FOUND).json(error);
    }
  }

  @Put()
  async updateAccount(@Res() res, @Body() body, @Req() req) {
    try {
      const updatedAccount = await this.accountService.updateAccount(
        req.user.email,
        body.newBalance,
      );
      if (!updatedAccount)
        throw { error: { message: 'No se ha encontrado el balance' } };
      return res.status(HttpStatus.OK).json({
        message: 'Balance updated',
        account: updatedAccount,
      });
    } catch (error) {
      console.log(error);
      return res.status(HttpStatus.NOT_FOUND).json(error);
    }
  }
}
