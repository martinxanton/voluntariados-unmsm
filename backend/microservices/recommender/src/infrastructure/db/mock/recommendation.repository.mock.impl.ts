import { User } from '../../../domain/models/user.model';
import { VolRecommendation } from '../../../domain/models/volunteering.recommendation.model';
import { IVolRecommendationRepository } from '../../../domain/repositories/volunteering.recommendation.repository.interface';
import { Volunteering } from '../../../domain/models/volunteering.model';
import { VolRecommendationLine } from '../../../domain/models/volunteering.recommendation.line.model';

export class MockRecommendationRepository implements IVolRecommendationRepository {
  private recommendations: VolRecommendation[] = [];

  constructor() {}

  create(recommendation: VolRecommendation): Promise<VolRecommendation> {
    this.recommendations.push(recommendation);
    return Promise.resolve(recommendation);
  }

  fetchByUser(student: User): Promise<VolRecommendation> {
    const recommendation = new VolRecommendation(student);
    recommendation.lines.push(
      new VolRecommendationLine(recommendation, new Volunteering(1), 10.0),
    );
    return Promise.resolve(recommendation);
  }

  findById(id: number): Promise<VolRecommendation | null> {
    return Promise.resolve(
      this.recommendations.find((r) => r.user.id === id),
    );
  }

  findLatestByUser(student: User): Promise<VolRecommendation | null> {
    return Promise.resolve(
      this.recommendations.find((r) => r.user.id === student.id),
    );
  }
}
