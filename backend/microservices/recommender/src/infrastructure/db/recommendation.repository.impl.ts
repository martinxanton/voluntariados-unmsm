import { Student } from 'src/domain/models/student.model';
import { Recommendation } from 'src/domain/models/recommendation.model';
import { IRecommendationRepository } from 'src/domain/repositories/recommendation.repository.interface';
import { Program } from 'src/domain/models/program.model';
import { RecommendationLine } from 'src/domain/models/recommendation.line.model';

export class MockRecommendationRepository implements IRecommendationRepository {
  private recommendations: Recommendation[] = [];

  constructor() {}

  save(recommendation: Recommendation): Promise<void> {
    this.recommendations.push(recommendation);
    return Promise.resolve();
  }

  fetchByStudent(student: Student): Promise<Recommendation> {
    const recommendation = new Recommendation(1, student, new Date(), []);
    recommendation.lines.push(
      new RecommendationLine(1, recommendation, new Program(1), 10.0),
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
