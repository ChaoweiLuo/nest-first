import { Inject, Injectable, LoggerService } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Cron, CronExpression } from '@nestjs/schedule';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';
import { RedisService } from './redis.service';

@Injectable()
export class AppService {
  constructor(
    private readonly configService: ConfigService,
    private readonly redisService: RedisService,
    @Inject(WINSTON_MODULE_NEST_PROVIDER) private readonly logger: LoggerService
  ) {}

  @Cron(CronExpression.EVERY_5_SECONDS)
  appJob() {
    this.logger.log('appJob Running.', new Date());
  }

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
