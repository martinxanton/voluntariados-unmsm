import { Student } from '../../../domain/models/student.model';
import { Recommendation } from '../../../domain/models/recommendation.model';
import { IRecommendationRepository } from '../../../domain/repositories/recommendation.repository.interface';
import { Program } from '../../../domain/models/program.model';
import { RecommendationLine } from '../../../domain/models/recommendation.line.model';

export class MockRecommendationRepository implements IRecommendationRepository {
  private recommendations: Recommendation[] = [];

  constructor() {}

  create(recommendation: Recommendation): Promise<Recommendation> {
    this.recommendations.push(recommendation);
    return Promise.resolve(recommendation);
  }

  fetchByStudent(student: Student): Promise<Recommendation> {
    const recommendation = new Recommendation(student);
    recommendation.lines.push(
      new RecommendationLine(recommendation, new Program(1), 10.0),
    );
    return Promise.resolve(recommendation);
  }

  findById(id: number): Promise<Recommendation | null> {
    return Promise.resolve(
      this.recommendations.find((r) => r.student.id === id),
    );
  }

  findLatestByStudent(student: Student): Promise<Recommendation | null> {
    return Promise.resolve(
      this.recommendations.find((r) => r.student.id === student.id),
    );
  }
}
