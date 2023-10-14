import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { LogoutReqDto } from './dtos/logout.req.dto';
import { UpdateUserDto } from './dtos/updateUser.req.dto';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async logout(body: LogoutReqDto): Promise<string> {
    // TODO - 유효성 검사
    const userId = Number(body.userId);
    const resultCnt = await this.prisma.user.updateMany({
      where: {
        id: userId,
        hashRefreshToken: {
          not: null,
        },
      },
      data: {
        hashRefreshToken: null,
      },
    });

    return resultCnt.count > 0 ? 'good-bye' : 'fail';
  }

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

  async update(id: number, updateUserDto: UpdateUserDto) {
    return this.prisma.user.update({
      where: {
        id: id,
      },
      data: {
        hashRefreshToken: updateUserDto.refreshToken,
      },
    });
  }
}
