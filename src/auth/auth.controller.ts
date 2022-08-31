import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { JoinReqDto } from './dtos/join.req.dto';
import { LoginReqDto } from './dtos/login.req.dto';
import { ValidateReqDto } from './dtos/validate.req.dto';
import { ValidateResDto } from './dtos/validate.res.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/join')
  join(@Body() body: JoinReqDto) {
    console.log('1111:: ', body);
    return 'Created User ::: ' + body.email;
  }

  @Post('/login')
  login(@Body() body: LoginReqDto) {
    return '로그인';
  }

  validate(payload: ValidateReqDto): Promise<ValidateResDto> {
    return this.authService.validate(payload);
  }
}
