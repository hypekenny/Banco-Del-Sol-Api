import {
  Controller,
  Get,
  Post,
  Put,
  Body,
  Query,
  Res,
  HttpStatus,
  Param,
  NotFoundException,
} from '@nestjs/common';

import { User } from './user.model';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Get()
  async getUsers(@Res() res) {
    const users = await this.userService.getUsers();
    return res.status(HttpStatus.OK).json({
      users,
    });
  }

  @Get('/:id')
  async getUser(@Res() res, @Param('id') id: string) {
    const user = await this.userService.getUserById(id);
    if (!user) throw new NotFoundException('User does not exist');
    return res.status(HttpStatus.OK).json(user);
  }

  @Post()
  async createUser(@Res() res, @Body() user): Promise<User> {
    const newUser = await this.userService.createUser(user);
    return res.status(HttpStatus.OK).json({
      message: 'User created',
      user: newUser,
    });
  }

  @Put('/update')
  async updateUser(@Res() res, @Body() user, @Query('id') id) {
    const updatedUser = await this.userService.updateUser(id, user);
    if (!user) throw new NotFoundException('User does not exist');
    return res.status(HttpStatus.OK).json({
      message: 'User updated',
      updatedUser,
    });
  }
}
