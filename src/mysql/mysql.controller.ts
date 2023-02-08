import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { MysqlService } from './mysql.service';
import { CreateMysqlDto } from './dto/create-mysql.dto';
import { UpdateMysqlDto } from './dto/update-mysql.dto';
import { HttpService } from '@nestjs/axios';
import { lastValueFrom } from 'rxjs';

@Controller('mysql')
export class MysqlController {
  constructor(
    private readonly mysqlService: MysqlService,
    private readonly httpService: HttpService,
  ) {}

  @Get('http')
  async fetchBaidu() {
    const res = this.httpService.get<string>('https://baidu.com');
    const baidu = await lastValueFrom(res);
    return baidu.data;
  }

  @Post()
  // @UsePipes(new ValidationPipe())
  create(@Body() createMysqlDto: CreateMysqlDto) {
    return this.mysqlService.create(createMysqlDto);
  }

  @Get()
  findAll() {
    return this.mysqlService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.mysqlService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateMysqlDto: UpdateMysqlDto) {
    return this.mysqlService.update(+id, updateMysqlDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.mysqlService.remove(+id);
  }
}
