import { IntrospectAndCompose } from '@apollo/gateway';
import { ApolloGatewayDriver, ApolloGatewayDriverConfig } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { AppConfigModule } from '../config/config.module';
import { AppConfigService } from '../config/config.service';

@Module({
  imports: [
    AppConfigModule,
    GraphQLModule.forRootAsync<ApolloGatewayDriverConfig>({
      imports: [AppConfigModule],
      inject: [AppConfigService],
      useFactory: (appConfigService: AppConfigService) => ({
        // driver: ApolloGatewayDriver,
        gateway: {
          supergraphSdl: new IntrospectAndCompose({
            subgraphs: [
              { name: 'users', url: appConfigService.apiUsersUrl },
              { name: 'programs', url: appConfigService.apiProgramsUrl },
              { name: 'recommender', url: appConfigService.apiRecommenderUrl },
            ],
          }),
        },
      }),
      driver: ApolloGatewayDriver,
    }),
  ],
})
export class AppModule {}
