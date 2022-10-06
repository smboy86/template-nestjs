import { ExecutionContext, Injectable } from '@nestjs/common';
import { AuthGuard, IAuthGuard } from '@nestjs/passport';
import { Request } from 'express';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') implements IAuthGuard {
  // 어디서 호출 되나?? 아돈노~
  public handleRequest(err: unknown, user: any): any {
    console.log('2) jwt-auth GUARD handleRequest user :::   ', err, user);
    //err : null, user: false
    return user;
  }

  public async canActivate(context: ExecutionContext): Promise<boolean> {
    await super.canActivate(context);

    const { user }: Request = context.switchToHttp().getRequest();
    console.log('3) jwt-auth GUARD canActivate user::: ', user);
    // TODO - validation 토큰을 가지고 있는지 확인
    // TODO - validation 토큰이 유효한지 확인

    return user ? true : false;
  }
}
