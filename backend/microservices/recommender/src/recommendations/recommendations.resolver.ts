import { Args, ID, Query, Resolver, ResolveReference } from '@nestjs/graphql';
import { Recommendation } from './models/recommendation.model';
import { RecommendationsService } from './recommendations.service';

@Resolver((of) => Recommendation)
export class RecommendationsResolver {
  constructor(private usersService: RecommendationsService) {}

  @Query((returns) => Recommendation)
  getUser(@Args({ name: 'id', type: () => ID }) id: number): Recommendation {
    return this.usersService.findById(id);
  }

  @ResolveReference()
  resolveReference(reference: {
    __typename: string;
    id: number;
  }): Recommendation {
    return this.usersService.findById(reference.id);
  }
}
