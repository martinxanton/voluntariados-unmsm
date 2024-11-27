import { Test, TestingModule } from '@nestjs/testing';
import { IRecommendationRepository } from '../../../domain/repositories/recommendation.repository.interface';
import { Student } from '../../../domain/models/student.model';
import { RecommendationsModule } from '../../graphql/recommendations.module';
import { AppConfigModule } from '../../config/config.module';
import { log } from 'console';

describe('RecommendationRepository', () => {
  let repo: IRecommendationRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [RecommendationsModule, AppConfigModule],
    }).compile();

    repo = module.get<IRecommendationRepository>('IRecommendationRepository');
  });

  it('should be defined', () => {
    expect(repo).toBeDefined();
  });

  it('should create a recommendation', async () => {
    const student = new Student(1, 'Medicina', 23);
    const recommendation = await repo.fetchByStudent(student);
    const saved = await repo.create(recommendation);
    log(saved);
    expect(saved).toBeTruthy();
  });

  it('should fetch a recommendation by student', async () => {
    const student = new Student(1, 'Medicina', 23);
    const recommendation = await repo.fetchByStudent(student);
    expect(recommendation).toBeTruthy();
  });

  /*
  it('should return undefined if user not found', () => {
    const user = repository.findUserById(999);
    expect(user).toBeUndefined();
  });
 */
});
