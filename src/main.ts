import { ValidationPipe } from '@nestjs/common';
import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { PrismaClientExceptionFilter, PrismaService } from 'nestjs-prisma';
import { logger } from './utils/logger';
import { ConfigService } from '@nestjs/config';
async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: logger,
  });

  const { httpAdapter } = app.get(HttpAdapterHost);
  app.useGlobalFilters(new PrismaClientExceptionFilter(httpAdapter));

  const prismaService: PrismaService = app.get(PrismaService);
  prismaService.enableShutdownHooks(app);

  app.enableCors();

  app.useGlobalPipes(new ValidationPipe());
  const port = 5000;
  await app.listen(port, () => {
    logger.log(`=================================`);
    logger.log(`======= ENV: ${process.env.NODE_ENV} =======`);
    logger.log(`🚀 App listening on the port ${port}`);
    logger.log(`=================================`);
  });
}
bootstrap();
