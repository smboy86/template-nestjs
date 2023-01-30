import {
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Param,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  @UseGuards(JwtAuthGuard)
  findAllUser() {
    return this.userService.findAll();
  }

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
