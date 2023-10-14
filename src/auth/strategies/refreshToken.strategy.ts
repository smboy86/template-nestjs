import { Injectable, RequestTimeoutException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ConfigService } from '@nestjs/config';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Request } from 'express';

@Injectable()
export class RefreshTokenStrategy extends PassportStrategy(Strategy, 'jwt-rt') {
  constructor(private readonly configService: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: configService.get('JWT_REFRESH_SECRET'),
      ignoreExpiration: false, // false = 유효기간 사용
      passReqToCallback: true, // validate에서 넘겨주는 파라미터를 순수 req로 주기 위한 옵션 - default: jwt 파싱한 payload
    });
  }

  validate(req: Request, payload: any) {
    const refreshToken = req.get('Authorization').replace('Bearer', '').trim();
    // console.log('1) stretegy validate - payload :::  ', {
    //   ...payload,
    //   refreshToken,
    // });
    return { ...payload, refreshToken };
  }
}
