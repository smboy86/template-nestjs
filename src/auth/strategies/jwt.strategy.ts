import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET,
    });
  }

  async validate(payload: {
    name: string;
    sub: string;
  }): Promise<{ name: string; sub: string }> {
    console.log('1111 -- jwt.strategy validate  :::  ', payload);
    // TODO :: 유저가 있는지 없는지 체크 해야함
    return payload;
  }
}
