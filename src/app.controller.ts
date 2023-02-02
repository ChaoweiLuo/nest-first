import { Controller, Get, Query } from '@nestjs/common';
import {
  Body,
  Post,
  UploadedFile,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common/decorators';
import {
  FileTypeValidator,
  MaxFileSizeValidator,
  ParseFilePipe,
  ParseIntPipe,
} from '@nestjs/common/pipes';
import { FileInterceptor } from '@nestjs/platform-express';
import {
  AnyFilesInterceptor,
  FileFieldsInterceptor,
  FilesInterceptor,
} from '@nestjs/platform-express/multer';
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

  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  uploadFile(
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new MaxFileSizeValidator({ maxSize: 1000 }),
          new FileTypeValidator({ fileType: 'image/jpeg' }),
        ],
      }),
    )
    file: Express.Multer.File,
  ) {
    console.log('file', file);
  }

  @Post('uploads')
  @UseInterceptors(
    FileFieldsInterceptor([
      { name: 'avatar', maxCount: 1 },
      { name: 'file', maxCount: 1 },
    ]),
  )
  uploadFiles(
    @UploadedFiles()
    files: {
      avatar?: Express.Multer.File[];
      file?: Express.Multer.File[];
    },
  ) {
    console.log(files);
  }

  @Post('uploadarray')
  @UseInterceptors(FilesInterceptor('files'))
  uploadFileArray(@UploadedFiles() files: Array<Express.Multer.File>) {
    console.log(files);
  }

  @Post('uploadany')
  @UseInterceptors(AnyFilesInterceptor())
  uploadAnyFile(@UploadedFiles() files: Array<Express.Multer.File>) {
    console.log(files);
  }
}
