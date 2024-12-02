import { Inject } from '@nestjs/common';
import { FieldPacket, Pool, ResultSetHeader } from 'mysql2/promise';
import { IUsrRecommendationLineRepository } from '../../../domain/repositories/user.recommendation.line.repository.interface';
import { UsrRecommendationLine } from '../../../domain/models/user.recommendation.line.model';
import { UsrRecommendation } from '../../../domain/models/user.recommendation.model';
import { User } from '../../../domain/models/user.model';

export class UsrRecommendationLineRepository
  implements IUsrRecommendationLineRepository
{
  constructor(
    @Inject('DB_CONNECTION')
    private readonly connection: Pool,
  ) {}

  async create(
    recommendationLine: UsrRecommendationLine,
  ): Promise<UsrRecommendationLine> {
    try {
      const [result, _]: [ResultSetHeader, FieldPacket[]] =
        await this.connection.execute(
          'INSERT INTO UserRecommendationLine (recommendation_id, user_id, score) VALUES (?, ?, ?)',
          [
            recommendationLine.recommendation.id,
            recommendationLine.user.id,
            recommendationLine.score,
          ],
        );
      return Promise.resolve(recommendationLine);
    } catch (err) {
      console.log(err);
    }
  }
  
  async findAllByRecommendation(
    recommendation: UsrRecommendation,
  ): Promise<UsrRecommendationLine[]> {
    try {
      const [rows, _]: [any[], FieldPacket[]] = await this.connection.query(
        'SELECT * FROM UserRecommendationLine WHERE recommendation_id = ?',
        [recommendation.id],
      );

      const lines: UsrRecommendationLine[] = [];

      for (const row of rows) {
        lines.push(
          new UsrRecommendationLine(
            recommendation,
            new User(row.user_id),
            row.score,
          ),
        );
      }

      return lines;
    } catch (err) {
      console.log(err);
    }
  }
}
