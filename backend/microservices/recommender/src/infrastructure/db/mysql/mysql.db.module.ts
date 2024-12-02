import { Module } from '@nestjs/common';
import { IConfigService } from '../../../domain/services/config.service.interface';
import { createPool } from 'mysql2/promise';
import { VolRecommendationRepository } from './volunteering.recommendation.repository.impl';
import { UserRepository } from './user.repository.impl';
import { VolRecommendationLineRepository } from './volunteering.recommendation.line.repository.impl';
import { TensorflowModule } from '../tensorflow/tensorflow.module';
import { VolunteeringRepository } from './volunteering.repository.impl';
import { UsrRecommendationRepository } from './user.recommendation.repository.impl';
import { UsrRecommendationLineRepository } from './user.recommendation.line.repository.impl';

@Module({
  imports: [TensorflowModule],
  providers: [
    {
      provide: 'DB_CONNECTION',
      useFactory: async (configService: IConfigService) => {
        return createPool({
          host: configService.dbHost,
          port: configService.dbPort,
          user: configService.dbUser,
          password: configService.dbPwd,
          database: configService.dbName,
          waitForConnections: true,
          connectionLimit: 10,
          queueLimit: 0,
        });
      },
      inject: ['IConfigService'],
    },
    {
      provide: 'IVolRecommendationRepository',
      useClass: VolRecommendationRepository,
    },
    {
      provide: 'IVolRecommendationLineRepository',
      useClass: VolRecommendationLineRepository,
    },
    {
      provide: 'IUsrRecommendationRepository',
      useClass: UsrRecommendationRepository,
    },
    {
      provide: 'IUsrRecommendationLineRepository',
      useClass: UsrRecommendationLineRepository,
    },
    {
      provide: 'IUserRepository',
      useClass: UserRepository,
    },
    {
      provide: 'IVolunteeringRepository',
      useClass: VolunteeringRepository,
    },
  ],
  exports: [
    'DB_CONNECTION',
    'IVolRecommendationRepository',
    'IUsrRecommendationRepository',
    'IVolRecommendationLineRepository',
    'IUsrRecommendationLineRepository',
    'IUserRepository',
    'IVolunteeringRepository',
  ],
})
export class MysqlDbModule {}
