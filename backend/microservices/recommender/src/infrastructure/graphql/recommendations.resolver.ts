import { Injectable } from '@nestjs/common';
import {
  Args,
  Mutation,
  Query,
  Resolver,
  ResolveReference,
} from '@nestjs/graphql';
import { GetRecommendationUseCase } from '../../application/use-cases/get-recommendation.usecase';
import { Recommendation } from '../../domain/models/recommendation.model';
import { RecommendationService } from '../../domain/services/recommendation.service';

@Injectable()
@Resolver(() => Recommendation)
export class RecommendationsResolver {
  constructor(
    private getRecommendationUseCase: GetRecommendationUseCase,
    private recommendationService: RecommendationService,
  ) {}

  @Query()
  async getRecommendation(@Args('id') id: string) {
    const recommendation = await this.recommendationService.getById(Number(id));
    return recommendation;
  }

  @Mutation(() => Recommendation)
  async generateRecommendation(
    @Args('studentId') studentId: string,
  ): Promise<Object> {
    const recommendation = await this.getRecommendationUseCase.execute(
      Number(studentId),
    );
    return recommendation;
  }

  @ResolveReference()
  async resolveReference(reference: {
    __typename: string;
    id: number;
  }): Promise<Recommendation> {
    return await this.recommendationService.getById(reference.id);
  }
}
