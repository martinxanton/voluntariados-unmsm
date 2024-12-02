import { Inject } from '@nestjs/common';
import { lastValueFrom } from 'rxjs';
import { HttpService } from '@nestjs/axios';
import { IConfigService } from '../../../domain/services/config.service.interface';
import { GoogleCloudUtils } from './tensorflow.utils';

type UserInputData = {
  user_id: string;
  major: string;
  age: number;
  gender: string;
  user_location: string;
  interests: string;
};

type VolunteeringInputData = {
  volunteering_id: string;
  title: string;
  category: string;
  objective: string;
  tags: string;
  volunteering_location: string;
};

type Predictions = {
  output_1: number[];
  output_2: string[];
  modelDisplayName: string,
  modelVersionId: string,
};

export class GoogleCloudTensorflowService {
  constructor(
    private readonly gcpUtils: GoogleCloudUtils,
    private readonly httpService: HttpService,
    @Inject('IConfigService')
    private readonly configService: IConfigService,
  ) {}

  async fetchVolunteeringPredictions(input: UserInputData): Promise<Predictions> {
    try {
      const token = await this.gcpUtils.getAccessToken();
      const model = this.configService.modelVolunteering;
      const data = {
        instances: [input],
        parameters: {model}
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
      const predictions: Predictions = {
        output_1: content.predictions[0].output_1,
        output_2: content.predictions[0].output_2,
        modelDisplayName: content.modelDisplayName,
        modelVersionId: content.modelVersionId,
      }

      return predictions;
    } catch (error) {
      console.error(
        'Error al hacer la solicitud:',
        error.response?.data || error.message,
      );
    }
  }
  
  async fetchUserPredictions(input: VolunteeringInputData): Promise<Predictions> {
    try {
      const token = await this.gcpUtils.getAccessToken();
      const model = this.configService.modelUser;
      const data = {
        instances: [input],
        parameters: {model}
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
      const predictions: Predictions = {
        output_1: content.predictions[0].output_1,
        output_2: content.predictions[0].output_2,
        modelDisplayName: content.modelDisplayName,
        modelVersionId: content.modelVersionId,
      }

      return predictions;
    } catch (error) {
      console.error(
        'Error al hacer la solicitud:',
        error.response?.data || error.message,
      );
    }
  }
}
