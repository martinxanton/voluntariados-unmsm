import { Injectable } from '@nestjs/common';
import {
  Args,
  Mutation,
  Query,
  Resolver,
  ResolveReference,
} from '@nestjs/graphql';
import { GetVolRecUseCase } from '../../application/use-cases/get-volunteering-recommendation.usecase';
import { VolRecommendation } from '../../domain/models/volunteering.recommendation.model';
import { VolRecommendationService } from '../../domain/services/volunteering.recommendation.service';

@Injectable()
@Resolver()
export class VolRecResolver {
  constructor(
    private useCase: GetVolRecUseCase,
    private volRecService: VolRecommendationService,
  ) {}

  @Query()
  async getVolunteeringRecommendation(
    @Args('id') id: string,
  ): Promise<VolRecommendation | null> {
    const recommendation = await this.volRecService.getById(Number(id));
    return recommendation;
  }

  @Mutation()
  async generateVolunteeringRecommendation(
    @Args('userId') userId: string,
  ): Promise<VolRecommendation | null> {
    const recommendation = await this.useCase.execute(userId);
    return recommendation;
  }

  @ResolveReference()
  async resolveReference(reference: {
    __typename: string;
    id: number;
  }): Promise<VolRecommendation | null> {
    return await this.volRecService.getById(reference.id);
  }
}
