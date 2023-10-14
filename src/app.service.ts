import { Injectable } from '@nestjs/common';
import { PrismaService } from './prisma/prisma.service';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AppService {
  constructor(
    private prisma: PrismaService,
    private config: ConfigService,
  ) {}

  getHello(): string {
    // return `Hello World!\n App Name : ${process.env.APP_NAME}\n Port : ${process.env.PORT}`;
    return `Hello World!\n App Name : ${this.config.get(
      'APP_NAME',
    )}\n Port : ${this.config.get('PORT')}`;
  }

  getAppInfo() {
    return this.prisma.appInfo.findMany();
  }
}
