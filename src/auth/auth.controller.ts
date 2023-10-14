import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { LoginReqDto } from './dtos/login.req.dto';
import { LogoutReqDto } from '../user/dtos/logout.req.dto';
import { AccessTokenGuard } from 'src/common/guards/accessToken.guard';
import { UserService } from 'src/user/user.service';
import { RefreshTokenGuard } from 'src/common/guards/refreshToken.guard';
import { Request } from 'express';
import { JoinUserReqDto } from 'src/user/dtos/joinUser.req.dto';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private userService: UserService,
  ) {}

  // validate(payload: ValidateReqDto): Promise<ValidateResDto> {
  //   return this.authService.validate(payload);
  // }

  @ApiOperation({ summary: '회원가입' })
  @Post('/join')
  join(@Body() body: JoinUserReqDto) {
    return this.authService.join(body);
  }

  @ApiOperation({ summary: '로그인' })
  @Post('/login')
  login(@Body() body: LoginReqDto) {
    return this.authService.login(body);
  }

  @ApiOperation({ summary: '로그아웃' })
  @Post('/logout')
  @UseGuards(AccessTokenGuard)
  async logout(@Body() body: LogoutReqDto) {
    // return this.authService.logout(body);
    const res = await this.userService.logout(body);
    console.log('ressss :: ', res);
    return res;
  }

  @UseGuards(RefreshTokenGuard)
  @Get('refresh')
  async refreshTokens(@Req() req: Request) {
    const userId = req.user['sub']; // userId
    const refreshToken = req.user['refreshToken']; // rt
    const tokens = await this.authService.refreshTokens(userId, refreshToken);
    return tokens;
  }
}
