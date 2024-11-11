import { Global, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppConfigService } from './config.service.impl';

@Global()
@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: 'infrastructure/config/.env',
    }),
  ],
  providers: [
    {
      provide: 'IConfigService',
      useClass: AppConfigService,
    },
  ],
  exports: ['IConfigService'],
})
export class AppConfigModule {}
