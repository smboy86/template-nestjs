import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as basicAuth from 'express-basic-auth';
import { ConfigService } from '@nestjs/config';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);

  // 1) CORS config
  app.enableCors({
    origin: true,
  });

  // 2) Swagger config
  const swaggerAdminId = configService.get('SWAGGER_USER');
  const swaggerAdminPw = configService.get('SWAGGER_PASSWORD');
  app.use(
    ['/docs', '/docs-json'],
    basicAuth({
      challenge: true,
      users: {
        [swaggerAdminId]: swaggerAdminPw,
      },
    }),
  );

  const config = new DocumentBuilder()
    .setTitle('마이스웨거')
    .setDescription('스웨거 API 출동')
    .setVersion('0.1')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document);

  // Run server
  const serverPort = configService.get('PORT', '3003');
  await app.listen(serverPort);
  console.log(`:::: SERVER RUN ${serverPort} ::::`);
}

bootstrap();
