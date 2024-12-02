import { VolRecommendation } from "../models/volunteering.recommendation.model";
import { User } from "../models/user.model";

export interface IVolRecommendationRepository {
  create(recommendation: VolRecommendation): Promise<VolRecommendation>;
  fetchByUser(user: User): Promise<VolRecommendation>;
  findById(id: number): Promise<VolRecommendation | null>;
  findLatestByUser(user: User): Promise<VolRecommendation | null>;
}
