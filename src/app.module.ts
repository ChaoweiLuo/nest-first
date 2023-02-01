import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config/dist';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BookController } from './book/book.controller';
import { BookService } from './book/book.service';

@Module({
  imports: [ConfigModule.forRoot()],
  controllers: [AppController, BookController],
  providers: [AppService, BookService],
})
export class AppModule {}
