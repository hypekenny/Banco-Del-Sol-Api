import {
  Controller,
  Get,
  Res,
  HttpStatus,
  Body,
  Post,
  UseGuards,
  Req,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AccountService } from './account.service';
import axios from 'axios';

const { API2 } = process.env;

@Controller('account')
@UseGuards(AuthGuard('jwt'))
export class AccountController {
  constructor(private accountService: AccountService) {}

  @Get()
  async getAccount(@Res() res, @Req() req) {
    try {
      const findAccount = await this.accountService.getAccount(
        req.user.email.toLowerCase(),
      );
      if (!findAccount)
        throw { error: { message: 'No se ha encontrado el balance' } };
      return res.send(findAccount);
    } catch (error) {
      console.log(error);
      return res.status(HttpStatus.NOT_FOUND).json(error);
    }
  }

  @Post()
  async createTransaction(@Res() res, @Body() transaction) {
    transaction.senderEmail = transaction.senderEmail.toLowerCase();
    transaction.receiverEmail = transaction.receiverEmail.toLowerCase();
    try {
      const receiver = await this.accountService.getAccount(
        transaction.receiverEmail,
      );
      if (receiver)
        await axios.post(API2, transaction).then(() => res.send(true));
      else throw { error: { message: 'No se ha encontrado el usuario' } };
    } catch (error) {
      console.log(error);
      return res.status(HttpStatus.NOT_FOUND).json(error);
    }
  }
}
