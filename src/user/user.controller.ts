import { Controller, Get, Param } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  findAllUser() {
    return this.userService.findAll();
  }

  @Get(':id')
  findUserById(@Param('id') id: string) {
    return this.userService.findUserById(+id);
  }
}
