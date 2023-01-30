import { ApiProperty } from '@nestjs/swagger';

export class LoginReqDto {
  @ApiProperty({
    required: true,
    description: '유저 이메일',
    example: 'test1@dev.com',
  })
  email: string;
  @ApiProperty({
    required: true,
    description: '유저 패스워드',
    example: 'qwe123',
  })
  password: string;
}
