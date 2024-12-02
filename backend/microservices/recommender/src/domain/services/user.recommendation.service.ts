import { Inject, Injectable } from '@nestjs/common';
import { IUsrRecommendationRepository } from '../repositories/user.recommendation.repository.interface';
import { IUsrRecommendationLineRepository } from '../repositories/user.recommendation.line.repository.interface';
import { UsrRecommendation } from '../models/user.recommendation.model';
import { Volunteering } from '../models/volunteering.model';

@Injectable()
export class UsrRecommendationService {
  constructor(
    @Inject('IUsrRecommendationRepository')
    private readonly usrRecRepo: IUsrRecommendationRepository,
    @Inject('IUsrRecommendationLineRepository')
    private readonly usrRecLineRepo: IUsrRecommendationLineRepository,
  ) {}
  async generateByVolunteering(
    volunteering: Volunteering,
  ): Promise<UsrRecommendation> {
    const recommendation =
      await this.usrRecRepo.fetchByVolunteering(volunteering);
    await this.usrRecRepo.create(recommendation);
    for (const line of recommendation.lines) {
      await this.usrRecLineRepo.create(line);
    }
    return recommendation;
  }
  async getLatestByVolunteering(
    volunteering: Volunteering,
  ): Promise<UsrRecommendation | null> {
    const recommendation =
      await this.usrRecRepo.findLatestByVolunteering(volunteering);
    if (!recommendation) {
      return;
    }
    recommendation.lines =
      await this.usrRecLineRepo.findAllByRecommendation(recommendation);
    return recommendation;
  }
  async getById(id: number): Promise<UsrRecommendation | null> {
    const recommendation = await this.usrRecRepo.findById(id);
    if (!recommendation) {
      return;
    }
    recommendation.lines =
      await this.usrRecLineRepo.findAllByRecommendation(recommendation);
    return recommendation;
  }
}
