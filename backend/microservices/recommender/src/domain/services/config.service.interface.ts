export interface IConfigService {
  get recommendationRefreshDays(): number;
  get port(): number;
  get modelServingUrl(): string;
}