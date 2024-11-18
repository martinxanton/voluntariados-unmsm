import { Program } from "./program.model";
import { Recommendation } from "./recommendation.model";

export class RecommendationLine {
  constructor(
    public readonly recommendation: Recommendation,
    public readonly program: Program,
    public readonly score: number,
    public id?: number,
  ) {}
}
