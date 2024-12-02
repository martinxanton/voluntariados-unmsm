import { Inject } from '@nestjs/common';
import { FieldPacket, Pool, ResultSetHeader } from 'mysql2/promise';
import { User } from '../../../domain/models/user.model';
import { Volunteering } from '../../../domain/models/volunteering.model';
import { VolRecommendation } from '../../../domain/models/volunteering.recommendation.model';
import { VolRecommendationLine } from '../../../domain/models/volunteering.recommendation.line.model';
import { IConfigService } from '../../../domain/services/config.service.interface';
import { IVolRecommendationRepository } from '../../../domain/repositories/volunteering.recommendation.repository.interface';
import { GoogleCloudTensorflowService } from '../tensorflow/tensorflow.service';

export class VolRecommendationRepository implements IVolRecommendationRepository {
  constructor(
    private readonly gcpService: GoogleCloudTensorflowService,
    @Inject('DB_CONNECTION')
    private readonly connection: Pool,
  ) {}

  async create(recommendation: VolRecommendation): Promise<VolRecommendation> {
    try {
      const [result, _]: [ResultSetHeader, FieldPacket[]] =
        await this.connection.execute(
          'INSERT INTO VolunteeringRecommendation (user_id, model_name, model_version) VALUES (?, ?, ?)',
          [recommendation.user.id, recommendation.modelName, recommendation.modelVersion],
        );
      recommendation.id = result.insertId;
      return Promise.resolve(recommendation);
    } catch (err) {
      console.log(err);
    }
  }

  async fetchByUser(user: User): Promise<VolRecommendation> {
    try {
      const data = {
        user_id: user.id.toString() || 'null',
        major: user.major || 'null',
        age: user.age || 20,
        gender: user.gender || 'null',
        user_location: user.location || 'null',
        interests: user.interests.join(",") || 'null',
      };

      const predictions = await this.gcpService.fetchVolunteeringPredictions(data);

      if (predictions) {
        const scores = predictions.output_1;
        const volunteeringIds = predictions.output_2;

        const recommendation = new VolRecommendation(user);
        recommendation.modelName = predictions.modelDisplayName;
        recommendation.modelVersion = predictions.modelVersionId;

        for (let i = 0; i < volunteeringIds.length; i++) {
          const program = new Volunteering(volunteeringIds[i]);
          const recommendationLine = new VolRecommendationLine(
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
      console.error(
        'Error al hacer la solicitud:',
        error.response?.data || error.message,
      );
    }
  }

  async findById(id: number): Promise<VolRecommendation | null> {
    try {
      const [rows, _]: [any[], FieldPacket[]] = await this.connection.query(
        'SELECT * FROM VolunteeringRecommendation WHERE id = ?',
        [id],
      );
      if (rows.length === 0) {
        return;
      }
      const data = rows[0];
      return new VolRecommendation(new User(data.user_id), [], data.created_at, data.id, data.model_name, data.model_version);
    } catch (err) {
      console.log(err);
    }
  }

  async findLatestByUser(student: User): Promise<VolRecommendation | null> {
    try {
      const [rows, _]: [any[], FieldPacket[]] = await this.connection.query(
        'SELECT * FROM VolunteeringRecommendation WHERE user_id = ? ORDER BY created_at DESC LIMIT 1',
        [student.id],
      );
      if (rows.length === 0) {
        return;
      }
      const data = rows[0];
      return new VolRecommendation(student, [], data.created_at, data.id, data.model_name, data.model_version);
    } catch (err) {
      console.log(err);
    }
  }
}
