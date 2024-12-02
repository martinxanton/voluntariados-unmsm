import { VolRecommendationLine } from './volunteering.recommendation.line.model';
import { User } from './user.model';

export class VolRecommendation {
  constructor(
    public readonly user: User,
    public lines: VolRecommendationLine[] = [],
    public createdAt: Date = new Date(),
    public id?: Number,
    public modelName?: string,
    public modelVersion?: string,
  ) {}
}
