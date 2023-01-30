import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  public findAll() {
    return this.prisma.user.findMany();
  }

  async findUserById(id: number) {
    const resultFind = await this.prisma.user.findUnique({
      where: {
        id: id,
      },
    });

    return resultFind;
  }
}
