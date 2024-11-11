import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { IConfigService } from 'src/domain/services/config.service.interface';

@Injectable()
export class AppConfigService implements IConfigService {
  constructor(private configService: ConfigService) {}
  
  get getPort(): number {
    return this.configService.get<number>('PORT', 3003);
  }

  get getRecommendationRefreshDays(): number {
    return this.configService.get<number>('RECOMMENDATION_REFRESH_DAYS', 1);
  }
}
