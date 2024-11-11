import { Inject, Injectable } from '@nestjs/common';
import {
  Args,
  ID,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
  ResolveReference,
} from '@nestjs/graphql';
import { GetRecommendationUseCase } from 'src/application/use-cases/get-recommendation.usecase';
import { Recommendation } from 'src/domain/models/recommendation.model';
import { Student } from 'src/domain/models/student.model';
import { IRecommendationRepository } from 'src/domain/repositories/recommendation.repository.interface';

@Injectable()
@Resolver(() => Recommendation)
export class RecommendationsResolver {
  constructor(
    private getRecommendationUseCase: GetRecommendationUseCase,
    @Inject('IRecommendationRepository')
    private recommendationRepository: IRecommendationRepository,
  ) {}

  // @Query(() => Recommendation)
  // async getRecommendation(
  //   @Args('studentId') studentId: string,
  // ): Promise<Recommendation> {
  //   const recommendation =
  //   await this.getRecommendationUseCase.execute(Number(studentId));
  //   return recommendation;
  // }
  
  @Mutation(() => Recommendation)
  async generateRecommendation(
    @Args('studentId') studentId: string,
  ): Promise<Recommendation> {
    const recommendation =
    await this.getRecommendationUseCase.execute(Number(studentId));
    return recommendation;
  }

  /* @ResolveField('user')
  getUser(@Parent() post: Post) {
    return { __typename: 'User', id: post.userId };
  } */
  
  @ResolveReference()
  async resolveReference(reference: {
    __typename: string;
    id: number;
  }): Promise<Recommendation> {
    return await this.recommendationRepository.findById(reference.id);
  }
  
}
