import { ExecutionContext, Injectable } from '@nestjs/common';
import { AuthGuard, IAuthGuard } from '@nestjs/passport';
import { Request } from 'express';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') implements IAuthGuard {
  // 어디서 호출 되나?? 아돈노~
  public handleRequest(err: unknown, user: any): any {
    console.log('jwt-auth GUARD ::: handleRequest  ', err, user);
    return user;
  }

  public async canActivate(context: ExecutionContext): Promise<boolean> {
    await super.canActivate(context);

    const { user }: Request = context.switchToHttp().getRequest();
    console.log('jwt-auth GUARD user::: ', user);

    return user ? true : false;
  }
}
