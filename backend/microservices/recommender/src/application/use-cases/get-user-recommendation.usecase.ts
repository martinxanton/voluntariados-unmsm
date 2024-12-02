import { Inject, Injectable } from '@nestjs/common';
import { ConflictException } from '@nestjs/common';
import { IConfigService } from '../../domain/services/config.service.interface';
import { VolunteeringService } from '../../domain/services/volunteering.service';
import { UsrRecommendationService } from '../../domain/services/user.recommendation.service';
import { UsrRecommendation } from '../../domain/models/user.recommendation.model';

@Injectable()
export class GetUsrRecUseCase {
  constructor(
    private readonly volunteeringService: VolunteeringService,
    private readonly usrRecService: UsrRecommendationService,
    @Inject('IConfigService')
    private readonly configService: IConfigService,
  ) {}

  async execute(volunteeringId: string): Promise<UsrRecommendation> {
    const vol = await this.volunteeringService.getVolunteeringById(volunteeringId);

    const latestRecommendation =
      await this.usrRecService.getLatestByVolunteering(vol);

    if (
      latestRecommendation &&
      latestRecommendation.createdAt >
        new Date(
          Date.now() -
            1000 * 60 * 60 * 24 * this.configService.recommendationRefreshDays,
        )
    ) {
      return latestRecommendation;
    }

    if (!vol) {
      throw new ConflictException('User not found.');
    }

    const recommendation =
      await this.usrRecService.generateByVolunteering(vol);

    return recommendation;
  }
}
