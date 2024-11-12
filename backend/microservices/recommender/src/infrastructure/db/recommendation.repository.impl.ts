import { Student } from 'src/domain/models/student.model';
import { Recommendation } from 'src/domain/models/recommendation.model';
import { IRecommendationRepository } from 'src/domain/repositories/recommendation.repository.interface';
import { Program } from 'src/domain/models/program.model';
import { RecommendationLine } from 'src/domain/models/recommendation.line.model';
import { firstValueFrom, lastValueFrom } from 'rxjs';
import { HttpService } from '@nestjs/axios';
import { Inject } from '@nestjs/common';
import { IConfigService } from 'src/domain/services/config.service.interface';
import { log } from 'console';

export class RecommendationRepository implements IRecommendationRepository {
  private recommendations: Recommendation[] = [];

  constructor(
    private readonly httpService: HttpService,
    @Inject('IConfigService')
    private readonly configService: IConfigService,
  ) {}

  save(recommendation: Recommendation): Promise<void> {
    this.recommendations.push(recommendation);
    return Promise.resolve();
  }

  async fetchByStudent(student: Student): Promise<Recommendation> {
    try {
      const data = {
        instances: [
          {
            student_id: student.id.toString(),
            major: student.major,
            age: student.age,
          },
        ],
      };

      const response = await lastValueFrom(
        this.httpService.post(this.configService.modelServingUrl, data, {
          headers: { 'Content-Type': 'application/json' },
        }),
      );

      const content = response.data;
      const predictions = content.predictions[0];

      if (predictions) {
        const scores = predictions.output_1;
        const programIds = predictions.output_2;

        const recommendation = new Recommendation(student, new Date(), [], 1);

        for (let i = 0; i < programIds.length; i++) {
          const program = new Program(Number(programIds[i]));
          const recommendationLine = new RecommendationLine(
            recommendation,
            program,
            scores[i],
            i,
          );
          recommendation.lines.push(recommendationLine);
        }

        return recommendation;
      } else {
        throw new Error('No predictions found');
      }
    } catch (error) {
      // throw new Error(`Error al hacer la solicitud: ${error.message}`);
      console.error(
        'Error al hacer la solicitud:',
        error.response?.data || error.message,
      );
    }
  }

  findById(id: number): Promise<Recommendation | null> {
    return Promise.resolve(
      this.recommendations.find((r) => r.student.id === id),
    );
  }

  findLatestByStudent(student: Student): Promise<Recommendation | null> {
    return Promise.resolve(
      this.recommendations.find((r) => r.student.id === student.id),
    );
  }
}
