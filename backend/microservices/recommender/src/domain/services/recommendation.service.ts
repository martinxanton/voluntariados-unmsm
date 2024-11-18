import { Inject, Injectable } from '@nestjs/common';
import { Student } from '../models/student.model';
import { Recommendation } from '../models/recommendation.model';
import { IRecommendationRepository } from '../repositories/recommendation.repository.interface';
import { IRecommendationLineRepository } from '../repositories/recommendation.line.repository.interface';
import { log } from 'console';

@Injectable()
export class RecommendationService {
  constructor(
    @Inject('IRecommendationRepository')
    private readonly recommendationRepository: IRecommendationRepository,
    @Inject('IRecommendationLineRepository')
    private readonly recommendationLineRepository: IRecommendationLineRepository,
  ) {}
  async generateByStudent(student: Student): Promise<Recommendation> {
    const recommendation =
      await this.recommendationRepository.fetchByStudent(student);
    await this.recommendationRepository.create(recommendation);
    for (const line of recommendation.lines) {
      const created = await this.recommendationLineRepository.create(line);
      line.id = created.id;
    }
    return recommendation;
  }
  async getLatestByStudent(student: Student): Promise<Recommendation | null> {
    const recommendation =
      await this.recommendationRepository.findLatestByStudent(student);
    if (!recommendation) {
      return;
    }
    recommendation.lines =
      await this.recommendationLineRepository.findAllByRecommendation(
        recommendation,
      );
    return recommendation;
  }
}
