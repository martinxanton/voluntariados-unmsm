import { Inject, Injectable } from '@nestjs/common';
import { User } from '../models/user.model';
import { VolRecommendation } from '../models/volunteering.recommendation.model';
import { IVolRecommendationRepository } from '../repositories/volunteering.recommendation.repository.interface';
import { IVolRecommendationLineRepository } from '../repositories/volunteering.recommendation.line.repository.interface';
import { log } from 'console';

@Injectable()
export class VolRecommendationService {
  constructor(
    @Inject('IVolRecommendationRepository')
    private readonly volRecRepo: IVolRecommendationRepository,
    @Inject('IVolRecommendationLineRepository')
    private readonly volRecLineRepo: IVolRecommendationLineRepository,
  ) {}
  async generateByUser(user: User): Promise<VolRecommendation> {
    const recommendation = await this.volRecRepo.fetchByUser(user);
    await this.volRecRepo.create(recommendation);
    for (const line of recommendation.lines) {
      await this.volRecLineRepo.create(line);
    }
    return recommendation;
  }
  async getLatestByUser(user: User): Promise<VolRecommendation | null> {
    const recommendation = await this.volRecRepo.findLatestByUser(user);
    if (!recommendation) {
      return;
    }
    recommendation.lines =
      await this.volRecLineRepo.findAllByRecommendation(recommendation);
    return recommendation;
  }
  async getById(id: number): Promise<VolRecommendation | null> {
    const recommendation = await this.volRecRepo.findById(id);
    if (!recommendation) {
      return;
    }
    recommendation.lines =
      await this.volRecLineRepo.findAllByRecommendation(recommendation);
    return recommendation;
  }
}
