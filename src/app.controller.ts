import { Controller, Get, UseGuards, Req } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AppService } from './app.service';
import { Request } from 'express';

@Controller()
@UseGuards(AuthGuard('jwt'))
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(@Req() request: Request): string {
    console.log('User', JSON.stringify(request['user']));
    return 'Hello ' + JSON.stringify(request['user']) + '!';
  }
}
