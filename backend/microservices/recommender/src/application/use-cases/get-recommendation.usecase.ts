import { Inject, Injectable } from '@nestjs/common';
import { ConflictException } from '@nestjs/common';
import { Recommendation } from '../../domain/models/recommendation.model';
import { IConfigService } from '../../domain/services/config.service.interface';
import { RecommendationService } from '../../domain/services/recommendation.service';
import { StudentService } from '../../domain/services/student.service';

@Injectable()
export class GetRecommendationUseCase {
  constructor(
    private readonly studentService: StudentService,
    private readonly recommendationService: RecommendationService,
    @Inject('IConfigService')
    private readonly configService: IConfigService,
  ) {}

  async execute(studentId: number): Promise<Recommendation> {
    const student = await this.studentService.getStudentById(studentId);

    const latestRecommendation =
      await this.recommendationService.getLatestByStudent(student);

    if (
      latestRecommendation &&
      latestRecommendation.createdAt >
        new Date(
          Date.now() -
            1000 * 60 * 60 * 24 * this.configService.recommendationRefreshDays,
        )
    ) {
      return latestRecommendation;
    }

    if (!student) {
      throw new ConflictException('Student not found.');
    }

    const recommendation =
      await this.recommendationService.generateByStudent(student);

    return recommendation;
  }
}
