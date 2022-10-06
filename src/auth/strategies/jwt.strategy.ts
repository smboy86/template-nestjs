import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ConfigService } from '@nestjs/config';
import { ExtractJwt, Strategy } from 'passport-jwt';

// console에 찍어보니 이렇게 나와서 type 작성
type ValiedPayload = {
  sub: number;
  email: string;
  iat: number;
  exp: number;
};
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(private readonly configService: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get('JWT_ACCESS_SECRET'),
    });
  }

  async validate(payload: ValiedPayload): Promise<ValiedPayload> {
    console.log('1) jwt.strategy validate  :::  ', payload);
    // TODO :: 유저가 있는지 없는지 체크 해야함
    return payload;
  }
}
