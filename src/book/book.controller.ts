import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { get } from 'http';
import { Book } from './book.schema';
import { BookService } from './book.service';

@Controller('book')
export class BookController {
  constructor(private readonly bookService: BookService) {}

  @Get()
  listBook() {
    return this.bookService.listBooks();
  }

  @Get(':id')
  findBook(@Param('id') id: string) {
    return this.bookService.findBook(id);
  }

  @Post()
  createBook(@Body() dto: Omit<Book, 'id'>) {
    return this.bookService.createBook(dto);
  }

  @Patch(':id')
  editBook(@Param('id') id: string, @Body() dto: Omit<Book, 'id'>) {
    return this.bookService.editBook(id, dto);
  }

  @Delete(":id")
  deleteBook(@Param('id') id: string) {
    return this.bookService.deleteBook(id);
  }
}
