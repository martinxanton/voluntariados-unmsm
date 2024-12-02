export interface IConfigService {
  get dbHost(): string;
  get dbPort(): number;
  get dbUser(): string;
  get dbPwd(): string;
  get dbName(): string;
  get userServiceUrl(): string;
  get volunteeringServiceUrl(): string;
  get recommendationRefreshDays(): number;
  get modelServingUrl(): string;
  get modelVolunteering(): string;
  get modelUser(): string;
  get port(): number;
  get gcpKeyPath(): string;
  get gcpScopes(): string[];
}
