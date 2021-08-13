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

  @Post()
  async updateAccount(@Res() res, @Body() transaction) {
    try {
      const response = await axios.post(
        'http://localhost:3000/api2/transactions',
        transaction,
      );
      if (!response)
        throw { error: { message: 'No se ha encontrado el balance' } };
      return res.send(response);
    } catch (error) {
      console.log(error);
      return res.status(HttpStatus.NOT_FOUND).json(error);
    }
  }
}
