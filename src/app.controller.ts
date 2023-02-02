import { Controller, Get, Query } from '@nestjs/common';
import { Body, Post, Req, Res, Session } from '@nestjs/common/decorators';
import { ParseIntPipe } from '@nestjs/common/pipes';
import { Request, Response } from 'express';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(@Req() req: Request): string {
    console.log('cookies', req.cookies);
    return this.appService.getHello();
  }

  @Get("cookie")
  getCookie(@Req() req: Request) {
    return req.cookies;
  }

  @Post("cookie")
  setCookie(
    @Body('key') key: string,
    @Body('value') value: string,
    @Res() res: Response,
  ) {
    res.cookie(key, value);
  }

  @Get('session')
  findAll(@Session() session: Record<string, any>) {
    session.visits = session.visits ? session.visits + 1 : 1;
    return session;
  }


  @Get('first-api')
  firstApi() {
    return 'My first api.';
  }

  @Get('redis')
  getRedisValue(@Query('key') key: string) {
    return this.appService.getRedisSomeValue(key);
  }

  @Post('redis')
  setRedisValue(
    @Body('key') key: string,
    @Body('value') value: string,
    @Body('ex', ParseIntPipe) ex: number,
  ) {
    return this.appService.setRedisSomeValue(key, value, ex);
  }
}
