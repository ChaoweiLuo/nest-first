import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config/dist';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BookController } from './book/book.controller';
import { Book, BookSchema } from './book/book.schema';
import { BookService } from './book/book.service';
import { RedisService } from './redis.service';
import { MysqlModule } from './mysql/mysql.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ScheduleModule } from '@nestjs/schedule/dist';
import { MulterModule } from '@nestjs/platform-express/multer';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MulterModule.registerAsync({
      inject: [ConfigService],
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        dest: configService.get("FILE_DEST")
      }),
    }),
    MongooseModule.forRootAsync({
      inject: [ConfigService],
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get<string>('MONGO_URL'),
      }),
    }),
    MongooseModule.forFeature([{ name: Book.name, schema: BookSchema }]),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => {
        return {
          type: 'mysql',
          url: configService.get('MYSQL_URL'),
          entities: ['dist/**/*.entity{.ts,.js}'],
          synchronize: true,
        };
      },
    }),
    MysqlModule,
    ScheduleModule.forRoot(),
  ],
  controllers: [AppController, BookController],
  providers: [AppService, BookService, RedisService],
})
export class AppModule {}
