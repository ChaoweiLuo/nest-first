import { Controller, Get, Query } from '@nestjs/common';
import { Body, Post } from '@nestjs/common/decorators';
import { ParseIntPipe } from '@nestjs/common/pipes';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
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
