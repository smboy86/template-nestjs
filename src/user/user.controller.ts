import {
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Param,
  UseGuards,
} from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { UserService } from './user.service';

@ApiTags('User')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @ApiOperation({ summary: '모든 유저 찾기' })
  @Get()
  @UseGuards(JwtAuthGuard)
  findAllUser() {
    return this.userService.findAll();
  }

  @ApiOperation({ summary: '특정 유저 정보 보기' })
  @Get(':id')
  @UseGuards(JwtAuthGuard)
  async findUserById(@Param('id') id: string) {
    const findResult = await this.userService.findUserById(+id);

    if (findResult == null) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }

    return findResult;
  }
}
