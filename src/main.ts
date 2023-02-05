import { ConfigService } from '@nestjs/config/dist';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';
import * as session from 'express-session';
import { ValidationPipe } from '@nestjs/common';
import * as csurf from 'csurf';
import * as compression from 'compression';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);

  const config = new DocumentBuilder()
    .setTitle('Book example')
    .setDescription('The books API description')
    .setVersion('1.0')
    .addTag('books')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  app.enableCors();
  app.use(csurf());
  app.use(compression());

  const port = configService.get<string>('PORT');

  app.use(cookieParser());

  app.useGlobalPipes(new ValidationPipe({ }));

  app.use(
    session({
      secret: configService.get('SESSION_SECRET', 'nest-first'),
      resave: false,
      saveUninitialized: false,
    }),
  );

  await app.listen(port || 3001);
}
bootstrap();
