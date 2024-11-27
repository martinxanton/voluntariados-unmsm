import { Inject } from '@nestjs/common';
import { lastValueFrom } from 'rxjs';
import { HttpService } from '@nestjs/axios';
import { IConfigService } from '../../../domain/services/config.service.interface';
import { GoogleCloudUtils } from './tensorflow.utils';

type InputData = {
  student_id: string;
  major: string;
  age: number;
};

type Predictions = {
  output_1: number[];
  output_2: string[];
};

export class GoogleCloudTensorflowService {
  constructor(
    private readonly gcpUtils: GoogleCloudUtils,
    private readonly httpService: HttpService,
    @Inject('IConfigService')
    private readonly configService: IConfigService,
  ) {}

  async fetchPredictions(input: InputData): Promise<Predictions> {
    try {
      const token = await this.gcpUtils.getAccessToken();
      const data = {
        instances: [input],
      };

      const response = await lastValueFrom(
        this.httpService.post(this.configService.modelServingUrl, data, {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        }),
      );

      const content = response.data;
      const predictions: Predictions = content.predictions[0];

      return predictions;
    } catch (error) {
      console.error(
        'Error al hacer la solicitud:',
        error.response?.data || error.message,
      );
    }
  }
}
