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
    return this.authService.join(body);
  }

  @Post('/login')
  login(@Body() body: LoginReqDto) {
    return this.authService.login(body);
  }

  validate(payload: ValidateReqDto): Promise<ValidateResDto> {
    return this.authService.validate(payload);
  }
}
