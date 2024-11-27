import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AppConfigService {
  constructor(private configService: ConfigService) {}
  
  get port(): number {
    return this.configService.get<number>('PORT', 3000);
  }

  get apiUsersUrl(): string {
    return this.configService.get<string>('API_USERS_URL');
  }

  get apiProgramsUrl(): string {
    return this.configService.get<string>('API_PROGRAMS_URL');
  }
  
  get apiRecommenderUrl(): string {
    return this.configService.get<string>('API_RECOMMENDER_URL');
  }
}

