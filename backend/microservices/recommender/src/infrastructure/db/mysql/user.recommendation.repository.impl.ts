import { Inject } from '@nestjs/common';
import { FieldPacket, Pool, ResultSetHeader } from 'mysql2/promise';
import { User } from '../../../domain/models/user.model';
import { Volunteering } from '../../../domain/models/volunteering.model';
import { GoogleCloudTensorflowService } from '../tensorflow/tensorflow.service';
import { IUsrRecommendationRepository } from '../../../domain/repositories/user.recommendation.repository.interface';
import { UsrRecommendation } from '../../../domain/models/user.recommendation.model';
import { UsrRecommendationLine } from '../../../domain/models/user.recommendation.line.model';

export class UsrRecommendationRepository implements IUsrRecommendationRepository {
  constructor(
    private readonly gcpService: GoogleCloudTensorflowService,
    @Inject('DB_CONNECTION')
    private readonly connection: Pool,
  ) {}

  async create(recommendation: UsrRecommendation): Promise<UsrRecommendation> {
    try {
      const [result, _]: [ResultSetHeader, FieldPacket[]] =
        await this.connection.execute(
          'INSERT INTO UserRecommendation (volunteering_id, created_at, model_name, model_version) VALUES (?, ?, ?, ?)',
          [recommendation.volunteering.id, recommendation.createdAt, recommendation.modelName, recommendation.modelVersion],
        );
      recommendation.id = result.insertId;
      return Promise.resolve(recommendation);
    } catch (err) {
      console.log(err);
    }
  }

  async fetchByVolunteering(volunteering: Volunteering): Promise<UsrRecommendation> {
    try {
      const data = {
        volunteering_id: volunteering.id.toString() || 'null',
        title: volunteering.title || 'null',
        category: volunteering.category || 'null',
        objective: volunteering.objective || 'null',
        volunteering_location: volunteering.location || 'null',
        tags: volunteering.tags.join(',') || 'null'
      };

      const predictions = await this.gcpService.fetchUserPredictions(data);

      if (predictions) {
        const scores = predictions.output_1;
        const userIds = predictions.output_2;

        const recommendation = new UsrRecommendation(volunteering);
        recommendation.modelName = predictions.modelDisplayName;
        recommendation.modelVersion = predictions.modelVersionId;

        for (let i = 0; i < userIds.length; i++) {
          const user = new User(userIds[i]);
          const recommendationLine = new UsrRecommendationLine(
            recommendation,
            user,
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

  async findById(id: number): Promise<UsrRecommendation | null> {
    try {
      const [rows, _]: [any[], FieldPacket[]] = await this.connection.query(
        'SELECT * FROM UserRecommendation WHERE id = ?',
        [id],
      );
      if (rows.length === 0) {
        return;
      }
      const data = rows[0];
      return new UsrRecommendation(new Volunteering(data.volunteering_id), [], data.created_at, data.id, data.model_name, data.model_version);
    } catch (err) {
      console.log(err);
    }
  }

  async findLatestByVolunteering(volunteering: Volunteering): Promise<UsrRecommendation | null> {
    try {
      const [rows, _]: [any[], FieldPacket[]] = await this.connection.query(
        'SELECT * FROM UserRecommendation WHERE volunteering_id = ? ORDER BY created_at DESC LIMIT 1',
        [volunteering.id],
      );
      if (rows.length === 0) {
        return;
      }
      const data = rows[0];
      return new UsrRecommendation(volunteering, [], data.created_at, data.id, data.model_name, data.model_version);
    } catch (err) {
      console.log(err);
    }
  }
}
