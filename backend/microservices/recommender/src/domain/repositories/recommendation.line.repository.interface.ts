import { RecommendationLine } from "../models/recommendation.line.model";
import { Recommendation } from "../models/recommendation.model";

export interface IRecommendationLineRepository {
  save(recommendationLine: RecommendationLine): Promise<void>;
  findByRecommendation(recommendation: Recommendation): Promise<RecommendationLine>;
  //findLatestByStudent(student: Student): Promise<Recommendation | null>;
  //findAll()
  //findAllByStudent()
}
