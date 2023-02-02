import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateMysqlDto } from './dto/create-mysql.dto';
import { UpdateMysqlDto } from './dto/update-mysql.dto';
import { User } from './entities/user.entity';

@Injectable()
export class MysqlService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  create(createMysqlDto: CreateMysqlDto) {
    const user = this.usersRepository.create(createMysqlDto);
    return this.usersRepository.insert(user);
  }

  findAll() {
    return this.usersRepository.find();
  }

  findOne(id: number) {
    return this.usersRepository.findOneBy({ id });
  }

  update(id: number, updateMysqlDto: UpdateMysqlDto) {
    return this.usersRepository.update(id, updateMysqlDto);
  }

  remove(id: number) {
    return this.usersRepository.delete(id);
  }
}
