import { Injectable, NotFoundException } from '@nestjs/common';
import { Book, BookDocument } from './book.schema';
import { randomUUID } from 'crypto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class BookService {
  private readonly books: Array<Book>;

  constructor(@InjectModel(Book.name) private bookModel: Model<BookDocument>) {
    this.books = [];
  }

  createBook({ name, price }: Omit<Book, 'id'>) {
    return this.bookModel.create({
      _id: randomUUID(),
      name,
      price
    });
  }

  editBook(id: string, { name, price }: Omit<Book, 'id'>) {
    return this.bookModel.findByIdAndUpdate(id, { $set: { name, price } })
  }

  deleteBook(id: string) {
    return this.bookModel.findByIdAndDelete(id);
  }

  listBooks() {
    return this.bookModel.find();
  }

  findBook(id: string) {
    return this.bookModel.findById(id);
  }
}
