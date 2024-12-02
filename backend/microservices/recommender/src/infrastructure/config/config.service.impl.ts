import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { IConfigService } from '../../domain/services/config.service.interface';

@Injectable()
export class AppConfigService implements IConfigService {
  constructor(private configService: ConfigService) {}

  get dbHost(): string {
    return this.configService.get<string>('DB_HOST');
  }

  get dbPort(): number {
    return this.configService.get<number>('DB_PORT');
  }

  get dbUser(): string {
    return this.configService.get<string>('DB_USER');
  }

  get dbPwd(): string {
    return this.configService.get<string>('DB_PWD');
  }

  get dbName(): string {
    return this.configService.get<string>('DB_NAME');
  }

  get recommendationRefreshDays(): number {
    return this.configService.get<number>('RECOMMENDATION_REFRESH_DAYS', 1);
  }
  
  get userServiceUrl(): string {
    return this.configService.get<string>('USER_SERVICE_URL');
  }
  
  get volunteeringServiceUrl(): string {
    return this.configService.get<string>('VOLUNTEERING_SERVICE_URL');
  }

  get modelServingUrl(): string {
    return this.configService.get<string>('MODEL_SERVING_URL');
  }
  
  get modelVolunteering(): string {
    return this.configService.get<string>('MODEL_VOLUNTEERING');
  }
  
  get modelUser(): string {
    return this.configService.get<string>('MODEL_USER');
  }

  get port(): number {
    return this.configService.get<number>('PORT', 3003);
  }

  get gcpKeyPath(): string {
    return this.configService.get<string>('GCP_KEY_PATH', '');
  }

  get gcpScopes(): string[] {
    return this.configService.get<string>('GCP_SCOPES', '').split(',');
  }
}
