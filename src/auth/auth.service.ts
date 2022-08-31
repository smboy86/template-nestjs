import { HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { ValidateReqDto, ValidateResDto } from './dtos';

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService) {}

  async validate({ token }: ValidateReqDto): Promise<ValidateResDto> {
    // const decoded: Auth = await this.jwtService.verify(token);
    // if (!decoded) {
    //   return { status: HttpStatus.FORBIDDEN, error: ['Token is invalid'], userId: null };
    // }
    // const auth: Auth = await this.jwtService.validateUser(decoded);
    // if (!auth) {
    //   return { status: HttpStatus.CONFLICT, error: ['User not found'], userId: null };
    // }
    // return { status: HttpStatus.OK, error: null, userId: decoded.id };

    return { status: HttpStatus.OK, error: null, userId: null };
  }
}
