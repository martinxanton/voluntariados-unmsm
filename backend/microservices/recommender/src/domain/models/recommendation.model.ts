import { RecommendationLine } from './recommendation.line.model';
import { Student } from './student.model';

export class Recommendation {
  constructor(
    public student: Student,
    public createdAt: Date,
    public lines: RecommendationLine[],
    public readonly id?: Number,
  ) {}
}
