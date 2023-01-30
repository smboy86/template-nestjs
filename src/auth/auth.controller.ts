import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { JoinReqDto } from './dtos/join.req.dto';
import { LoginReqDto } from './dtos/login.req.dto';
import { LogoutReqDto } from './dtos/logout.req.dto';
import { ValidateReqDto } from './dtos/validate.req.dto';
import { ValidateResDto } from './dtos/validate.res.dto';
import { JwtAuthGuard } from './guards/jwt-auth.guard';

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

  @Post('/logout')
  @UseGuards(JwtAuthGuard)
  logout(@Body() body: LogoutReqDto) {
    return this.authService.logout(body);
  }

  validate(payload: ValidateReqDto): Promise<ValidateResDto> {
    return this.authService.validate(payload);
  }
}
