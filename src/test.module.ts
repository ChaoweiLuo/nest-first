import { Inject, Injectable, Module } from '@nestjs/common';
import { BookService } from './book/book.service';

const app = { name: 'Nest-first-instance1', createdAt: '2023-02-07' };

interface App {
  name: string;
  createdAt: string | Date;
}

@Injectable()
class TestService {}

@Module({
  providers: [
    TestService,
    { provide: TestService.name, useClass: TestService },
    { provide: 'app', useValue: app },
    {
      provide: 'factory',
      inject: [{ token: 'app', optional: false }],
      useFactory: (app: App) => {
        return {
          name: 'factory',
          ...app,
        };
      },
    },
    {
      provide: 'factory',
      useFactory: async () => {
        return new Promise<App>(function (resolve) {
          setTimeout(() => {
            resolve({
              name: app.name,
              createdAt: new Date(),
            });
          }, Math.random() * 1000);
        });
      },
    },
    {
      provide: 'exists_book',
      useExisting: BookService,
    },
  ],
})
export class TestModule {}
