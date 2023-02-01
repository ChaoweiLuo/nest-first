import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Redis } from 'ioredis';

@Injectable()
export class RedisService extends Redis {
  constructor(private readonly configService: ConfigService) {
    const url = configService.get<string>("REDIS_URL");
    const db = +configService.get<number>("REDIS_DB", 0);
    super(url, { db });
  }
}
