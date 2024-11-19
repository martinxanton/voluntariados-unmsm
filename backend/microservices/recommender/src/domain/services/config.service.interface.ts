export interface IConfigService {
  get dbHost(): string;
  get dbPort(): number;
  get dbUser(): string;
  get dbPwd(): string;
  get dbName(): string;
  get recommendationRefreshDays(): number;
  get modelServingUrl(): string;
  get port(): number;
  get isProduction(): boolean;
}
