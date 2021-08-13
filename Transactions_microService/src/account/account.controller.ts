import {
  Controller,
  Get,
  Res,
  HttpStatus,
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
      return res.status(400);
    }
  }
}
