import { Injectable } from '@nestjs/common';
import { PrismaService } from './prisma/prisma.service';

@Injectable()
export class AppService {
  constructor(private prisma: PrismaService) {}

  getHello(): string {
    return 'Hello World! NestJS SERVER';
  }

  getAppInfo() {
    return this.prisma.appInfo.findMany();
  }
}
