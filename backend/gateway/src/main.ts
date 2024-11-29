import { NestFactory } from '@nestjs/core';
import { AppModule } from './infrastructure/web/app.module';
import { AppConfigService } from './infrastructure/config/config.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const port = app.get(AppConfigService).port;

  app.enableCors();

  await app.listen(port);
}
bootstrap();
