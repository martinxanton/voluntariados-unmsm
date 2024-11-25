import { Inject } from '@nestjs/common';
import { lastValueFrom } from 'rxjs';
import { FieldPacket, Pool, ResultSetHeader } from 'mysql2/promise';
import { Student } from '../../../domain/models/student.model';
import { Program } from '../../../domain/models/program.model';
import { Recommendation } from '../../../domain/models/recommendation.model';
import { RecommendationLine } from '../../../domain/models/recommendation.line.model';
import { IConfigService } from '../../../domain/services/config.service.interface';
import { IRecommendationRepository } from '../../../domain/repositories/recommendation.repository.interface';
import { GoogleCloudTensorflowService } from '../tensorflow/tensorflow.service';

export class RecommendationRepository implements IRecommendationRepository {
  constructor(
    private readonly gcpService: GoogleCloudTensorflowService,
    @Inject('IConfigService')
    private readonly configService: IConfigService,
    @Inject('DB_CONNECTION')
    private readonly connection: Pool,
  ) {}

  async create(recommendation: Recommendation): Promise<Recommendation> {
    try {
      const [result, _]: [ResultSetHeader, FieldPacket[]] =
        await this.connection.execute(
          'INSERT INTO Recommendation (student_id) VALUES (?)',
          [recommendation.student.id],
        );
      recommendation.id = result.insertId;
      return Promise.resolve(recommendation);
    } catch (err) {
      console.log(err);
    }
  }

  async fetchByStudent(student: Student): Promise<Recommendation> {
    try {
      const data = {
        student_id: student.id.toString(),
        major: student.major,
        age: student.age,
      };

      const predictions = await this.gcpService.fetchPredictions(data);

      if (predictions) {
        const scores = predictions.output_1;
        const programIds = predictions.output_2;

        const recommendation = new Recommendation(student);

        for (let i = 0; i < programIds.length; i++) {
          const program = new Program(Number(programIds[i]));
          const recommendationLine = new RecommendationLine(
            recommendation,
            program,
            scores[i],
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

  async findById(id: number): Promise<Recommendation | null> {
    try {
      const [rows, _]: [any[], FieldPacket[]] = await this.connection.query(
        'SELECT * FROM Recommendation WHERE id = ?',
        [id],
      );
      if (rows.length === 0) {
        return;
      }
      const data = rows[0];
      return new Recommendation(new Student(id), [], data.created_at, data.id);
    } catch (err) {
      console.log(err);
    }
  }

  async findLatestByStudent(student: Student): Promise<Recommendation | null> {
    try {
      const [rows, _]: [any[], FieldPacket[]] = await this.connection.query(
        'SELECT * FROM Recommendation WHERE student_id = ? ORDER BY created_at DESC LIMIT 1',
        [student.id],
      );
      if (rows.length === 0) {
        return;
      }
      const data = rows[0];
      return new Recommendation(student, [], data.created_at, data.id);
    } catch (err) {
      console.log(err);
    }
  }
}
