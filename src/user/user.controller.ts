import {
  Controller,
  Get,
  Post,
  Put,
  Body,
  Res,
  HttpStatus,
  UseGuards,
  Delete,
  Req,
} from '@nestjs/common';

import { User } from './user.model';
import { UserService } from './user.service';
import { AccountService } from '../account/account.service';
import { ContactsService } from '../contacts/contacts.service';
import { AuthGuard } from '@nestjs/passport';

@Controller('user')
@UseGuards(AuthGuard('jwt'))
export class UserController {
  constructor(
    private userService: UserService,
    private accountService: AccountService,
    private contactsService: ContactsService,
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

  @Get('/all')
  async getAllUsers(@Res() res) {
    try {
      const user = await this.userService.getAll();
      if (!user) throw { error: { message: 'El usuario no existe' } };
      return res.status(HttpStatus.OK).json(user);
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
      const { cvu } = newAccount;
      await this.contactsService.createContact(user, cvu);
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

  @Delete()
  async manageUsers(@Res() res, @Body() body) {
    try {
      if (body.users.length && body.condition) {
        for (const user of body.users) {
          user.condition = body.condition;
          this.userService.updateUser(user.email, user);
          this.accountService.manageAccount(user.email, body.condition);
        }
      } else console.log('error en manageUser');
    } catch (error) {
      console.log(error);
    }
  }
}
