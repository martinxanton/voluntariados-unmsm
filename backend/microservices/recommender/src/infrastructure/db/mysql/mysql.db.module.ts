import { Module } from '@nestjs/common';
import { IConfigService } from '../../../domain/services/config.service.interface';
import { createPool } from 'mysql2/promise';
import { RecommendationRepository } from './recommendation.repository.impl';
import { StudentRepository } from './student.repository.impl';
import { HttpModule } from '@nestjs/axios';
import { RecommendationLineRepository } from './recommendation.line.repository.impl';

@Module({
  imports: [HttpModule],
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
      provide: 'IRecommendationRepository',
      useClass: RecommendationRepository,
    },
    {
      provide: 'IRecommendationLineRepository',
      useClass: RecommendationLineRepository,
    },
    {
      provide: 'IStudentRepository',
      useClass: StudentRepository,
    },
  ],
  exports: [
    'DB_CONNECTION',
    'IRecommendationRepository',
    'IRecommendationLineRepository',
    'IStudentRepository',
  ],
})
export class MysqlDbModule {}
