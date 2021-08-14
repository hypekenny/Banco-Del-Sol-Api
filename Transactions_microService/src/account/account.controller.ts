import {
  Controller,
  Get,
  Res,
  HttpStatus,
  UseGuards,
  Req,
  Body,
  Post,
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
      const findAccount = await this.accountService.getAccount(
        req.user.email.toLowerCase(),
      );
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
