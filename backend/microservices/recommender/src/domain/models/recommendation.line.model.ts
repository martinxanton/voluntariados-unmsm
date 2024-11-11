import { Program } from "./program.model";
import { Recommendation } from "./recommendation.model";

export class RecommendationLine {
  constructor(
    public  readonly id: number,
    public recommendation: Recommendation,
    public program: Program,
    public score: number,
  ) {}
}
