import { User } from "./user.model";
import { UsrRecommendation } from "./user.recommendation.model";

export class UsrRecommendationLine {
  constructor(
    public readonly recommendation: UsrRecommendation,
    public readonly user: User,
    public readonly score: number,
  ) {}
}
