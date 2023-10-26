import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  // Add Middleware
  app.useGlobalPipes(new ValidationPipe()); // *Validate data before going to Ctrl
  await app.listen(3002);
}
bootstrap();
