import { Module } from '@nestjs/common';
import { AppConfigModule } from '../config/config.module';
import { RecommendationsModule } from '../graphql/recommendations.module';
import { DatabaseModule } from '../db/database.module';

@Module({
  imports: [RecommendationsModule, AppConfigModule, DatabaseModule],
})
export class AppModule {}
