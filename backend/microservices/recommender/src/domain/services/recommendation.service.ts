import { Inject, Injectable } from '@nestjs/common';
import { Student } from '../models/student.model';
import { Recommendation } from '../models/recommendation.model';
import { IRecommendationRepository } from '../repositories/recommendation.repository.interface';
//import { IRecommendationLineRepository } from '../repositories/recommendation.line.repository.interface';

@Injectable()
export class RecommendationService {
  constructor(
    @Inject('IRecommendationRepository')
    private readonly recommendationRepository: IRecommendationRepository,
    //private recommendationLineRepository: IRecommendationLineRepository,
  ) {}
  async getByStudent(student: Student): Promise<Recommendation> {
    // TODO: use a join? or make it manually? for now JOIN
    const recommendation =
      await this.recommendationRepository.fetchByStudent(student);
    return recommendation;
  }
  async getLatestByStudent(student: Student): Promise<Recommendation | null> {
    return this.recommendationRepository.findLatestByStudent(student);
  }
}
