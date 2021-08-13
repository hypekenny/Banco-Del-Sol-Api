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
      const user = await this.userService.getUserByEmail(
        req.user.email.toLowerCase(),
      );
      const account = await this.accountService.getAccount(
        req.user.email.toLowerCase(),
      );
      if (!user || !account)
        throw { error: { message: 'El usuario no existe' } };
      return res.status(HttpStatus.OK).json({
        user,
        account,
      });
    } catch (error) {
      console.log(error);
      return res.status(HttpStatus.NOT_FOUND).json(error);
    }
  }

  @Post()
  async createUser(@Res() res, @Body() user): Promise<User> {
    try {
      user.email = user.email.toLowerCase();
      const newUser = await this.userService.createUser(user);
      const newAccount = await this.accountService.createAccount(user);
      if (!newUser || !newAccount)
        throw { error: { message: 'El usuario ya existe' } };

      return res.status(HttpStatus.OK).json({
        message: 'User created',
        user: newUser,
        account: newAccount,
      });
    } catch (error) {
      console.log(error);
      return res.status(HttpStatus.BAD_REQUEST).json(error);
    }
  }

  @Put()
  async updateUser(@Res() res, @Body() user, @Req() req) {
    try {
      const updatedUser = await this.userService.updateUser(
        req.user.email.toLowerCase(),
        user,
      );
      if (!updatedUser)
        throw { error: { message: 'El usuario no se ha encontrado' } };
      return res.status(HttpStatus.OK).json({
        message: 'User updated',
        updatedUser,
      });
    } catch (error) {
      console.log(error);
      return res.status(HttpStatus.NOT_FOUND).json(error);
    }
  }
}
