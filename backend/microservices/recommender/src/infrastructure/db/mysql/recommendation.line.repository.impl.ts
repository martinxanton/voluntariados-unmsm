import { Inject } from '@nestjs/common';
import { FieldPacket, Pool, ResultSetHeader } from 'mysql2/promise';
import { Recommendation } from '../../../domain/models/recommendation.model';
import { RecommendationLine } from '../../../domain/models/recommendation.line.model';
import { IRecommendationLineRepository } from '../../../domain/repositories/recommendation.line.repository.interface';
import { Program } from '../../../domain/models/program.model';

export class RecommendationLineRepository
  implements IRecommendationLineRepository
{
  constructor(
    @Inject('DB_CONNECTION')
    private readonly connection: Pool,
  ) {}

  async create(
    recommendationLine: RecommendationLine,
  ): Promise<RecommendationLine> {
    try {
      const [result, _]: [ResultSetHeader, FieldPacket[]] =
        await this.connection.execute(
          'INSERT INTO RecommendationLine (recommendation_id, program_id, score) VALUES (?, ?, ?)',
          [
            recommendationLine.recommendation.id,
            recommendationLine.program.id,
            recommendationLine.score,
          ],
        );
      recommendationLine.id = result.insertId;
      return Promise.resolve(recommendationLine);
    } catch (err) {
      console.log(err);
    }
  }

  /*   async findById(id: number): Promise<RecommendationLine> {
    try {
      const [rows, _]: [QueryResult, FieldPacket[]] = await this.connection.query(
        'SELECT * FROM RecommendationLine WHERE id = ?',
        [id],
      );
      return rows[0];
    } catch (err) {
      console.log(err);
    }
  }
 */
  async findAllByRecommendation(
    recommendation: Recommendation,
  ): Promise<RecommendationLine[]> {
    try {
      const [rows, _]: [any[], FieldPacket[]] = await this.connection.query(
        'SELECT * FROM RecommendationLine WHERE recommendation_id = ?',
        [recommendation.id],
      );

      const lines: RecommendationLine[] = [];

      for (const row of rows) {
        lines.push(
          new RecommendationLine(
            recommendation,
            new Program(row.program_id),
            row.score,
            row.id,
          ),
        );
      }

      return lines;
    } catch (err) {
      console.log(err);
    }
  }
}
