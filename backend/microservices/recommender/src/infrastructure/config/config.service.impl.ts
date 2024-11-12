import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { IConfigService } from 'src/domain/services/config.service.interface';

@Injectable()
export class AppConfigService implements IConfigService {
  constructor(private configService: ConfigService) {}

  get recommendationRefreshDays(): number {
    return this.configService.get<number>('RECOMMENDATION_REFRESH_DAYS', 1);
  }

  get port(): number {
    return this.configService.get<number>('PORT', 3003);
  }

  get modelServingUrl(): string {
    return this.configService.get<string>(
      'MODEL_SERVING_URL',
      'http://localhost:8501/v1/models/recommender:predict',
    );
  }
}
