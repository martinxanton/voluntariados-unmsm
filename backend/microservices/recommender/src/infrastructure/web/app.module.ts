import { Module } from '@nestjs/common';
import { AppConfigModule } from '../config/config.module';
import { RecommendationsModule } from '../graphql/recommendations.module';

@Module({
  imports: [RecommendationsModule, AppConfigModule],
})
export class AppModule {}
