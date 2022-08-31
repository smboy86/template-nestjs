import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { JoinReqDto } from './dtos/join.req.dto';
import { UserResDto } from './dtos/user.res.dto';
import { ValidateReqDto } from './dtos/validate.req.dto';
import { ValidateResDto } from './dtos/validate.res.dto';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService) {}

  async validate({ token }: ValidateReqDto): Promise<ValidateResDto> {
    // const decoded: Auth = await this.jwtService.verify(token);
    // if (!decoded) {
    //   return { status: HttpStatus.FORBIDDEN, error: ['Token is invalid'], userId: null };
    // }
    // const auth: Auth = await this.jwtService.validateUser(decoded);
    // if (!auth) {
    //   return { status: HttpStatus.CONFLICT, error: ['User not found'], userId: null };
    // }
    // return { status: HttpStatus.OK, error: null, userId: decoded.id };

    return { status: HttpStatus.OK, error: null, userId: null };
  }

  async join(payload: JoinReqDto): Promise<UserResDto | never> {
    const { email, password } = payload;
    const user = await this.prisma.user.findUnique({
      where: {
        email: email,
      },
    });

    if (user) {
      throw new HttpException('Conflict', HttpStatus.CONFLICT);
    }

    // 회원가입
    const salt: string = bcrypt.genSaltSync(10);

    const createUser: JoinReqDto = {
      email: email,
      password: bcrypt.hashSync(password, salt),
    };

    return this.prisma.user.create({
      data: createUser,
      select: {
        id: true,
        email: true,
        regDt: true,
        modDt: true,
      },
    });
  }
}
