import { NestFactory } from '@nestjs/core';
import { AppModule } from './infrastructure/web/app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const port = app.get('IConfigService').port;
  await app.listen(port);
}
bootstrap();
