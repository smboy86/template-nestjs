import {
  Inject,
  Injectable,
  Logger,
  LoggerService,
  NestMiddleware,
} from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  constructor(@Inject(Logger) private readonly loggerService: LoggerService) {}

  use(req: Request, res: Response, next: NextFunction) {
    const { ip, method, originalUrl } = req;
    const userAgent = req.get('user-agent');

    res.on('finish', () => {
      const { statusCode } = res;
      // timestamp 서버 로그에서는 중복되는데, winstonDaily 파일 로그에는 시간이 없어서 표기를 위해 추가
      // TODO - winstonDaily 설정에 시간을 넣을 수 있으면 없어도 되는 옵션
      const timestamp = new Date()
        .toISOString()
        .replace(/T/, ' ')
        .replace(/\..+/, '');
      const _query = JSON.stringify(req.query ? req.query : {});
      const _body = JSON.stringify(req.body ? req.body : {});

      this.loggerService.log(
        `${timestamp} ${method} ${originalUrl} ${statusCode} ${_query} ${_body} ${ip} ${userAgent}`,
      );
    });

    next();
  }
}
