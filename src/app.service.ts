import { Injectable } from '@nestjs/common';
import { PrismaService } from './prisma/prisma.service';

@Injectable()
export class AppService {
  constructor(private prisma: PrismaService) {}

  getHello(): string {
    return `11Hello World!\n App Name : ${process.env.APP_NAME}\n Port : ${process.env.PORT}`;
  }

  getAppInfo() {
    return this.prisma.appInfo.findMany();
  }
}
