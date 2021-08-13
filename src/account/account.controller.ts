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
import axios from 'axios';

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

  @Post()
  async updateAccount(@Res() res, @Body() transaction) {
    try {
      const response = await axios.post(
        'http://localhost:3000/api2/transactions',
        transaction,
      );
      return res.send(response);
    } catch (error) {
      console.log(error);
    }
  }
}
