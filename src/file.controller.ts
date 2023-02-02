import { Controller, Get, Query } from '@nestjs/common';
import {
  Body,
  Post,
  Res,
  UploadedFile,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common/decorators';
import { Header } from '@nestjs/common/decorators/http/header.decorator';
import {
  FileTypeValidator,
  MaxFileSizeValidator,
  ParseFilePipe,
} from '@nestjs/common/pipes';
import { FileInterceptor } from '@nestjs/platform-express';
import {
  AnyFilesInterceptor,
  FileFieldsInterceptor,
  FilesInterceptor,
} from '@nestjs/platform-express/multer';
import { Response } from 'express';
import { createReadStream } from 'fs';
import { readFile } from 'fs/promises';
import { join } from 'path';

@Controller("file")
export class FileController {

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

  @Get("download")
  @Header("content-type", "html/text")
  async download() {
    const content = await readFile(__filename);
    return content.toString();
  }

  @Get("pipe")
  @Header("content-type", "html/text")
  pipe(@Res() res: Response) {
    const reader = createReadStream(__filename);
    reader.pipe(res);
  }

}
