import { RecommendationLine } from '../models/recommendation.line.model';
import { Recommendation } from '../models/recommendation.model';

export interface IRecommendationLineRepository {
  create(recommendationLine: RecommendationLine): Promise<RecommendationLine>;
  findAllByRecommendation(
    recommendation: Recommendation,
  ): Promise<RecommendationLine[]>;
}
