import { Test, TestingModule } from '@nestjs/testing';
import { IVolRecommendationRepository } from '../../../domain/repositories/volunteering.recommendation.repository.interface';
import { User } from '../../../domain/models/user.model';
import { RecommendationsModule } from '../../graphql/recommendations.module';
import { AppConfigModule } from '../../config/config.module';
import { log } from 'console';

describe('RecommendationRepository', () => {
  let repo: IVolRecommendationRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [RecommendationsModule, AppConfigModule],
    }).compile();

    repo = module.get<IVolRecommendationRepository>('IVolRecommendationRepository');
  });

  it('should be defined', () => {
    expect(repo).toBeDefined();
  });

  it('should create a recommendation', async () => {
    const student = new User(1, 'Medicina', 23);
    const recommendation = await repo.fetchByUser(student);
    const saved = await repo.create(recommendation);
    log(saved);
    expect(saved).toBeTruthy();
  });

  it('should fetch a recommendation by student', async () => {
    const student = new User(1, 'Medicina', 23);
    const recommendation = await repo.fetchByUser(student);
    expect(recommendation).toBeTruthy();
  });

  /*
  it('should return undefined if user not found', () => {
    const user = repository.findUserById(999);
    expect(user).toBeUndefined();
  });
 */
});
