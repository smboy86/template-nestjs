import { Injectable, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  constructor(config: ConfigService) {
    console.log('1111  :: ', config.get<string>('DATABASE_URL'));
    const url = config.get<string>('DATABASE_URL');

    super({
      datasources: {
        db: {
          url,
        },
      },
    });
  }
  async onModuleInit() {
    await this.$connect();
  }
}
