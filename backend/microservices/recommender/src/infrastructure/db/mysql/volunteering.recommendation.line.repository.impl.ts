import { Inject } from '@nestjs/common';
import { FieldPacket, Pool, ResultSetHeader } from 'mysql2/promise';
import { VolRecommendation } from '../../../domain/models/volunteering.recommendation.model';
import { VolRecommendationLine } from '../../../domain/models/volunteering.recommendation.line.model';
import { IVolRecommendationLineRepository } from '../../../domain/repositories/volunteering.recommendation.line.repository.interface';
import { Volunteering } from '../../../domain/models/volunteering.model';

export class VolRecommendationLineRepository
  implements IVolRecommendationLineRepository
{
  constructor(
    @Inject('DB_CONNECTION')
    private readonly connection: Pool,
  ) {}

  async create(
    recommendationLine: VolRecommendationLine,
  ): Promise<VolRecommendationLine> {
    try {
      await this.connection.execute(
          'INSERT INTO VolunteeringRecommendationLine (recommendation_id, volunteering_id, score) VALUES (?, ?, ?)',
          [
            recommendationLine.recommendation.id,
            recommendationLine.volunteering.id,
            recommendationLine.score,
          ],
        );
      return Promise.resolve(recommendationLine);
    } catch (err) {
      console.log(err);
    }
  }

  async findAllByRecommendation(
    recommendation: VolRecommendation,
  ): Promise<VolRecommendationLine[]> {
    try {
      const [rows, _]: [any[], FieldPacket[]] = await this.connection.query(
        'SELECT * FROM VolunteeringRecommendationLine WHERE recommendation_id = ?',
        [recommendation.id],
      );

      const lines: VolRecommendationLine[] = [];

      for (const row of rows) {
        lines.push(
          new VolRecommendationLine(
            recommendation,
            new Volunteering(row.volunteering_id),
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
