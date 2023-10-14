import { ApiProperty } from '@nestjs/swagger';

export class LogoutReqDto {
  @ApiProperty({
    required: true,
    description: '유저아이디',
    example: '1',
  })
  userId: string;
}
