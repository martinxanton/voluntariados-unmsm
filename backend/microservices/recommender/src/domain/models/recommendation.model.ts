import { RecommendationLine } from './recommendation.line.model';
import { Student } from './student.model';

export class Recommendation {
  constructor(
    public readonly student: Student,
    public lines: RecommendationLine[] = [],
    public createdAt: Date = new Date(),
    public id?: Number,
  ) {}
}
