import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { RedisService } from './redis.service';

@Injectable()
export class AppService {
  constructor(
    private readonly configService: ConfigService,
    private readonly redisService: RedisService,
  ) {}

  getHello(): string {
    return this.configService.get<string>('APP_NAME');
  }

  setRedisSomeValue(key: string, value: string, ex: number = 60) {
    return this.redisService.set(key, value, 'EX', ex);
  }

  getRedisSomeValue(key: string) {
    return this.redisService.get(key);
  }

}
