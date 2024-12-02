import { UsrRecommendationLine } from '../models/user.recommendation.line.model';
import { UsrRecommendation } from '../models/user.recommendation.model';

export interface IUsrRecommendationLineRepository {
  create(line: UsrRecommendationLine): Promise<UsrRecommendationLine>;
  findAllByRecommendation(
    recommendation: UsrRecommendation,
  ): Promise<UsrRecommendationLine[]>;
}
