import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { JoinReqDto } from './dtos/join.req.dto';
import { LoginReqDto } from './dtos/login.req.dto';
import { LogoutReqDto } from './dtos/logout.req.dto';
import { ValidateReqDto } from './dtos/validate.req.dto';
import { ValidateResDto } from './dtos/validate.res.dto';
import { JwtAuthGuard } from './guards/jwt-auth.guard';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiOperation({ summary: '회원가입' })
  @Post('/join')
  join(@Body() body: JoinReqDto) {
    return this.authService.join(body);
  }

  @ApiOperation({ summary: '로그인' })
  @Post('/login')
  login(@Body() body: LoginReqDto) {
    return this.authService.login(body);
  }

  @ApiOperation({ summary: '로그아웃' })
  @Post('/logout')
  @UseGuards(JwtAuthGuard)
  logout(@Body() body: LogoutReqDto) {
    return this.authService.logout(body);
  }

  validate(payload: ValidateReqDto): Promise<ValidateResDto> {
    return this.authService.validate(payload);
  }
}
