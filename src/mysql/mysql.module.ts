import { Module } from '@nestjs/common';
import { MysqlService } from './mysql.service';
import { MysqlController } from './mysql.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [MysqlController],
  providers: [MysqlService]
})
export class MysqlModule {}
