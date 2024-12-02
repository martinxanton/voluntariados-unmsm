import {
  ApolloFederationDriver,
  ApolloFederationDriverConfig,
} from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { VolRecResolver } from './volunteering.recommendations.resolver';
import { ApolloServerPluginInlineTrace } from '@apollo/server/plugin/inlineTrace';
import { GetVolRecUseCase } from '../../application/use-cases/get-volunteering-recommendation.usecase';
import { UserService } from '../../domain/services/user.service';
import { VolRecommendationService } from '../../domain/services/volunteering.recommendation.service';
import { DatabaseModule } from '../db/database.module';
import { UsrRecommendationService } from '../../domain/services/user.recommendation.service';
import { GetUsrRecUseCase } from '../../application/use-cases/get-user-recommendation.usecase';
import { VolunteeringService } from '../../domain/services/volunteering.service';
import { UsrRecResolver } from './user.recommendations.resolver';

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
    UserService,
    VolunteeringService,
    VolRecommendationService,
    UsrRecommendationService,
    GetVolRecUseCase,
    GetUsrRecUseCase,
    VolRecResolver,
    UsrRecResolver,
  ],
})
export class RecommendationsModule {}
