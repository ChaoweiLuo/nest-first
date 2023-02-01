import { Injectable, NotFoundException } from '@nestjs/common';
import { Book } from './book.schema';
import { randomUUID } from 'crypto';

@Injectable()
export class BookService {

  private readonly books: Array<Book>;

  constructor() {
    this.books = [];
  }

  createBook({ name, price }: Omit<Book, 'id'>) {
    const book = new Book();
    book.id = randomUUID();
    book.name = name;
    book.price = price;
    this.books.push(book);
    return book;
  }

  editBook(id: string, { name, price }: Omit<Book, 'id'>) {
    const book = this.books.find(b => b.id === id);
    if(!book) throw new NotFoundException();
    book.name = name;
    book.price = price;
  }

  deleteBook(id: string) {
    const index = this.books.findIndex(b => b.id === id);
    if(index<0) throw new NotFoundException();
    const [book] = this.books.splice(index, 1);
    return book;
  }

  listBooks() {
    return this.books;
  }

  findBook(id: string) {
    const book = this.books.find(b => b.id === id);
    if(!book) throw new NotFoundException();
    return book;
  }


}
