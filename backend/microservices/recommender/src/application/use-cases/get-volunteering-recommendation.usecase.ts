import { Inject, Injectable } from '@nestjs/common';
import { ConflictException } from '@nestjs/common';
import { VolRecommendation } from '../../domain/models/volunteering.recommendation.model';
import { IConfigService } from '../../domain/services/config.service.interface';
import { VolRecommendationService } from '../../domain/services/volunteering.recommendation.service';
import { UserService } from '../../domain/services/user.service';

@Injectable()
export class GetVolRecUseCase {
  constructor(
    private readonly userService: UserService,
    private readonly volRecService: VolRecommendationService,
    @Inject('IConfigService')
    private readonly configService: IConfigService,
  ) {}

  async execute(userId: string): Promise<VolRecommendation> {
    const user = await this.userService.getUserById(userId);

    const latestRecommendation =
      await this.volRecService.getLatestByUser(user);

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

    if (!user) {
      throw new ConflictException('User not found.');
    }

    const recommendation =
      await this.volRecService.generateByUser(user);

    return recommendation;
  }
}
