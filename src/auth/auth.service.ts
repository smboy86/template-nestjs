import {
  ForbiddenException,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { UserResDto } from './dtos/user.res.dto';
import * as bcrypt from 'bcryptjs';
import { LoginReqDto } from './dtos/login.req.dto';
import { JwtTokens } from './types/tokens.type';
import { JwtPayload } from './types';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { LogoutReqDto } from '../user/dtos/logout.req.dto';
import { UserService } from 'src/user/user.service';
import { JoinUserReqDto } from 'src/user/dtos/joinUser.req.dto';

@Injectable()
export class AuthService {
  constructor(
    private config: ConfigService,
    private prisma: PrismaService,
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  //// 내부 호출 위주 함수
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

  //////////////////////////////////

  async join(payload: JoinUserReqDto): Promise<UserResDto | never> {
    // TODO - 페이로드가 없으면 에러 발생 처리 multipart 방식으로 보내면 파라미터 못찾음
    const { email, password, name } = payload;
    console.log('join body ;:: ', email, password, name);

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
    const userObj: JoinUserReqDto = {
      email: email,
      password: hashPw,
      name: name,
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

  async refreshTokens(userId: number, refreshToken: string) {
    // 1) 유저 존재하는지 체크
    const selectedUser = await this.userService.findUserById(userId);
    if (!selectedUser || !selectedUser.hashRefreshToken)
      throw new ForbiddenException('Access Denied');

    // 2) refresh token 정상인지 체크
    const refreshTokenMatches = await bcrypt.compareSync(
      refreshToken,
      selectedUser.hashRefreshToken,
    );
    if (!refreshTokenMatches) throw new ForbiddenException('Access Denied');

    // 3) 토큰 새로 발행
    const tokens = await this.getTokens(userId, selectedUser.email);

    // 4) 유저의 토큰 업데이트
    await this.updateRtHash(selectedUser.id, tokens.refresh_token);

    return tokens;
  }
}
