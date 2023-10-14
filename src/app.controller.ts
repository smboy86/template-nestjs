import { Controller, Get, UseGuards } from '@nestjs/common';
import { ApiOperation } from '@nestjs/swagger';
import { AppService } from './app.service';
import { AccessTokenGuard } from './common/guards/accessToken.guard';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @ApiOperation({ summary: '헬로 서버' })
  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @ApiOperation({ summary: 'private 서버 정보' })
  @UseGuards(AccessTokenGuard)
  @Get('/appinfo')
  getAppInfo() {
    return this.appService.getAppInfo();
  }
}
