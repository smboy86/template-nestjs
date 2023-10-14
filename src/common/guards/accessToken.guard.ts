import { ExecutionContext, Injectable } from '@nestjs/common';
import { AuthGuard, IAuthGuard } from '@nestjs/passport';
import { Request } from 'express';

@Injectable()
export class AccessTokenGuard
  extends AuthGuard('jwt-at')
  implements IAuthGuard
{
  // strategy -> guard
  public handleRequest(err: unknown, user: any): any {
    console.log('2) jwt-at GUARD handleRequest user :::   ', err, user);
    //err : null, user: false
    return user;
  }

  public async canActivate(context: ExecutionContext): Promise<boolean> {
    await super.canActivate(context);

    const { user }: Request = context.switchToHttp().getRequest();
    console.log('3) jwt-at GUARD canActivate user::: ', user);
    // TODO - validation 토큰을 가지고 있는지 확인
    // TODO - validation 토큰이 유효한지 확인

    return user ? true : false;
  }
}
