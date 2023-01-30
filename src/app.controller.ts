import { Controller, Get, UseGuards } from '@nestjs/common';
import { ApiOperation } from '@nestjs/swagger';
import { AppService } from './app.service';
import { JwtAuthGuard } from './auth/guards/jwt-auth.guard';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @ApiOperation({ summary: '헬로 서버' })
  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @ApiOperation({ summary: 'private 서버 정보' })
  @UseGuards(JwtAuthGuard)
  @Get('/appinfo')
  getAppInfo() {
    return this.appService.getAppInfo();
  }
}
