import {
  ForbiddenException,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { JoinReqDto } from './dtos/join.req.dto';
import { UserResDto } from './dtos/user.res.dto';
import { ValidateReqDto } from './dtos/validate.req.dto';
import { ValidateResDto } from './dtos/validate.res.dto';
import * as bcrypt from 'bcryptjs';
import { LoginReqDto } from './dtos/login.req.dto';
import { JwtTokens } from './types/tokens.type';
import { JwtPayload } from './types';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private config: ConfigService,
    private prisma: PrismaService,
    private jwtService: JwtService,
  ) {}

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
    console.log('join body ;:: ', email, password);

    // valid - 기 가입자인지 확인
    const user = await this.prisma.user.findUnique({
      where: {
        email: email,
      },
    });

    if (user) {
      throw new HttpException('Conflict', HttpStatus.CONFLICT);
    }

    //// 회원가입 프로세스 시작
    const salt: string = bcrypt.genSaltSync(10);
    const hashPw: string = bcrypt.hashSync(password, salt);

    // 1) 해시 패스워드 생성
    const userObj: JoinReqDto = {
      email: email,
      password: hashPw,
    };

    // 2) DB INSERT
    const createdUser = await this.prisma.user.create({
      data: userObj,
      select: {
        id: true,
        email: true,
        regDt: true,
        modDt: true,
      },
    });

    // 3) 리프레시 토큰 업데이트
    const tokens = await this.getTokens(createdUser.id, createdUser.email);
    await this.updateRtHash(createdUser.id, tokens.refresh_token);

    // 4) 결과 전달
    return {
      email: createdUser.email,
    };
  }

  async login(body: LoginReqDto) {
    // TODO - 잘못된 body 값 왔을때 에러 처리 class-validation 을 넣어야 되나?
    const user = await this.prisma.user.findUnique({
      where: {
        email: body.email,
      },
    });

    if (!user) throw new ForbiddenException('Access Denied');

    const passwordMatches = await bcrypt.compareSync(
      body.password,
      user.password,
    );

    if (!passwordMatches) throw new ForbiddenException('Access Denied');

    const tokens = await this.getTokens(user.id, user.email);
    await this.updateRtHash(user.id, tokens.refresh_token);

    return tokens;
  }

  /////// commons
  // 토큰 발행
  async getTokens(userId: number, email: string): Promise<JwtTokens> {
    const jwtPayload: JwtPayload = {
      sub: userId,
      email: email,
    };

    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(jwtPayload, {
        secret: this.config.get<string>('JWT_ACCESS_SECRET'),
        expiresIn: this.config.get<string>('JWT_ACCESS_EXPIRES'),
      }),
      this.jwtService.signAsync(jwtPayload, {
        secret: this.config.get<string>('JWT_REFRESH_SECRET'),
        expiresIn: this.config.get<string>('JWT_REFRESH_EXPIRES'),
      }),
    ]);

    return {
      access_token: accessToken,
      refresh_token: refreshToken,
    };
  }

  // 리프레시 토큰 업데이트
  async updateRtHash(userId: number, refreshToken: string): Promise<void> {
    const salt: string = bcrypt.genSaltSync(10);
    const hashRefreshToken: string = bcrypt.hashSync(refreshToken, salt);

    await this.prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        hashRefreshToken: hashRefreshToken,
      },
    });
  }
}
