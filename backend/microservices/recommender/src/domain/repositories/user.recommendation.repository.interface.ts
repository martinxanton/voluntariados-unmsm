import { UsrRecommendation } from "../models/user.recommendation.model";
import { Volunteering } from "../models/volunteering.model";

export interface IUsrRecommendationRepository {
  create(recommendation: UsrRecommendation): Promise<UsrRecommendation>;
  fetchByVolunteering(volunteering: Volunteering): Promise<UsrRecommendation>;
  findById(id: number): Promise<UsrRecommendation | null>;
  findLatestByVolunteering(volunteering: Volunteering): Promise<UsrRecommendation | null>;
}
