import { Test, TestingModule } from '@nestjs/testing';
import { AppConfigModule } from '../../config/config.module';
import { log } from 'console';
import { TensorflowModule } from './tensorflow.module';
import { GoogleCloudTensorflowService } from './tensorflow.service';

describe('GoogleCloudUtils', () => {
  let sv: GoogleCloudTensorflowService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [TensorflowModule, AppConfigModule],
    }).compile();

    sv = module.get<GoogleCloudTensorflowService>(GoogleCloudTensorflowService);
  });

  it('should be defined', () => {
    expect(sv).toBeDefined();
  });

  it('should return a token', async () => {
    const predictions = await sv.fetchPredictions({
      student_id: '1',
      major: 'Medicina',
      age: 23,
    });
    log(predictions);
    expect(predictions).toBeTruthy();
  });
});
