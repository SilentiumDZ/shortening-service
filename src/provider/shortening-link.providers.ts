import {Provider} from "@nestjs/common";
import * as IORedis from 'ioredis';

export const REDIS_PROVIDER = 'REDIS_PROVIDER';

export const appProviders = [
  {
    provide: REDIS_PROVIDER,
    useFactory: () => new IORedis({
      host: process.env.REDIS_HOST,
      port: +(process.env.REDIS_PORT),
    }),
  }

] as Provider[];
