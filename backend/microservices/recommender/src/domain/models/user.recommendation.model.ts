import { UsrRecommendationLine } from "./user.recommendation.line.model";
import { Volunteering } from "./volunteering.model";

export class UsrRecommendation {
  constructor(
    public readonly volunteering: Volunteering,
    public lines: UsrRecommendationLine[] = [],
    public createdAt: Date = new Date(),
    public id?: Number,
    public modelName?: string,
    public modelVersion?: string,
  ) {}
}
