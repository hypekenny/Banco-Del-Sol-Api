import { Controller, Get, UseGuards, Req } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AppService } from './app.service';
import { Request } from 'express';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @UseGuards(AuthGuard('jwt'))
  @Get()
  getHello(@Req() request: Request): string {
    console.log('User', JSON.stringify(request['user']));
    return 'Hello ' + JSON.stringify(request['user']) + '!';
  }
}
