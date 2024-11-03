import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
import * as cors from 'cors';
import * as dotenv from 'dotenv';

async function bootstrap() {
  dotenv.config();

  const port = process.env.PORT;  
  const app = await NestFactory.create(AppModule);

    // Enable CORS
    app.use(cors());


  const config = new DocumentBuilder()
  .setTitle('order-Management')
  .setDescription('APIs for orders Management System')
  .setVersion('1.0')
  .addTag('order-management')
  .addBearerAuth()
  .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs-order-api', app, document);

  // Enable validation globally
  app.useGlobalPipes(new ValidationPipe({ transform: true }));
  await app.listen(port);
}
bootstrap();