import { Test, TestingModule } from '@nestjs/testing';
import { GoogleCloudUtils } from './tensorflow.utils';
import { AppConfigModule } from '../../config/config.module';
import { log } from 'console';
import { TensorflowModule } from './tensorflow.module';

describe('GoogleCloudUtils', () => {
  let utils: GoogleCloudUtils;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [TensorflowModule, AppConfigModule],
    }).compile();

    utils = module.get<GoogleCloudUtils>(GoogleCloudUtils);
  });

  it('should be defined', () => {
    expect(utils).toBeDefined();
  });

  it('should return a token', async () => {
    const token = await utils.getAccessToken();
    log(token);
    expect(token).toBeTruthy();
  });
});
