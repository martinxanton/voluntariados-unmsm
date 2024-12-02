import { VolRecommendationLine } from '../models/volunteering.recommendation.line.model';
import { VolRecommendation } from '../models/volunteering.recommendation.model';

export interface IVolRecommendationLineRepository {
  create(line: VolRecommendationLine): Promise<VolRecommendationLine>;
  findAllByRecommendation(
    recommendation: VolRecommendation,
  ): Promise<VolRecommendationLine[]>;
}
