import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { GoogleCloudTensorflowService } from './tensorflow.service';
import { GoogleCloudUtils } from './tensorflow.utils';

@Module({
  imports: [HttpModule],
  providers: [GoogleCloudUtils, GoogleCloudTensorflowService],
  exports: [GoogleCloudTensorflowService],
})
export class TensorflowModule {}
