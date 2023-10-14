import { ExecutionContext, Injectable } from '@nestjs/common';
import { AuthGuard, IAuthGuard } from '@nestjs/passport';

@Injectable()
export class RefreshTokenGuard
  extends AuthGuard('jwt-rt')
  implements IAuthGuard
{
  // TODO - 용도??
  public handleRequest(err: unknown, user: any): any {
    // user = 1) strategy 에서 넘겨주는 { } 값 전체
    // console.log('2) jwt-rt GUARD handleRequest user :::   ', user);
    // ex) err : null, user: false
    return user;
  }

  // TODO - 용도???
  public async canActivate(context: ExecutionContext): Promise<boolean> {
    await super.canActivate(context);

    // const { user }: Request = context.switchToHttp().getRequest();
    console.log('3) jwt-rt GUARD canActivate user::: ');
    // TODO - validation 토큰을 가지고 있는지 확인
    // TODO - validation 토큰이 유효한지 확인

    return true;
  }
}
