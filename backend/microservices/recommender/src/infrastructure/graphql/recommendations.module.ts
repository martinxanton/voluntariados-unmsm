import {
  ApolloFederationDriver,
  ApolloFederationDriverConfig,
} from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { RecommendationsResolver } from './recommendations.resolver';
import { ApolloServerPluginInlineTrace } from '@apollo/server/plugin/inlineTrace';
import { GetRecommendationUseCase } from '../../application/use-cases/get-recommendation.usecase';
import { StudentService } from '../../domain/services/student.service';
import { RecommendationService } from '../../domain/services/recommendation.service';
import { DatabaseModule } from '../db/database.module';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloFederationDriverConfig>({
      driver: ApolloFederationDriver,
      typePaths: ['**/*.graphql'],
      plugins: [ApolloServerPluginInlineTrace()],
    }),
    DatabaseModule,
  ],
  providers: [
    StudentService,
    RecommendationService,
    GetRecommendationUseCase,
    RecommendationsResolver,
  ],
})
export class RecommendationsModule {}
