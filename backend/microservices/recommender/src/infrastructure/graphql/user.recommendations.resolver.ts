import { Injectable } from '@nestjs/common';
import {
  Args,
  Mutation,
  Query,
  Resolver,
  ResolveReference,
} from '@nestjs/graphql';
import { UsrRecommendation } from '../../domain/models/user.recommendation.model';
import { GetUsrRecUseCase } from '../../application/use-cases/get-user-recommendation.usecase';
import { UsrRecommendationService } from '../../domain/services/user.recommendation.service';

@Injectable()
@Resolver()
export class UsrRecResolver {
  constructor(
    private useCase: GetUsrRecUseCase,
    private usrRecService: UsrRecommendationService,
  ) {}

  @Query()
  async getUserRecommendation(
    @Args('id') id: string,
  ): Promise<UsrRecommendation | null> {
    const recommendation = await this.usrRecService.getById(Number(id));
    return recommendation;
  }

  @Mutation()
  async generateUserRecommendation(
    @Args('volunteeringId') volunteeringId: string,
  ): Promise<UsrRecommendation | null> {
    const recommendation = await this.useCase.execute(volunteeringId);
    return recommendation;
  }

  @ResolveReference()
  async resolveReference(reference: {
    __typename: string;
    id: number;
  }): Promise<UsrRecommendation | null> {
    return await this.usrRecService.getById(reference.id);
  }
}
