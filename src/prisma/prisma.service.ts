import {
  INestApplication,
  Injectable,
  OnModuleDestroy,
  OnModuleInit,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService
  extends PrismaClient
  implements OnModuleInit, OnModuleDestroy
{
  constructor(config: ConfigService) {
    const url = config.get<string>('DATABASE_URL');

    super({
      datasources: {
        db: {
          url,
        },
      },
    });
  }

  // TODO - 사용처 확인 요망
  async onModuleDestroy() {
    await this.$connect();
  }

  // TODO - 사용처 확인 요망
  async onModuleInit() {
    await this.$disconnect();
  }

  // TODO - 사용처 확인 요망 (test 용도)
  async cleanDatabase() {
    if (process.env.NODE_ENV === 'production') return;

    return Promise.all([this.user.deleteMany()]);
  }

  // TODO - 사용처 확인 요망
  async enableShutdownHooks(app: INestApplication) {
    this.$on('beforeExit', async () => {
      await app.close();
    });
  }
}
