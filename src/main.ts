import { ConfigService } from '@nestjs/config/dist';
import { NestFactory, Reflector } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';
import * as session from 'express-session';
import { ValidationPipe } from '@nestjs/common';
import * as csurf from 'csurf';
import * as compression from 'compression';
import { AuthenticationGuard, AuthorizationGuard } from './user.dto';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';
import helmet from 'helmet';
import { rateLimit } from 'express-rate-limit';
import { NestExpressApplication } from '@nestjs/platform-express';
async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, { logger: ['error', 'warn'] });
  const configService = app.get(ConfigService);
  const reflector = app.get(Reflector);

  const config = new DocumentBuilder()
    .setTitle('Book example')
    .setDescription('The books API description')
    .setVersion('1.0')
    .addTag('books')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  app.useLogger(app.get(WINSTON_MODULE_NEST_PROVIDER));

  app.use(rateLimit({
    windowMs: 1000 * 60 * 10,
    max: 300
  }));
  app.set('trust proxy', true);

  app.use(cookieParser());
  app.use(
    session({
      secret: configService.get('SESSION_SECRET', 'nest-first'),
      resave: false,
      saveUninitialized: false,
    }),
  );
  app.enableCors();
  app.use(csurf());
  app.use(compression());
  app.use(helmet());

  const port = configService.get<string>('PORT');

  app.useGlobalPipes(new ValidationPipe({}));
  app.useGlobalGuards(new AuthenticationGuard(configService));
  app.useGlobalGuards(new AuthorizationGuard(reflector));

  await app.listen(port || 3001);
}
bootstrap();
