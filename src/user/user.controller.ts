import {
  Controller,
  Get,
  Post,
  Put,
  Body,
  Res,
  HttpStatus,
  UseGuards,
  Req,
} from '@nestjs/common';

import { User } from './user.model';
import { UserService } from './user.service';
import { AccountService } from '../account/account.service';
import { AuthGuard } from '@nestjs/passport';

@Controller('user')
@UseGuards(AuthGuard('jwt'))
export class UserController {
  constructor(
    private userService: UserService,
    private accountService: AccountService,
  ) {}

  @Get()
  async getUser(@Res() res, @Req() req) {
    try {
      const users = await this.userService.getUserByEmail(req.user.email);
      return res.status(HttpStatus.OK).json({
        users,
      });
    } catch (error) {
      console.log(error);
      return null;
    }
  }

  @Post()
  async createUser(@Res() res, @Body() user): Promise<User> {
    try {
      const newUser = await this.userService.createUser(user);
      const newAccount = await this.accountService.createAccount(user);
      if (!newUser || !newAccount) {
        return res.status(HttpStatus.BAD_REQUEST).send('User already exists');
      }

      return res.status(HttpStatus.OK).json({
        message: 'User created',
        user: newUser,
        account: newAccount,
      });
    } catch (error) {
      return null;
    }
  }

  @Put()
  async updateUser(@Res() res, @Body() user, @Req() req) {
    try {
      console.log('entre al put controller');
      const updatedUser = await this.userService.updateUser(
        req.user.email,
        user,
      );
      if (!updatedUser)
        return res.status(HttpStatus.BAD_REQUEST).send('User not found');
      return res.status(HttpStatus.OK).json({
        message: 'User updated',
        updatedUser,
      });
    } catch (error) {
      console.log(error);
      return null;
    }
  }
}
