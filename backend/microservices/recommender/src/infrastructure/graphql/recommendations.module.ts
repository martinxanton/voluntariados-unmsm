import {
  ApolloFederationDriver,
  ApolloFederationDriverConfig,
} from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { RecommendationsResolver } from './recommendations.resolver';
import { ApolloServerPluginInlineTrace } from '@apollo/server/plugin/inlineTrace';
import { GetRecommendationUseCase } from 'src/application/use-cases/get-recommendation.usecase';
import { RecommendationRepository } from '../db/recommendation.repository.impl';
import { StudentService } from 'src/domain/services/student.service';
import { StudentRepository } from '../db/student.repository.impl';
import { RecommendationService } from 'src/domain/services/recommendation.service';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloFederationDriverConfig>({
      driver: ApolloFederationDriver,
      typePaths: ['**/*.graphql'],
      plugins: [ApolloServerPluginInlineTrace()],
    }),
    HttpModule,
  ],
  providers: [
    {
      provide: 'IRecommendationRepository',
      useClass: RecommendationRepository,
    },
    {
      provide: 'IStudentRepository',
      useClass: StudentRepository,
    },
    StudentService,
    RecommendationService,
    GetRecommendationUseCase,
    RecommendationsResolver,
  ],
})
export class RecommendationsModule {}
