import { ApiProperty } from '@nestjs/swagger';

export class JoinUserReqDto {
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
  @ApiProperty({
    required: true,
    description: '유저 이름',
    example: '나는나',
  })
  name: string;
  @ApiProperty({
    required: false,
    description: '리프레쉬 토큰',
    example: '',
  })
  refreshToken?: string;
}
