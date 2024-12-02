import { Volunteering } from "./volunteering.model";
import { VolRecommendation } from "./volunteering.recommendation.model";

export class VolRecommendationLine {
  constructor(
    public readonly recommendation: VolRecommendation,
    public readonly volunteering: Volunteering,
    public readonly score: number,
  ) {}
}
