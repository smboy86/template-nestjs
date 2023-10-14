import { PartialType } from '@nestjs/mapped-types';
import { JoinUserReqDto } from './joinUser.req.dto';

export class UpdateUserDto extends PartialType(JoinUserReqDto) {}
